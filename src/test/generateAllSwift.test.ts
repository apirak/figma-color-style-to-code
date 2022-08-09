import { brandingStyle, dayStyle, nightStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { generateCode, generateDayNightCode } from '../generateSwift'
import { loadLocalBrandColor } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate brand color', () => {
    let generatedCode = [
      'extension UIColor {',
      '    @nonobjc public class var lightBlue: UIColor {',
      '        return UIColor(red: 0.13, green: 0.62, blue: 0.74 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var lightOrange: UIColor {',
      '        return UIColor(red: 0.99, green: 0.52, blue: 0.01 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var darkBlue: UIColor {',
      '        return UIColor(red: 0.00, green: 0.19, blue: 0.28 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var darkOrange: UIColor {',
      '        return UIColor(red: 1.00, green: 0.72, blue: 0.04 , alpha: 1.00)',
      '    }',
      '}',
    ]
    expect(generateCode(brandingStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate day and night color', () => {
    let generatedCode = [
      'extension UIColor {',
      '    @nonobjc public class var primary: UIColor {',
      '        dynamicColor(day: UIColor.lightBlue, night: UIColor.darkBlue)',
      '    }',
      '    @nonobjc public class var secondary: UIColor {',
      '        dynamicColor(day: UIColor.lightOrange, night: UIColor.darkOrange)',
      '    }',
      '    @nonobjc public class var onPrimary: UIColor {',
      '        dynamicColor(day: UIColor(red: 0.92, green: 0.92, blue: 0.92 , alpha: 0.80), night: UIColor(red: 0.78, green: 0.78, blue: 0.78 , alpha: 1.00))',
      '    }',
      '}',
    ]
    const brandIndex = loadLocalBrandColor(brandingStyle)
    expect(generateDayNightCode(dayStyle, nightStyle, brandIndex)).toEqual(
      generatedCode.join('\n')
    )
  })
})
