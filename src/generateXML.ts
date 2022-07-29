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
        return `    <color name="${style.name}">${style.color}</color>`
      } else {
        let color = brandStyle[style.color]
          ? `@color.${brandStyle[style.color]}`
          : style.color
        return `    <color name="${style.name}">${color}</color>`
      }
    })
    .join('\n')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeAllStyle: string = codeLocalStyle(localStyle, brandColor)
  let codeColor = [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<resources>`,
    codeAllStyle,
    `</resources>`,
  ].join('\n')

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.xml/.test(node.name)
  )

  if (searchNode.length != 0) {
    if (searchNode[0].type == 'TEXT') {
      let colorText = <TextNode>searchNode[0]
      updateText(colorText, codeColor).then(() => {
        figma.closePlugin(`Update color.xml 🎉`)
      })
    } else {
      figma.closePlugin(`Layer "#color.xml" is not text`)
    }
  } else {
    addText(codeColor, 0, 0, '#color.xml').then(() => {
      figma.closePlugin(`Added color.xml 🎉`)
    })
  }
}

export default startPlugin

// export for test
export { codeLocalStyle }
