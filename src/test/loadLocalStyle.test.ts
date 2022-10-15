import { ColorStyle, loadStyle } from '../utility/styleUtility'
import { createFigma } from 'figma-api-stub'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  const fills1: ReadonlyArray<Paint> = [
    {
      type: 'SOLID',
      color: {
        r: 0.9490196108818054,
        g: 0.6000000238418579,
        b: 0.29019609093666077,
      },
      opacity: 1,
      visible: true,
    },
  ]

  const fills2: ReadonlyArray<Paint> = [
    {
      type: 'SOLID',
      color: {
        r: 0.99,
        g: 0.8,
        b: 0.0,
      },
      opacity: 0.4,
      visible: true,
    },
  ]

  const fills3: ReadonlyArray<GradientPaint> = [
    {
      type: 'GRADIENT_LINEAR',
      blendMode: 'NORMAL',
      gradientTransform: [
        [6.123234262925839e-17, 1, 0],
        [-1, 6.123234262925839e-17, 1],
      ],
      gradientStops: [
        {
          color: {
            r: 1,
            g: 0.3999999761581421,
            b: 0.3999999761581421,
            a: 1,
          },
          position: 0,
        },
        {
          color: {
            r: 0.1485416293144226,
            g: 0.47429996728897095,
            b: 0.7749999761581421,
            a: 1,
          },
          position: 1,
        },
      ],
      opacity: 1,
      visible: true,
    },
  ]

  const style: PaintStyle = figma.createPaintStyle()
  style.type = 'PAINT'
  style.name = 'Brand / Fill style 2'
  style.paints = fills1
  style.description = 'This is style 1'

  const opacityStyle: PaintStyle = figma.createPaintStyle()
  opacityStyle.type = 'PAINT'
  opacityStyle.name = 'Fill style 2'
  opacityStyle.paints = fills2
  opacityStyle.description = 'This is style 1'

  const emptyStyle: PaintStyle = figma.createPaintStyle()
  emptyStyle.type = 'PAINT'
  emptyStyle.name = 'Fill Style 3'
  emptyStyle.paints = []
  emptyStyle.description = 'This is style 1'

  const gradientStyle: PaintStyle = figma.createPaintStyle()
  gradientStyle.type = 'PAINT'
  gradientStyle.name = 'Gradient Style 4'
  gradientStyle.paints = fills3
  gradientStyle.description = 'This is style 4'

  let localStyle: PaintStyle[] = [
    style,
    opacityStyle,
    emptyStyle,
    gradientStyle,
  ]

  it('load style', () => {
    let colorStyle: ColorStyle[] = loadStyle(localStyle)
    expect(colorStyle).toEqual([
      {
        UIColor: 'UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)',
        color: '#f2994a',
        colorRGB: 'rgba(242, 153, 74, 1)',
        designTokenName: 'brand.fill_style_2',
        codeName: 'brandFillStyle2',
        androidCodeName: 'colorBrandFillStyle2',
        pascalCodeName: 'BrandFillStyle2',
        snakeCodeName: 'brand_fill_style_2',
        name: 'Brand / Fill style 2',
        opacity: 1,
        type: 'SOLID',
      },
      {
        UIColor: 'UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)',
        color: '#66fccc00',
        colorRGB: 'rgba(253, 204, 0, 0.4)',
        designTokenName: 'fill_style_2',
        codeName: 'fillStyle2',
        androidCodeName: 'colorFillStyle2',
        pascalCodeName: 'FillStyle2',
        snakeCodeName: 'fill_style_2',
        name: 'Fill style 2',
        opacity: 0.4,
        type: 'SOLID',
      },
      {
        UIColor: 'UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
        color: '#00000000',
        colorRGB: 'rgba(0, 0, 0, 0)',
        designTokenName: 'fill_Style_3',
        codeName: 'fillStyle3',
        androidCodeName: 'colorFillStyle3',
        pascalCodeName: 'FillStyle3',
        snakeCodeName: 'fill_style_3',
        name: 'Fill Style 3',
        opacity: 0,
        type: 'SOLID',
      },
      {
        UIColor: '',
        codeName: 'gradientStyle4',
        color: 'linear-gradient( 180deg, #ff6666 0%, #2679c6 100% )',
        colorRGB:
          'linear-gradient( 180deg, rgba(255, 102, 102, 1) 0%, rgba(38, 121, 198, 1) 100% )',
        designTokenName: 'gradient_Style_4',
        name: 'Gradient Style 4',
        opacity: 1,
        androidCodeName: 'colorGradientStyle4',
        pascalCodeName: 'GradientStyle4',
        snakeCodeName: 'gradient_style_4',
        type: 'GRADIENT_LINEAR',
      },
    ])
  })
})
