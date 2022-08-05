export async function updateText(
  textNode: TextNode,
  text: string
): Promise<TextNode> {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' })
  textNode.fontName = { family: 'Roboto', style: 'Regular' }
  textNode.characters = text
  return textNode
}

export async function addText(
  text: string,
  x: number,
  y: number,
  name: string
): Promise<TextNode> {
  await figma.loadFontAsync({ family: 'Roboto', style: 'Regular' })
  const textNode = figma.createText()
  textNode.fontName = { family: 'Roboto', style: 'Regular' }
  textNode.fontSize = 12
  textNode.x = x
  textNode.y = y
  textNode.characters = text
  textNode.name = name
  return textNode
}

export async function addTextNearSelected(
  node: SceneNode,
  text: string,
  name: string
) {
  let elementNode = <RectangleNode>node
  const textNode = addText(
    text,
    elementNode.x,
    elementNode.y + elementNode.height + 20,
    name
  )
  ;(await textNode).name = name
  if (elementNode.parent) {
    elementNode.parent.appendChild(await textNode)
  }
}

export const updateTextComponent = async (
  layerName: string,
  codeColor: string
): Promise<string> => {
  var fileMatcher = new RegExp(`${layerName}`)
  const searchNode = figma.currentPage.findAll((node) =>
    fileMatcher.test(node.name)
  )

  if (searchNode.length != 0) {
    if (searchNode[0].type == 'TEXT') {
      let colorText = <TextNode>searchNode[0]
      await updateText(colorText, codeColor)
      return `Update ${layerName} 🎉`
    } else {
      return `Layer "${layerName}" is not text`
    }
  } else {
    await addText(codeColor, 0, 0, layerName)
    return `Added ${layerName} 🎉`
  }
}
