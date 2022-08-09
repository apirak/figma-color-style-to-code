import { brandingStyle, dayStyle, nightStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { generateCode, generateThemesCode } from '../generateSCSS'
import { loadLocalBrandColor } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate brand color', () => {
    let generatedCode = [
      '// Brand Color',
      '$light_blue: #229ebd;',
      '$light_orange: #fd8503;',
      '$dark_blue: #013147;',
      '$dark_orange: #ffb70b;',
    ]
    expect(generateCode(brandingStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate day and night color', () => {
    let generatedCode = [
      '// Day Themes',
      '$primary: $light_blue;',
      '$secondary: $light_orange;',
      '$on_primary: #ebebeb;',
      '',
      '// Night Themes',
      '$primary: $dark_blue;',
      '$secondary: $dark_orange;',
      '$on_primary: #c8c8c8;',
    ]
    const brandIndex = loadLocalBrandColor(brandingStyle, 'snakeCodeName')
    expect(generateThemesCode(dayStyle, nightStyle, brandIndex)).toEqual(
      generatedCode.join('\n')
    )
  })
})
