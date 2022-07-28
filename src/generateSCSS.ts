import { ColorStyle, loadColorStyle, BrandColorStyle, loadBrandColor } from "./utility/styleUtility";
import { addText, updateText } from "./utility/textUtility";

let allStyle: ColorStyle[] = [];

let startPlugin = () => {
  let allStyle = loadColorStyle();
  let brandColor: BrandColorStyle = loadBrandColor();

  let cssAllStyle = allStyle
    .map((style) => {
      if (Object.keys(brandColor).length === 0) {
        let colorText = style.opacity === 1 ? style.color : style.colorRGB;
        return `$${style.name}: ${colorText};`;
      } else {
        let color = brandColor[style.color]
          ? `$${brandColor[style.color]}`
          : style.opacity === 1 ? style.color : style.colorRGB;
        return `$${style.name}: ${color}`;
      }
    })
    .join("\n");

  let cssColor = [`// Design System Color`, cssAllStyle].join("\n");

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.scss/.test(node.name)
  );

  if (searchNode.length != 0) {
    if (searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, cssColor).then(() => {
        figma.closePlugin(`Update color.scss 🎉`);
      });
    } else {
      figma.closePlugin(`Layer "#color.scss" is not text`);
    }
  } else {
    addText(cssColor, 0, 0, "#color.scss").then(() => {
      figma.closePlugin(`Added color.xml 🎉`);
    });
  }
};

export default startPlugin;
