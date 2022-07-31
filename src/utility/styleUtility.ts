import { colorToRgb, rgbToHex, colorToUIColor } from './colorUtility'
import { gradientString } from './gradientUtility'

type ColorStyle = {
  type: string
  name: string
  designTokenName: string
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

export function colorToHex(color: RGB, opacity: number | undefined): string {
  const a =
    opacity == 1 || opacity == undefined
      ? ''
      : Math.round(opacity * 255).toString(16)
  return rgbToHex(color['r'], color['g'], color['b']) + a
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
        name: getReferenceName(colorStyle.name),
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
          name: getReferenceName(colorStyle.name),
          designTokenName: getDesignTokenName(colorStyle.name),
          color: colorToHex(paint.color, paint.opacity),
          colorRGB: colorToRgb(paint.color, paint.opacity),
          UIColor: colorToUIColor(paint.color, paint.opacity),
          opacity: paint.opacity,
        })
      }

      if (paint.type == 'GRADIENT_LINEAR') {
        allStyle.push({
          type: paint.type,
          name: getReferenceName(colorStyle.name),
          designTokenName: getDesignTokenName(colorStyle.name),
          color: gradientString(paint, colorToHex, colorToRgb),
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
  return name
}

export { loadLocalStyle, getReferenceName, loadBrandColor, getDesignTokenName }
export type { ColorStyle, BrandColorStyle }

// For test
export { loadStyle }
