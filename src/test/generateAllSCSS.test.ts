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
      'const systemColor = {',
      '    day: {',
      '        primary: brandColor.light_blue,',
      '        secondary: brandColor.light_orange,',
      '        onPrimary: rgba(235, 235, 235, 0.8),',
      '    },',
      '    night: {',
      '        primary: brandColor.dark_blue,',
      '        secondary: brandColor.dark_orange,',
      '        onPrimary: #c8c8c8,',
      '    },',
      '}',
    ]
    const brandIndex = loadLocalBrandColor(brandingStyle, 'snakeCodeName')
    expect(generateThemesCode(dayStyle, nightStyle, brandIndex)).toEqual(
      generatedCode.join('\n')
    )
  })
})
