import { loadColorStyle } from "./styleUtility"

let startPlugin = () => {
  console.log("Start");
  loadColorStyle()
  // textScale = loadTextStyle();

  // if (Object.keys(textScale[targetScale]).length === 0) {
  //   figma.closePlugin(`Empty style for "${targetScale}"`);
  // }

  // updateAllTextProperty();

  figma.closePlugin(`Updated 🎉`);
};

export default startPlugin;
