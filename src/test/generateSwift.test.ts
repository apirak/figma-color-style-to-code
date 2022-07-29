import { ColorStyle, loadStyle, BrandColorStyle } from "../utility/styleUtility";
import { createFigma } from "figma-api-stub";
import { codeLocalStyle } from "../generateSwift";

describe("Separete Key from Name", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  let brandStyle = {
    "#f2994a": "A__Color",
    "#fccc0066": "B__Color",
    "#00000000": "Blank__Color"
  }

  let localStyle:ColorStyle[] = [
    {
      "UIColor": "UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)",
      "color": "#f2994a",
      "colorRGB": "rgba(242, 153, 74, 1)",
      "name": "fill_style_1",
      "opacity": 1,
      "type": "SOLID"
    }, {
      "UIColor": "UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)",
      "color": "#fccc0066",
      "colorRGB": "rgba(253, 204, 0, 0.4)",
      "name": "fill_style_2",
      "opacity": 0.4,
      "type": "SOLID"
    }, {
      "UIColor": "UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)",
      "color": "#fccce6",
      "colorRGB": "rgba(253, 204, 230, 1)",
      "name": "fill_style_3",
      "opacity": 1,
      "type": "SOLID"
    }, {
      "UIColor": "UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)",
      "color": "#00000000",
      "colorRGB": "rgba(0, 0, 0, 0)",
      "name": "fill_Style_4",
      "opacity": 0,
      "type": "SOLID"
    }
  ];

  it("generate style without brand color", () => {
    let generatedCode = [
      "    @nonobjc public class var fill_style_1: UIColor {",
      "        return UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)",
      "    }",
      "    @nonobjc public class var fill_style_2: UIColor {",
      "        return UIColor(red: 0.99, green: 0.80, blue: 0.00 , alpha: 0.40)",
      "    }",
      "    @nonobjc public class var fill_style_3: UIColor {",
      "        return UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00)",
      "    }",
      "    @nonobjc public class var fill_Style_4: UIColor {",
      "        return UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)",
      "    }"
    ];
    expect(codeLocalStyle(localStyle, {})).toEqual(generatedCode.join("\n"));
  });

  it("generate style with brand color", () => {
    let generatedCode = [
    "    @nonobjc public class var fill_style_1: UIColor {",
    "        dynamicColor(day: UIColor.A__Color, night: UIColor.A__Color)",
    "    }",
    "    @nonobjc public class var fill_style_2: UIColor {",
    "        dynamicColor(day: UIColor.B__Color, night: UIColor.B__Color)",
    "    }",
    "    @nonobjc public class var fill_style_3: UIColor {",
    "        dynamicColor(day: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00), night: UIColor(red: 0.99, green: 0.80, blue: 0.90 , alpha: 1.00))",
    "    }",
    "    @nonobjc public class var fill_Style_4: UIColor {",
    "        dynamicColor(day: UIColor.Blank__Color, night: UIColor.Blank__Color)",
    "    }"]
    expect(codeLocalStyle(localStyle, brandStyle)).toEqual(generatedCode.join("\n"));
  });
});