import { ColorStyle, loadColorStyle, BrandColorStyle, loadBrandColor } from "./utility/styleUtility";
import { addText, updateText } from "./utility/textUtility";

let allStyle: ColorStyle[] = [];

let startPlugin = () => {
  let allStyle = loadColorStyle();
  let brandColor:BrandColorStyle = loadBrandColor();

  let xmlAllStyle = allStyle
    .filter((style) => style.type === "SOLID")
    .map((style) => {
      if(brandColor === {}) {
        return `"${style.color}":"${style.name}"`;
      } else {
        let color = brandColor[style.color] ? brandColor[style.color] : style.color;
        return `"${color}":"${style.name}"`;
      }
    })
    .join(",\n");

  let xmlColor = [`{`, xmlAllStyle, `}`].join(" ");


  const searchNode = figma.currentPage.findAll((node) =>
    /#color.json/.test(node.name)
  );

  if (searchNode.length != 0) {
    if (searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, xmlColor).then(() => {
        figma.closePlugin(`Update color.json 🎉`);
      });
    } else {
      figma.closePlugin(`Layer "#color.json" is not text`);
    }
  } else {
    addText(xmlColor, 0, 0, "#color.json").then(() => {
      figma.closePlugin(`Added color.json 🎉`);
    });
  }
};

export default startPlugin;
