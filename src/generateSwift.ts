import {
  ColorStyle,
  loadLocalStyle,
  BrandColorStyle,
  loadBrandColor,
} from './utility/styleUtility'
import { addText, updateText } from './utility/textUtility'

let codeLocalStyle = (
  localStyle: ColorStyle[],
  brandStyle: BrandColorStyle
): string => {
  return localStyle
    .filter((style) => style.type === 'SOLID')
    .map((style) => {
      if (Object.keys(brandStyle).length === 0) {
        return [
          `    @nonobjc public class var ${style.name}: UIColor {`,
          `        return ${style.UIColor}`,
          `    }`,
        ].join('\n')
      } else {
        let color = brandStyle[style.color]
          ? `UIColor.${brandStyle[style.color]}`
          : style.UIColor
        return [
          `    @nonobjc public class var ${style.name}: UIColor {`,
          `        dynamicColor(day: ${color}, night: ${color})`,
          `    }`,
        ].join('\n')
      }
    })
    .join('\n')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeAllStyle: string = codeLocalStyle(localStyle, brandColor)
  let codeColor = [`extension UIColor {`, codeAllStyle, `}`].join('\n')

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.swift/.test(node.name)
  )

  if (searchNode.length != 0) {
    if (searchNode[0].type == 'TEXT') {
      let colorText = <TextNode>searchNode[0]
      updateText(colorText, codeColor).then(() => {
        figma.closePlugin(`Update color.swift 🎉`)
      })
    } else {
      figma.closePlugin(`Layer "#color.swift" is not text`)
    }
  } else {
    addText(codeColor, 0, 0, '#color.swift').then(() => {
      figma.closePlugin(`Added color.swift 🎉`)
    })
  }
}

export default startPlugin

// export for test
export { codeLocalStyle }
