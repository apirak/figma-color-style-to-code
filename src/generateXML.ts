import {
  ColorStyle,
  loadLocalStyle,
  BrandColorStyle,
  loadBrandColor,
  loadStyle,
  loadLocalBrandColor,
} from './utility/styleUtility'
import { updateTextComponent } from './utility/textUtility'

let codeLocalStyle = (
  localStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return localStyle
    .filter((style) => style.type === 'SOLID')
    .map((style) => {
      if (Object.keys(brandStyle).length === 0) {
        return `    <color name="${style.snakeCodeName}">${style.color}</color>`
      } else {
        let color = brandStyle[style.color]
          ? `@color.${brandStyle[style.color]}`
          : style.color
        return `    <item name="${style.androidCodeName}">${color}</item>`
      }
    })
    .join('\n')
}

const generateCode = (
  colorStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  const codeAllStyle: string = codeLocalStyle(colorStyle, brandStyle)
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<resources>`,
    codeAllStyle,
    `</resources>`,
  ].join('\n')
}

const codeThemesStyle = (
  themeStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return themeStyle
    .filter((style) => style.type === 'SOLID')
    .map((style) => {
      let themeColor = brandStyle[style.color]
        ? `@color/${brandStyle[style.color]}`
        : style.color

      return `    <item name="${style.androidCodeName}">${themeColor}</item>`
    })
    .join('\n')
}

const generateThemesCode = (
  dayStyle: ColorStyle[],
  nightStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  const codeDayStyle: string = codeThemesStyle(dayStyle, brandStyle)
  const codeNightStyle: string = codeThemesStyle(nightStyle, brandStyle)
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<resources>',
    '  <style name="Theme.OneApp.Day" parent="Theme.MaterialComponents.Day.NoActionBar">',
    codeDayStyle,
    '  </style>',
    '</resource>',
    '',
    '<?xml version="1.0" encoding="utf-8"?>',
    '<resources>',
    '  <style name="Theme.OneApp.Night" parent="Theme.MaterialComponents.Night.NoActionBar">',
    codeNightStyle,
    '  </style>',
    '</resource>',
  ].join('\n')
}

const codeAttrStyle = (
  dayStyle: ColorStyle[],
  nightStyle: ColorStyle[]
): string => {
  return dayStyle
    .filter((style) => style.type === 'SOLID')
    .map(
      (style) => `    <attr name="${style.androidCodeName}" format="color" />`
    )
    .join('\n')
}

const generateAttrCode = (
  dayStyle: ColorStyle[],
  nightStyle: ColorStyle[]
): string => {
  const codeAllStyle: string = codeAttrStyle(dayStyle, nightStyle)
  return [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<resources>',
    '  <declare-styleable name="OneApp">',
    codeAllStyle,
    '  </declare-styleable>',
    '</resource>',
  ].join('\n')
}

const startPluginGenerateAllLocal = async () => {
  const brandStyle = loadStyle(
    figma
      .getLocalPaintStyles()
      .filter((style) => style.name.includes('Branding'))
  )
  const brandIndex = loadLocalBrandColor(brandStyle, 'snakeCodeName')
  const dayStyle = loadStyle(
    figma.getLocalPaintStyles().filter((style) => style.name.includes('Day'))
  )
  const nightStyle = loadStyle(
    figma.getLocalPaintStyles().filter((style) => style.name.includes('Night'))
  )

  let brandCodeColor = generateCode(brandStyle, {})
  let themesCodeColor = generateThemesCode(dayStyle, nightStyle, brandIndex)
  let attrCodeColor = generateAttrCode(dayStyle, nightStyle)

  await Promise.all([
    updateTextComponent('#color.xml', brandCodeColor),
    updateTextComponent('#themes.xml', themesCodeColor),
    updateTextComponent('#attr.xml', attrCodeColor),
  ])

  figma.closePlugin('done 🎉')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeColor = generateCode(localStyle, brandColor)
  updateTextComponent('#color.xml', codeColor).then((closeNote: string) => {
    figma.closePlugin(closeNote)
  })
}

export { startPluginGenerateAllLocal }
export default startPlugin

// export for test
export { codeLocalStyle, generateCode, generateAttrCode, generateThemesCode }
