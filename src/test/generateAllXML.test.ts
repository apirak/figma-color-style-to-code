import { brandingStyle, dayStyle, nightStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import {
  generateCode,
  generateAttrCode,
  generateThemesCode,
} from '../generateXML'
import { loadLocalBrandColor } from '../utility/styleUtility'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  it('generate brand color', () => {
    let generatedCode = [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<resources>',
      '    <color name="light_blue">#229ebd</color>',
      '    <color name="light_orange">#fd8503</color>',
      '    <color name="dark_blue">#013147</color>',
      '    <color name="dark_orange">#ffb70b</color>',
      '</resources>',
    ]
    expect(generateCode(brandingStyle, {})).toEqual(generatedCode.join('\n'))
  })

  it('generate theme code', () => {
    let generatedCode = [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<resources>',
      '  <style name="Theme.OneApp.Day" parent="Theme.MaterialComponents.Day.NoActionBar">',
      '    <item name="colorPrimary">@color/light_blue</item>',
      '    <item name="colorSecondary">@color/light_orange</item>',
      '    <item name="colorOnPrimary">#ccebebeb</item>',
      '  </style>',
      '</resource>',
      '',
      '<?xml version="1.0" encoding="utf-8"?>',
      '<resources>',
      '  <style name="Theme.OneApp.Night" parent="Theme.MaterialComponents.Night.NoActionBar">',
      '    <item name="colorPrimary">@color/dark_blue</item>',
      '    <item name="colorSecondary">@color/dark_orange</item>',
      '    <item name="colorOnPrimary">#c8c8c8</item>',
      '  </style>',
      '</resource>',
    ]
    const brandIndex = loadLocalBrandColor(brandingStyle, 'snakeCodeName')
    expect(generateThemesCode(dayStyle, nightStyle, brandIndex)).toEqual(
      generatedCode.join('\n')
    )
  })

  it('generate attr code', () => {
    let generatedCode = [
      '<?xml version="1.0" encoding="utf-8"?>',
      '<resources>',
      '  <declare-styleable name="OneApp">',
      '    <attr name="colorPrimary" format="color" />',
      '    <attr name="colorSecondary" format="color" />',
      '    <attr name="colorOnPrimary" format="color" />',
      '  </declare-styleable>',
      '</resource>',
    ]
    expect(generateAttrCode(dayStyle, nightStyle)).toEqual(
      generatedCode.join('\n')
    )
  })
})
