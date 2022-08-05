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
        return [
          `    @nonobjc public class var ${style.codeName}: UIColor {`,
          `        return ${style.UIColor}`,
          `    }`,
        ].join('\n')
      } else {
        let color = brandStyle[style.color]
          ? `UIColor.${brandStyle[style.color]}`
          : style.UIColor
        return [
          `    @nonobjc public class var ${style.codeName}: UIColor {`,
          `        dynamicColor(day: ${color}, night: ${color})`,
          `    }`,
        ].join('\n')
      }
    })
    .join('\n')
}

const generateCode = (
  colorStyle: ColorStyle[],
  brandStyle: BrandColorStyle
) => {
  const codeAllStyle: string = codeLocalStyle(colorStyle, brandStyle)
  return [`extension UIColor {`, codeAllStyle, `}`].join('\n')
}

const matchNightStyle = (
  dayStyle: ColorStyle,
  nightStyles: ColorStyle[]
): ColorStyle | undefined => {
  const filterNightStyle = nightStyles.filter((style) => {
    return style.codeName === dayStyle.codeName
  })
  return filterNightStyle.length !== 0 ? filterNightStyle[0] : undefined
}

const codeDayNightStyle = (
  dayStyle: ColorStyle[],
  nightStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return dayStyle
    .filter((style) => style.type === 'SOLID')
    .map((style) => {
      let dayColor = brandStyle[style.color]
        ? `UIColor.${brandStyle[style.color]}`
        : style.UIColor
      let nightColor = dayColor

      let aNightStyle = matchNightStyle(style, nightStyle)
      if (aNightStyle !== undefined) {
        nightColor = brandStyle[aNightStyle.color]
          ? `UIColor.${brandStyle[aNightStyle.color]}`
          : aNightStyle.UIColor
      }

      return [
        `    @nonobjc public class var ${style.codeName}: UIColor {`,
        `        dynamicColor(day: ${dayColor}, night: ${nightColor})`,
        `    }`,
      ].join('\n')
    })
    .join('\n')
}

const generateDayNightCode = (
  dayStyle: ColorStyle[],
  nightStyle: ColorStyle[],
  brandStyle: BrandColorStyle
) => {
  const codeAllStyle: string = codeDayNightStyle(
    dayStyle,
    nightStyle,
    brandStyle
  )
  return [`extension UIColor {`, codeAllStyle, `}`].join('\n')
}

const stratPluginGenerateAllLocal = async () => {
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
  let componentCodeColor = generateDayNightCode(
    dayStyle,
    nightStyle,
    brandIndex
  )

  await Promise.all([
    updateTextComponent('#branding_color.swift', brandCodeColor),
    updateTextComponent('#color.swift', componentCodeColor),
  ])
  figma.closePlugin('done 🎉')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeColor = generateCode(localStyle, brandColor)
  updateTextComponent('#color.swift', codeColor).then((closeNote: string) => {
    figma.closePlugin(closeNote)
  })
}

export { startPluginGenerateAllLocal }
export default startPlugin

// export for test
export { codeLocalStyle }
