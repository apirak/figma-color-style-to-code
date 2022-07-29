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
      '    <color name="fill_style_1">#f2994a</color>',
      '    <color name="fill_style_2">#fccc0066</color>',
      '    <color name="fill_style_3">#fccce6</color>',
      '    <color name="fill_Style_4">#00000000</color>',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '    <color name="fill_style_1">@color.A__Color</color>',
      '    <color name="fill_style_2">@color.B__Color</color>',
      '    <color name="fill_style_3">#fccce6</color>',
      '    <color name="fill_Style_4">@color.Blank__Color</color>',
    ]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
