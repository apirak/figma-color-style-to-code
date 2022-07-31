import { ColorStyle, BrandColorStyle } from '../utility/styleUtility'

let brandStyle: BrandColorStyle = {
  '#f2994a': 'A__Color',
  '#fccc0066': 'B__Color',
  '#00000000': 'Blank__Color',
}

let localStyle: ColorStyle[] = [
  {
    UIColor: 'UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)',
    color: '#f2994a',
    colorRGB: 'rgba(242, 153, 74, 1)',
    designTokenName: 'fill_style_1',
    name: 'fill_style_1',
    opacity: 1,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)',
    color: '#fccc0066',
    colorRGB: 'rgba(253, 204, 0, 0.4)',
    designTokenName: 'fill_style_2',
    name: 'fill_style_2',
    opacity: 0.4,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)',
    color: '#fccce6',
    colorRGB: 'rgba(253, 204, 230, 1)',
    designTokenName: 'fill_style_3',
    name: 'fill_style_3',
    opacity: 1,
    type: 'SOLID',
  },
  {
    UIColor: 'UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
    color: '#00000000',
    colorRGB: 'rgba(0, 0, 0, 0)',
    designTokenName: 'fill_style_4',
    name: 'fill_Style_4',
    opacity: 0,
    type: 'SOLID',
  },
]

export { brandStyle, localStyle }
