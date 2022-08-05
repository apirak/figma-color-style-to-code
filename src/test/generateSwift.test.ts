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
      '    @nonobjc public class var primary_fill_style_1: UIColor {',
      '        return UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var primary_fill_style_2: UIColor {',
      '        return UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)',
      '    }',
      '    @nonobjc public class var secondary_fill_style_3: UIColor {',
      '        return UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)',
      '    }',
      '    @nonobjc public class var fill_Style_4: UIColor {',
      '        return UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)',
      '    }',
    ]
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate style with brand color', () => {
    let generatedCode = [
      '    @nonobjc public class var primary_fill_style_1: UIColor {',
      '        dynamicColor(day: UIColor.A_Color, night: UIColor.A_Color)',
      '    }',
      '    @nonobjc public class var primary_fill_style_2: UIColor {',
      '        dynamicColor(day: UIColor.B_Color, night: UIColor.B_Color)',
      '    }',
      '    @nonobjc public class var secondary_fill_style_3: UIColor {',
      '        dynamicColor(day: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00), night: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00))',
      '    }',
      '    @nonobjc public class var fill_Style_4: UIColor {',
      '        dynamicColor(day: UIColor.Blank_Color, night: UIColor.Blank_Color)',
      '    }',
    ]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
