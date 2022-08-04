import { brandStyle, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateJson'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate style without brand color', () => {
    let generatedCode = [
      `"#f2994a":"primary__fill_style_1",`,
      `"#fccc0066":"primary__fill_style_2",`,
      `"#fccce6":"secondary__fill_style_3",`,
      `"#00000000":"fill_Style_4"`,
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      `"A__Color":"primary__fill_style_1",`,
      `"B__Color":"primary__fill_style_2",`,
      `"#fccce6":"secondary__fill_style_3",`,
      `"Blank__Color":"fill_Style_4"`,
    ]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
