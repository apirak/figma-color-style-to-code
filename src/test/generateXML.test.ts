import { brandStyle, localStyle } from './dataForGenerateTesting'
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
      '    <color name="fill_Style_4">#00000000</color>',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '    <item name="primary_fill_style_1">@color.A_Color</item>',
      '    <item name="primary_fill_style_2">@color.B_Color</item>',
      '    <item name="secondary_fill_style_3">#fccce6</item>',
      '    <item name="fill_Style_4">@color.Blank_Color</item>',
    ]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
