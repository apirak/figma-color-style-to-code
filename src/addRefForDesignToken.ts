import { BrandColorStyle, getDesignTokenName } from './utility/styleUtility'
import { colorToOpacityHex } from './utility/colorUtility'

let updateCount: number = 0
let referenceCount: number = 0

let loadBrandStyleForToken = (allStyles: PaintStyle[]): BrandColorStyle => {
  let brandStyle: BrandColorStyle = {}
  allStyles.forEach((style) => {
    let tokenName = getDesignTokenName(style.name)
    if (style.paints.length === 0) {
      brandStyle['#00000000'] = tokenName
    } else {
      if (style.paints[0].type === 'SOLID') {
        let hexColor = colorToOpacityHex(
          style.paints[0].color,
          style.paints[0].opacity
        )
        brandStyle[hexColor] = tokenName
      }
    }
  })
  return brandStyle
}

let startPlugin = () => {
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
    let descriptionWithOutRef = description
      .split('\n')
      .filter((line) => !line.includes('ref:'))
      .map((line) => {
        return line
      })

    if (style.paints.length != 0 && style.paints[0].type === 'SOLID') {
      let hexColor = colorToOpacityHex(
        style.paints[0].color,
        style.paints[0].opacity
      )
      if (brandStyle[hexColor] !== undefined) {
        descriptionWithOutRef.push(`ref:${brandStyle[hexColor]}`)
        referenceCount++
      }
    }
    let output = descriptionWithOutRef.join('\n')
    if (style.description !== output) {
      style.description = output
      updateCount++
    }
  })

  figma.closePlugin(`Update Reference (${updateCount}/${referenceCount}) 🎉`)
}

export default startPlugin

// export for test
// export { codeLocalStyle }
