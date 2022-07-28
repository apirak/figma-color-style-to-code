import {
  ColorStyle,
  loadColorStyle,
  BrandColorStyle,
  loadBrandColor,
} from "./utility/styleUtility";
import { addText, updateText } from "./utility/textUtility";

let allStyle: ColorStyle[] = [];

let startPlugin = () => {
  let allStyle = loadColorStyle();
  let brandColor: BrandColorStyle = loadBrandColor();

  let codeAllStyle = allStyle
    .filter((style) => style.type === "SOLID")
    .map((style) => {
      if (Object.keys(brandColor).length === 0) {
        return [
          `    @nonobjc public class var ${style.name}: UIColor {`,
          `        dynamicColor(light: ${style.UIColor}, dark: ${style.UIColor})`,
          ``,
        ].join("\n");
      } else {
        let color = brandColor[style.color]
          ? `UIColor.${brandColor[style.color]}`
          : style.UIColor;
        return [
          `    @nonobjc public class var ${style.name}: UIColor {`,
          `        dynamicColor(light: ${color}, dark: ${color})`,
          ``,
        ].join("\n");
      }
    })
    .join("\n");

  let codeColor = [`extension UIColor {`, codeAllStyle, `}`].join("\n");

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.swift/.test(node.name)
  );

  if (searchNode.length != 0) {
    if (searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, codeColor).then(() => {
        figma.closePlugin(`Update color.swift 🎉`);
      });
    } else {
      figma.closePlugin(`Layer "#color.swift" is not text`);
    }
  } else {
    addText(codeColor, 0, 0, "#color.swift").then(() => {
      figma.closePlugin(`Added color.swift 🎉`);
    });
  }
};

export default startPlugin;
