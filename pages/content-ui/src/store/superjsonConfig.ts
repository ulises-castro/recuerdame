import { registerCustom } from "superjson";

// Function to get the path to a given node relative to the document root.
function getNodePath(node: Node) {
  const path = [];
  let currentNode: Node | null = node
  while (currentNode) {
    const index = Array.prototype.indexOf.call(currentNode.parentNode?.childNodes || [], currentNode);
    if (index !== -1) {
      path.unshift(index);
    }
    currentNode = currentNode.parentNode;
  }
  return path;
}

// Function to get a node from the document root using a path.
function getNodeFromPath(path: number[]) {
  let node = document;
  for (const index of path) {
    (node as Node) = node.childNodes[index];
  }
  return node;
}

// Register custom serialization for Range.
registerCustom(
  {
    isApplicable: (value) => value instanceof Range,
    serialize: (range: Range) => {
      return {
        startPath: getNodePath(range.startContainer),
        startOffset: range.startOffset,
        endPath: getNodePath(range.endContainer),
        endOffset: range.endOffset,
      };
    },
    deserialize: (value) => {
      const startContainer = getNodeFromPath(value.startPath);
      const endContainer = getNodeFromPath(value.endPath);
      const range = document.createRange();
      range.setStart(startContainer, value.startOffset);
      range.setEnd(endContainer, value.endOffset);
      if (range.collapsed) {
        range.collapse()
      }
      return range;
    },
  },
  'Range'
);
