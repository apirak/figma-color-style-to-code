import { ColorStyle, BrandColorStyle } from '../utility/styleUtility'

let brandStyle: BrandColorStyle = {
  '#f2994a': 'A_Color',
  '#fccc0066': 'B_Color',
  '#00000000': 'Blank_Color',
}

let localStyle: ColorStyle[] = [
  {
    UIColor: 'UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)',
    color: '#f2994a',
    colorRGB: 'rgba(242, 153, 74, 1)',
    name: 'Primary / fill style 1',
    designTokenName: 'primary.fill_style_1',
    codeName: 'primary_fill_style_1',
    snakeCodeName: 'primaryFillStyle1',
    opacity: 1,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)',
    color: '#fccc0066',
    colorRGB: 'rgba(253, 204, 0, 0.4)',
    name: 'Primary / fill style 2',
    designTokenName: 'primary.fill_style_2',
    codeName: 'primary_fill_style_2',
    snakeCodeName: 'primaryFillStyle2',
    opacity: 0.4,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)',
    color: '#fccce6',
    colorRGB: 'rgba(253, 204, 230, 1)',
    name: 'Secondary / fill style 3',
    designTokenName: 'secondary.fill_style_3',
    codeName: 'secondary_fill_style_3',
    snakeCodeName: 'secondaryFillStyle3',
    opacity: 1,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
    color: '#00000000',
    colorRGB: 'rgba(0, 0, 0, 0)',
    name: 'fill Style 4',
    designTokenName: 'fill_style_4',
    codeName: 'fill_Style_4',
    snakeCodeName: 'fillStyle4',
    opacity: 0,
    type: 'SOLID',
  },
]

export { brandStyle, localStyle }
