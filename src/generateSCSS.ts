import {
  ColorStyle,
  loadLocalStyle,
  BrandColorStyle,
  loadBrandColor,
  loadStyle,
  loadLocalBrandColor,
} from './utility/styleUtility'
import { addText, updateText, updateTextComponent } from './utility/textUtility'

let codeLocalStyle = (
  localStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return localStyle
    .map((style) => {
      if (Object.keys(brandStyle).length === 0) {
        let colorText = style.opacity === 1 ? style.color : style.colorRGB
        return `$${style.snakeCodeName}: ${colorText};`
      } else {
        let color = brandStyle[style.color]
          ? `$${brandStyle[style.color]}`
          : style.opacity === 1
          ? style.color
          : style.colorRGB
        return `$${style.codeName}: ${color}`
      }
    })
    .join('\n')
}

const generateCode = (
  colorStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  const codeAllStyle: string = codeLocalStyle(colorStyle, brandStyle)
  return [`// Brand Color`, codeAllStyle].join('\n')
}

const codeThemesStyle = (
  themeStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return themeStyle
    .filter((style) => style.type === 'SOLID')
    .map((style) => {
      let themeColor = brandStyle[style.color]
        ? `${brandStyle[style.color]}`
        : style.opacity == 1
        ? style.color
        : style.colorRGB

      return `        ${style.codeName}: ${themeColor},`
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
    'const systemColor = {',
    '    day: {',
    codeDayStyle,
    '    },',
    '    night: {',
    codeNightStyle,
    '    },',
    '}',
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

  await Promise.all([
    updateTextComponent('#brand.scss', brandCodeColor),
    updateTextComponent('#themes.scss', themesCodeColor),
  ])

  figma.closePlugin('done 🎉')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeAllStyle: string = codeLocalStyle(localStyle, brandColor)
  let codeColor = [`// Design System Color`, codeAllStyle].join('\n')
  updateTextComponent('#color.scss', codeColor).then((closeNote: string) => {
    figma.closePlugin(closeNote)
  })
}

export default startPlugin

export { startPluginGenerateAllLocal }

// export for test
export { codeLocalStyle, generateThemesCode, generateCode }
