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
        return `    <item name="${style.codeName}">${color}</item>`
      }
    })
    .join('\n')
}

const generateCode = (
  colorStyle: ColorStyle[],
  brandStyle: BrandColorStyle
) => {
  const codeAllStyle: string = codeLocalStyle(colorStyle, brandStyle)
  return [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<resources>`,
    codeAllStyle,
    `</resources>`,
  ].join('\n')
}

// const generateThemesCode = (
// dayStyle: ColorStyle[]
// )

const startPluginGenerateAllLocal = async () => {
  const brandStyle = loadStyle(
    figma
      .getLocalPaintStyles()
      .filter((style) => style.name.includes('Branding'))
  )
  const brandIndex = loadLocalBrandColor(brandStyle)
  const dayStyle = loadStyle(
    figma.getLocalPaintStyles().filter((style) => style.name.includes('Day'))
  )
  const nightStyle = loadStyle(
    figma.getLocalPaintStyles().filter((style) => style.name.includes('Night'))
  )

  let brandCodeColor = generateCode(brandStyle, {})

  await Promise.all([
    updateTextComponent('#branding_color.swift', brandCodeColor),
    // updateTextComponent('#color.swift', componentCodeColor),
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
export { codeLocalStyle }
