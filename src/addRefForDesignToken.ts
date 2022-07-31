import {
  ColorStyle,
  loadLocalStyle,
  BrandColorStyle,
  loadBrandColor,
} from './utility/styleUtility'
import { addText, updateText } from './utility/textUtility'

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

let startPlugin = () => {
  // let localStyle: ColorStyle[] = loadLocalStyle()

  let allStyles = figma.getLocalPaintStyles()
  // console.log("allStyle", allStyles);
  // console.log("style paints", allStyles[0].paints);

  let refFolder = 'Branding'
  // let brandStyle: BrandColorStyle = {}
  let brandColor: BrandColorStyle = loadBrandColor()

  //Read brand color
  allStyles
    .filter((style) => style.paints[0].type === 'SOLID')
    .filter((style) => style.name.includes(refFolder))
    .forEach((style) => {
      // brandStyle[style.paints[0]] = style.name
      console.log('name', style.name)
      console.log('discription', style.description)
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
