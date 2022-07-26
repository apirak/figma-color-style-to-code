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
        return `"${style.color}":"${style.snakeCodeName}"`
      } else {
        let color = brandStyle[style.color]
          ? brandStyle[style.color]
          : style.color
        return `"${color}":"${style.snakeCodeName}"`
      }
    })
    .join(',\n')
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle()
  let brandColor: BrandColorStyle = loadBrandColor()
  let codeAllStyle: string = codeLocalStyle(localStyle, brandColor)
  let codeColor = [`{`, codeAllStyle, `}`].join(' ')

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.json/.test(node.name)
  )

  if (searchNode.length != 0) {
    if (searchNode[0].type == 'TEXT') {
      let colorText = <TextNode>searchNode[0]
      updateText(colorText, codeColor).then(() => {
        figma.closePlugin(`Update color.json 🎉`)
      })
    } else {
      figma.closePlugin(`Layer "#color.json" is not text`)
    }
  } else {
    addText(codeColor, 0, 0, '#color.json').then(() => {
      figma.closePlugin(`Added color.json 🎉`)
    })
  }
}

export default startPlugin

// export for test
export { codeLocalStyle }
