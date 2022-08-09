import { brandStyle, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateSwift'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate style without brand color', () => {
    let generatedCode = [
      '    @nonobjc public class var primaryFillStyle1: UIColor {',
      '        return UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var primaryFillStyle2: UIColor {',
      '        return UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)',
      '    }',
      '    @nonobjc public class var secondaryFillStyle3: UIColor {',
      '        return UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var fillStyle4: UIColor {',
      '        return UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
      '    }',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '    @nonobjc public class var primaryFillStyle1: UIColor {',
      '        dynamicColor(day: UIColor.AColor, night: UIColor.AColor)',
      '    }',
      '    @nonobjc public class var primaryFillStyle2: UIColor {',
      '        dynamicColor(day: UIColor.BColor, night: UIColor.BColor)',
      '    }',
      '    @nonobjc public class var secondaryFillStyle3: UIColor {',
      '        dynamicColor(day: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00), night: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00))',
      '    }',
      '    @nonobjc public class var fillStyle4: UIColor {',
      '        dynamicColor(day: UIColor.BlankColor, night: UIColor.BlankColor)',
      '    }',
    ]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
