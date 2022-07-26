import { ColorStyle, loadColorStyle } from "./styleUtility";
import { addText, updateText } from "./textUtility";

let allStyle:ColorStyle[] = [];

let startPlugin = () => {
  let allStyle = loadColorStyle();

  console.log("allStyel", allStyle);

  let cssAllStyle = allStyle.map((style) => {
    return `$${style.name}: ${style.color};`;
  }).join("\n");

  let cssColor = [`// Design System Color`, cssAllStyle ].join("\n");

  const searchNode = figma.currentPage.findAll((node) =>
    /#color.scss/.test(node.name)
  );

  if (searchNode.length != 0) {
    if(searchNode[0].type == "TEXT") {
      let colorText = <TextNode>searchNode[0];
      updateText(colorText, cssColor).then(() => {
        figma.closePlugin(`Update color.scss 🎉`);
      })
    } else {
      figma.closePlugin(`Layer "#color.css" is not text`);
    }
  } else {
    addText(cssColor, 0, 0, "#color.scss").then(() => {
      figma.closePlugin(`Added color.xml 🎉`);
    });
  }
};

export default startPlugin;
