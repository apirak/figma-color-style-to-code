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

  let xmlAllStyle = allStyle
    .filter((style) => style.type === "SOLID")
    .map((style) => {
      if (Object.keys(brandColor).length === 0) {
        return `    <color name="${style.name}">${style.color}</color>`;
      } else {
        let color = brandColor[style.color]
          ? `@color.${brandColor[style.color]}`
          : style.color;
        return `    <color name="${style.name}">${color}</color>`;
      }
    })
    .join("\n");

  let xmlColor = [
    `<?xml version="1.0" encoding="utf-8"?>`,
    `<resources>`,
    xmlAllStyle,
    `</resources>`,
  ].join("\n");

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.xml/.test(node.name)
  );

  if (searchNode.length != 0) {
    if (searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, xmlColor).then(() => {
        figma.closePlugin(`Update color.xml 🎉`);
      });
    } else {
      figma.closePlugin(`Layer "#color.xml" is not text`);
    }
  } else {
    addText(xmlColor, 0, 0, "#color.xml").then(() => {
      figma.closePlugin(`Added color.xml 🎉`);
    });
  }
};

export default startPlugin;
