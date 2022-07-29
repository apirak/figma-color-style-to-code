import { ColorStyle, loadStyle } from "../utility/styleUtility";
import { createFigma } from "figma-api-stub";

describe("Separete Key from Name", () => {
  // @ts-ignore
  global.figma = createFigma({
    simulateErrors: true,
  });

  const fills1: ReadonlyArray<Paint> = [
    {
      type: "SOLID",
      color: {
        r: 0.9490196108818054,
        g: 0.6000000238418579,
        b: 0.29019609093666077,
      },
      opacity: 1,
      visible: true,
    }
  ];

  const fills2: ReadonlyArray<Paint> = [
    {
      type: "SOLID",
      color: {
        r: 0.99,
        g: 0.80,
        b: 0.00,
      },
      opacity: 0.40,
      visible: true,
    }
  ];

  const style: PaintStyle = figma.createPaintStyle();
  style.type = "PAINT";
  style.name = "Fill style 2";
  style.paints = fills1;
  style.description = "This is style 1";

  const opacityStyle: PaintStyle = figma.createPaintStyle();
  opacityStyle.type = "PAINT";
  opacityStyle.name = "Fill style 2";
  opacityStyle.paints = fills2;
  opacityStyle.description = "This is style 1";

  const emptyStyle: PaintStyle = figma.createPaintStyle();
  emptyStyle.type = "PAINT";
  emptyStyle.name = "Fill Style 3";
  emptyStyle.paints = [];
  emptyStyle.description = "This is style 1";

  let localStyle:PaintStyle[] = [style, opacityStyle, emptyStyle];

  it("load style", () => {
    let colorStyle: ColorStyle[] = loadStyle(localStyle);
    expect(colorStyle).toEqual([
      {
        "UIColor": "UIColor(red: 0.95, green: 0.60, blue: 0.29 , alpha: 1.00)",
        "color": "#f2994a",
        "colorRGB": "rgba(242, 153, 74, 1)",
        "name": "fill_style_2",
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
        "UIColor": "UIColor(red: 0.0, green: 0.0, blue: 0.0 , alpha: 0.0)",
        "color": "#00000000",
        "colorRGB": "rgba(0, 0, 0, 0)",
        "name": "fill_Style_3",
        "opacity": 0,
        "type": "SOLID"
      }
    ]);
  });
});