import {
  ColorStyle,
  loadLocalStyle,
  BrandColorStyle,
  loadBrandColor,
  getDesignTokenName,
} from './utility/styleUtility'
import { addText, updateText } from './utility/textUtility'
import { colorToOpacityHex } from './utility/colorUtility'

// let codeLocalStyle = (
//   localStyle: ColorStyle[],
//   brandStyle: BrandColorStyle
// ): string => {
//   return localStyle
//     .filter((style) => style.type === 'SOLID')
//     .map((style) => {
//       if (Object.keys(brandStyle).length === 0) {
//         return `    <color name="${style.name}">${style.color}</color>`
//       } else {
//         let color = brandStyle[style.color]
//           ? `@color.${brandStyle[style.color]}`
//           : style.color
//         return `    <color name="${style.name}">${color}</color>`
//       }
//     })
//     .join('\n')
// }

let loadBrandStyleForToken = (allStyles: PaintStyle[]): BrandColorStyle => {
  let brandStyle: BrandColorStyle = {}
  allStyles
    .filter((style) => style.paints[0].type === 'SOLID')
    .forEach((style) => {
      // brandStyle[style.paints[0]] = style.name
      if (style.paints[0] != null && style.paints[0].type === 'SOLID') {
        let hexColor = colorToOpacityHex(
          style.paints[0].color,
          style.paints[0].opacity
        )
        let tokenName = getDesignTokenName(style.name)
        brandStyle[hexColor] = tokenName
      }
    })
  return brandStyle
}

let startPlugin = () => {
  // let localStyle: ColorStyle[] = loadLocalSt.le()
  let refFolder = 'Branding'
  let allBrandStyles = figma
    .getLocalPaintStyles()
    .filter((style) => style.name.includes(refFolder))
  let allLocalStyles = figma
    .getLocalPaintStyles()
    .filter((style) => !style.name.includes(refFolder))

  let brandStyle: BrandColorStyle = loadBrandStyleForToken(allBrandStyles)

  allLocalStyles.forEach((style) => {
    let description = style.description
    description.split('\n').map((line) => {
      return line + 'x'
    })

    console.log('description', description)
    // let str = style.description + '\n' + 'ref:xxx'
    // str.replace(/ref:(.*?)(\n|$)/g, 'ref:abc')
    // console.log('abc', str)
  })
  // let codeAllStyle: string = codeLocalStyle(localStyle, brandColor)

  // let codeColor = [
  //   `<?xml version="1.0" encoding="utf-8"?>`,
  //   `<resources>`,
  //   codeAllStyle,
  //   `</resources>`,
  // ].join('\n')

  // const searchNode = figma.currentPage.findAll((node) =>
  //   /#color.xml/.test(node.name)
  // )

  // if (searchNode.length != 0) {
  //   if (searchNode[0].type == 'TEXT') {
  //     let colorText = <TextNode>searchNode[0]
  //     updateText(colorText, codeColor).then(() => {
  //       figma.closePlugin(`Update color.xml 🎉`)
  //     })
  //   } else {
  //     figma.closePlugin(`Layer "#color.xml" is not text`)
  //   }
  // } else {
  //   addText(codeColor, 0, 0, '#color.xml').then(() => {
  //     figma.closePlugin(`Added color.xml 🎉`)
  //   })
  // }

  figma.closePlugin(`Update Reference 🎉`)
}

export default startPlugin

// export for test
// export { codeLocalStyle }
