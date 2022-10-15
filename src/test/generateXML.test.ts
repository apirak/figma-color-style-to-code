import { brandStyleSnake, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateXML'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate style without brand color', () => {
    let generatedCode = [
      '    <color name="primary_fill_style_1">#f2994a</color>',
      '    <color name="primary_fill_style_2">#fccc0066</color>',
      '    <color name="secondary_fill_style_3">#fccce6</color>',
      '    <color name="fill_style_4">#00000000</color>',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '    <item name="colorPrimaryFillStyle1">@color.a_color</item>',
      '    <item name="colorPrimaryFillStyle2">@color.b_color</item>',
      '    <item name="colorSecondaryFillStyle3">#fccce6</item>',
      '    <item name="colorFillStyle4">@color.blank_color</item>',
    ]
    expect(codeLocalStyle(localStyle, brandStyleSnake)).toEqual(
      generatedCode.join('\n')
    )
  })
})
