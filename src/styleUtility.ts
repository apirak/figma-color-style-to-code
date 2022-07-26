import { colorToRgb, rgbToHex } from "./colorUtility";
import { gradientString } from "./gradientUtility";

type ColorStyle = { type: string; name: string; color: string };

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
      let name = getReferenceName(colorStyle.name);
      let color = colorToHex(paint.color, paint.opacity);
      allStyle.push({ type: "SOLID", name: name, color: color });
    }

    if (paint.type == "GRADIENT_LINEAR") {
      // return gradientString(paint, getColor, getAlphaColor);
    }
  });
  return allStyle;
}

function getReferenceName(name: string): string {
  let rName = name
    .split("/")
    .filter((path: string) => !!path)
    .map((y) => y.trim().replaceAll(" ", "_"))
    .join("__");
  return rName.toLowerCase();
}

export { loadColorStyle, getReferenceName };
export type { ColorStyle }
