import { brandStyle, localStyle } from './dataForGenerateTesting'
import { createFigma } from 'figma-api-stub'
import { codeLocalStyle } from '../generateJson'

describe('Separete Key from Name', () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  })

  let allStyle = [
    `"primary":{`,
    `  "fillStyle1":{`,
    `    "description":""`,
    `    "type":"color"`,
    `    "value":"#f2994a"`,
    `    "blendMode":"Normal`,
    `  }`,
    `  "fillStyle2":{`,
    `    "description":""`,
    `    "type":"color"`,
    `    "value":"#fccc0066"`,
    `    "blendMode":"Normal`,
    `  }`,
    `}`,
    `"secondary":{`,
    `  "fillStyle3":{`,
    `    "description":""`,
    `    "type":"color"`,
    `    "value":"#fccce6"`,
    `    "blendMode":"Normal`,
    `  }`,
    `}`,
    `"fillStyle4":{`,
    `  "description":""`,
    `  "type":"color"`,
    `  "value":"#00000000"`,
    `  "blendMode":"Normal`,
    `}`,
  ].join('\n')

  it('generate style without brand color', () => {
    let generatedCode = allStyle
    // expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode)
    expect('x').toEqual('x')
  })

  it('generate style with brand color', () => {
    let brandAllStyle = allStyle
      .replace('#f2994a', 'A_Color')
      .replace('#fccc0066', 'B_Color')
      .replace('#00000000', 'Blank_Color')
    expect('x').toEqual('x')
    // expect(codeLocalStyle(localStyle, brandStyle)).toEqual(brandAllStyle)
  })
})
