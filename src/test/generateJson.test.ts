import { brandStyleSnake, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateJson'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate style without brand color', () => {
    let generatedCode = [
      `"#f2994a":"primary_fill_style_1",`,
      `"#fccc0066":"primary_fill_style_2",`,
      `"#fccce6":"secondary_fill_style_3",`,
      `"#00000000":"fill_style_4"`,
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      `"a_color":"primary_fill_style_1",`,
      `"b_color":"primary_fill_style_2",`,
      `"#fccce6":"secondary_fill_style_3",`,
      `"blank_color":"fill_style_4"`,
    ]
    expect(codeLocalStyle(localStyle, brandStyleSnake)).toEqual(
      generatedCode.join('\n')
    )
  })
})
