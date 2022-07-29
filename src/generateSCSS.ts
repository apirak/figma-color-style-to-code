import { ColorStyle, loadLocalStyle, BrandColorStyle, loadBrandColor } from "./utility/styleUtility";
import { addText, updateText } from "./utility/textUtility";

let codeLocalStyle = (localStyle: ColorStyle[], brandStyle: BrandColorStyle): string => {
  return localStyle
    .map((style) => {
      if (Object.keys(brandStyle).length === 0) {
        let colorText = style.opacity === 1 ? style.color : style.colorRGB;
        return `$${style.name}: ${colorText};`;
      } else {
        let color = brandStyle[style.color]
          ? `$${brandStyle[style.color]}`
          : style.opacity === 1 ? style.color : style.colorRGB;
        return `$${style.name}: ${color}`;
      }
    })
  .join("\n");
}

let startPlugin = () => {
  let localStyle: ColorStyle[] = loadLocalStyle();
  let brandColor: BrandColorStyle = loadBrandColor();
  let codeAllStyle: string = codeLocalStyle(localStyle, brandColor);
  let codeColor = [`// Design System Color`, codeAllStyle].join("\n");

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.scss/.test(node.name)
  );

  if (searchNode.length != 0) {
    if (searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, codeColor).then(() => {
        figma.closePlugin(`Update color.scss 🎉`);
      });
    } else {
      figma.closePlugin(`Layer "#color.scss" is not text`);
    }
  } else {
    addText(codeColor, 0, 0, "#color.scss").then(() => {
      figma.closePlugin(`Added color.xml 🎉`);
    });
  }
};

export default startPlugin;
