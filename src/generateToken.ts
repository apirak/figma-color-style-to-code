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
        return `"${style.color}":"${style.name}"`
      } else {
        let color = brandStyle[style.color]
          ? brandStyle[style.color]
          : style.color
        return `"${color}":"${style.name}"`
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
        figma.closePlugin(`Update token.json 🎉`)
      })
    } else {
      figma.closePlugin(`Layer "#token.json" is not text`)
    }
  } else {
    addText(codeColor, 0, 0, '#token.json').then(() => {
      figma.closePlugin(`Added token.json 🎉`)
    })
  }
}

export default startPlugin

// export for test
export { codeLocalStyle }
