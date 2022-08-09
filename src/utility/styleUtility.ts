import { colorToRgb, colorToOpacityHex, colorToUIColor } from './colorUtility'
import { gradientString } from './gradientUtility'

type ColorStyle = {
  type: string
  name: string
  designTokenName: string
  codeName: string
  snakeCodeName: string
  pascalCodeName: string
  color: string
  colorRGB?: string
  UIColor?: string
  opacity?: number
}

type NameType =
  | 'codeName'
  | 'designTokenName'
  | 'snakeCodeName'
  | 'pascalCodeName'
  | 'name'

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

function getReferencePascalName(name: string): string {
  return name
    .split(/[\/ _]/)
    .filter((path: string) => !!path)
    .map((n) => {
      return n
        .split(/(?=[A-Z])/)
        .map((n2) => {
          return n2 != undefined
            ? n2[0].toUpperCase() + n2.slice(1).toLowerCase()
            : ''
        })
        .join('')
        .replace(/(.*?)\%/, 'Opacity$1')
        .replaceAll(' ', '')
    })
    .join('')
    .replace(/^Branding/, '')
    .replace(/^Day/, '')
    .replace(/^Night/, '')
}

function getReferenceName(name: string): string {
  let rName = getReferencePascalName(name)
  return rName[0] != undefined ? rName[0].toLowerCase() + rName.slice(1) : ''
}

function getReferenceSnakeName(name: string): string {
  let rName = name
    .split(/[\/ _]/)
    .filter((path: string) => !!path)
    .map((n) => {
      return n
        .split(/(?=[A-Z])/)
        .filter((s) => s !== ' ')
        .map((s) => {
          return s.trim().toLowerCase()
        })
        .join('_')
        .replace(/(.*?)\%/, 'opacity_$1')
    })
    .join('_')
    .replace(/^branding_/, '')
    .replace(/^day_/, '')
    .replace(/^night_/, '')
  return rName.toLowerCase()
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

const loadLocalBrandColor = (
  localBrandStyle: ColorStyle[],
  nametype: NameType = 'codeName'
) => {
  let brandIndex: BrandColorStyle = {}
  localBrandStyle
    .filter((style) => style.type === 'SOLID')
    .forEach((style) => {
      brandIndex[style.color] = style[nametype]
    })
  return brandIndex
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
        pascalCodeName: getReferencePascalName(colorStyle.name),
        snakeCodeName: getReferenceSnakeName(colorStyle.name),
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
          pascalCodeName: getReferencePascalName(colorStyle.name),
          snakeCodeName: getReferenceSnakeName(colorStyle.name),
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
          pascalCodeName: getReferencePascalName(colorStyle.name),
          snakeCodeName: getReferenceSnakeName(colorStyle.name),
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

export {
  loadLocalStyle,
  getReferenceName,
  loadBrandColor,
  getDesignTokenName,
  getReferenceSnakeName,
  loadStyle,
  loadLocalBrandColor,
}
export type { ColorStyle, BrandColorStyle }
