export function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    nodes.push(...row);
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  //Excluding finish node
  if (currentNode.previousNode != null) {
    currentNode = currentNode.previousNode;
  }
  while (currentNode !== null) {
    // Excluding start node
    if (currentNode.previousNode === null) {
      break;
    }
    nodesInShortestPathOrder.unshift(currentNode);
    // console.log(nodesInShortestPathOrder);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
