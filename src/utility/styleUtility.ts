import { colorToRgb, rgbToHex } from "./colorUtility";
import { gradientString } from "./gradientUtility";

type ColorStyle = { type: string; name: string; color: string; colorRGB?: string; opacity?:number };

let isSolidPaints = (
  fills: readonly Paint[] | PluginAPI["mixed"]
): fills is SolidPaint[] => {
  if ((fills as Paint[]) != undefined) {
    if ((fills as Paint[]).length != 0) {
      return (fills as SolidPaint[])[0].color != undefined;
    } else {
      return false;
    }
  }
  return false;
};

export function colorToHex(color: RGB, opacity: number | undefined): string {
  const a =
    opacity == 1 || opacity == undefined
      ? ""
      : Math.round(opacity * 255).toString(16);
  return rgbToHex(color["r"], color["g"], color["b"]) + a;
}

function loadColorStyle():ColorStyle[] {
  let allStyle: ColorStyle[] = [];

  figma.getLocalPaintStyles().forEach((colorStyle) => {
    let paint = colorStyle.paints[0];

    if (paint.type == "SOLID") {
      allStyle.push({
        type: paint.type,
        name: getReferenceName(colorStyle.name),
        color: colorToHex(paint.color, paint.opacity),
        colorRGB: colorToRgb(paint.color, paint.opacity),
        opacity: paint.opacity
      });
    }

    if (paint.type == "GRADIENT_LINEAR") {
      allStyle.push({
        type: paint.type,
        name: getReferenceName(colorStyle.name),
        color: gradientString(paint, colorToHex, colorToRgb),
        colorRGB: gradientString(paint, colorToRgb, colorToRgb),
        opacity: paint.opacity
      });
    }
  });
  return allStyle;
}

function getReferenceName(name: string): string {
  let rName = name
    .split("/")
    .filter((path: string) => !!path)
    .map((n) => {
      let n2 = n.trim().replaceAll(" ", "_");
      return n2[0] != undefined ? n2[0].toLowerCase() + n2.slice(1) : ""
    })
    .join("__");
  return rName;
}

export { loadColorStyle, getReferenceName };
export type { ColorStyle }
