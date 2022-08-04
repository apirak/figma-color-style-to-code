import { colorToRgb, colorToOpacityHex, colorToUIColor } from './colorUtility'
import { gradientString } from './gradientUtility'

type ColorStyle = {
  type: string
  name: string
  designTokenName: string
  codeName: string
  color: string
  colorRGB?: string
  UIColor?: string
  opacity?: number
}

type BrandColorStyle = { [key: string]: string }

let isSolidPaints = (
  fills: readonly Paint[] | PluginAPI['mixed']
): fills is SolidPaint[] => {
  if ((fills as Paint[]) != undefined) {
    if ((fills as Paint[]).length != 0) {
      return (fills as SolidPaint[])[0].color != undefined
    } else {
      return false
    }
  }
  return false
}

function getReferenceName(name: string): string {
  let rName = name
    .split('/')
    .filter((path: string) => !!path)
    .map((n) => {
      let n2 = n.trim().replaceAll(' ', '_')
      return n2[0] != undefined ? n2[0].toLowerCase() + n2.slice(1) : ''
    })
    .join('__')
  return rName
}

function getDesignTokenName(name: string): string {
  let dName = name
    .split('/')
    .filter((path: string) => !!path)
    .map((n) => {
      let n2 = n.trim().replaceAll(' ', '_')
      return n2[0] != undefined ? n2[0].toLowerCase() + n2.slice(1) : ''
    })
    .join('.')
  return dName
}

const loadBrandColor = () => {
  const searchBrandNode = figma.currentPage.findAll((node) =>
    /#brand_color.json/.test(node.name)
  )
  if (searchBrandNode.length != 0 && searchBrandNode[0].type == 'TEXT') {
    let brandColorNode = <TextNode>searchBrandNode[0]
    return JSON.parse(brandColorNode.characters)
  } else {
    return {}
  }
}

function loadStyle(styles: PaintStyle[]) {
  let allStyle: ColorStyle[] = []

  styles.forEach((colorStyle) => {
    if (colorStyle.paints.length === 0) {
      allStyle.push({
        type: 'SOLID',
        name: colorStyle.name,
        codeName: getReferenceName(colorStyle.name),
        designTokenName: getDesignTokenName(colorStyle.name),
        color: '#00000000',
        colorRGB: 'rgba(0, 0, 0, 0)',
        UIColor: 'UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
        opacity: 0,
      })
    } else {
      let paint = colorStyle.paints[0]

      if (paint.type == 'SOLID') {
        allStyle.push({
          type: paint.type,
          name: colorStyle.name,
          codeName: getReferenceName(colorStyle.name),
          designTokenName: getDesignTokenName(colorStyle.name),
          color: colorToOpacityHex(paint.color, paint.opacity),
          colorRGB: colorToRgb(paint.color, paint.opacity),
          UIColor: colorToUIColor(paint.color, paint.opacity),
          opacity: paint.opacity,
        })
      }

      if (paint.type == 'GRADIENT_LINEAR') {
        allStyle.push({
          type: paint.type,
          name: colorStyle.name,
          codeName: getReferenceName(colorStyle.name),
          designTokenName: getDesignTokenName(colorStyle.name),
          color: gradientString(paint, colorToOpacityHex, colorToRgb),
          colorRGB: gradientString(paint, colorToRgb, colorToRgb),
          UIColor: '',
          opacity: paint.opacity,
        })
      }
    }
  })
  return allStyle
}

function loadLocalStyle(): ColorStyle[] {
  return loadStyle(figma.getLocalPaintStyles())
}

export { loadLocalStyle, getReferenceName, loadBrandColor, getDesignTokenName }
export type { ColorStyle, BrandColorStyle }

// For test
export { loadStyle }
