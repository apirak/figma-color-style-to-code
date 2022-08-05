import { brandStyleSnake, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateSCSS'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate style without brand color', () => {
    let generatedCode = [
      '$primary_fill_style_1: #f2994a;',
      '$primary_fill_style_2: rgba(253, 204, 0, 0.4);',
      '$secondary_fill_style_3: #fccce6;',
      '$fill_Style_4: rgba(0, 0, 0, 0);',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '$primary_fill_style_1: $a_color',
      '$primary_fill_style_2: $b_color',
      '$secondary_fill_style_3: #fccce6',
      '$fill_Style_4: $blank_color',
    ]
    expect(codeLocalStyle(localStyle, brandStyleSnake)).toEqual(
      generatedCode.join('\n')
    )
  })
})
