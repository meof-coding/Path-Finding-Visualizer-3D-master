import { getAllNodes } from "./helper";
export function weightedSearchAlgorithm(grid, start, target, nodesToAnimate) {
  //Init node
  start.distance = 0;
  start.direction = "right";
  let unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length) {
    let currentNode = closestNode(unvisitedNodes);
    if (currentNode.distance === Infinity) return false;
    //Create a set that keeps track of  vertices included in the shortest-path tree
    nodesToAnimate.push(currentNode);
    if (currentNode.status !== "start" && currentNode.status !== "finish") {
      currentNode.status = "visited";
      //   currentNode.color = "blue";
    }

    // Ending condition
    if (currentNode.id === target.id) return "success!";
    // Updating neighbors
    updateNeighbors(grid, currentNode);
    // console.log(nodesToAnimate);
  }
}

function updateNeighbors(grid, node) {
  let neighbors = getNeighbors(node, grid);
  //   console.log(neighbors);
  for (let neighbor of neighbors) {
    updateNode(node, neighbor);
  }
}

//Get all adjacent node
function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) {
    neighbors.push(grid[row - 1][col]);
  }

  if (row < grid.length - 1) {
    neighbors.push(grid[row + 1][col]);
  }

  if (col > 0) {
    neighbors.push(grid[row][col - 1]);
  }

  if (col < grid[0].length - 1) {
    neighbors.push(grid[row][col + 1]);
  }
  return neighbors.filter((neighbor) => neighbor.status !== "visited");
}

function closestNode(unvisitedNodes) {
  let currentClosest, index;
  for (let i = 0; i < unvisitedNodes.length; i++) {
    if (
      !currentClosest ||
      currentClosest.distance > unvisitedNodes[i].distance
    ) {
      currentClosest = unvisitedNodes[i];
      index = i;
    }
  }
  unvisitedNodes.splice(index, 1);
  return currentClosest;
}

function updateNode(currentNode, targetNode) {
  let distance = getDistance(currentNode, targetNode);
  let distanceToCompare;
  distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
  //console.log(distanceToCompare, targetNode.distance);
  if (distanceToCompare < targetNode.distance) {
    targetNode.distance = distanceToCompare;
    targetNode.previousNode = currentNode;
    targetNode.path = distance[1];
    targetNode.direction = distance[2];
  }
}

function getDistance(nodeOne, nodeTwo) {
  let x1 = nodeOne.row;
  let y1 = nodeOne.col;
  let x2 = nodeTwo.row;
  let y2 = nodeTwo.col;
  //2 node at the same column but different row
  if (x2 < x1 && y1 === y2) {
    // console.log(nodeOne.direction);
    if (nodeOne.direction === "up") {
      return [1, ["f"], "up"];
    } else if (nodeOne.direction === "right") {
      return [2, ["l", "f"], "up"];
    } else if (nodeOne.direction === "left") {
      return [2, ["r", "f"], "up"];
    } else if (nodeOne.direction === "down") {
      return [3, ["r", "r", "f"], "up"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "up"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "up"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "up"];
    }
  } else if (x2 > x1 && y1 === y2) {
    if (nodeOne.direction === "up") {
      return [3, ["r", "r", "f"], "down"];
    } else if (nodeOne.direction === "right") {
      return [2, ["r", "f"], "down"];
    } else if (nodeOne.direction === "left") {
      return [2, ["l", "f"], "down"];
    } else if (nodeOne.direction === "down") {
      return [1, ["f"], "down"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "down"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "down"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "down"];
    }
  }
  if (y2 < y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["l", "f"], "left"];
    } else if (nodeOne.direction === "right") {
      return [3, ["l", "l", "f"], "left"];
    } else if (nodeOne.direction === "left") {
      return [1, ["f"], "left"];
    } else if (nodeOne.direction === "down") {
      return [2, ["r", "f"], "left"];
    } else if (nodeOne.direction === "up-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "down-right") {
      return [2.5, null, "left"];
    } else if (nodeOne.direction === "up-left") {
      return [1.5, null, "left"];
    } else if (nodeOne.direction === "down-left") {
      return [1.5, null, "left"];
    }
  } else if (y2 > y1 && x1 === x2) {
    if (nodeOne.direction === "up") {
      return [2, ["r", "f"], "right"];
    } else if (nodeOne.direction === "right") {
      return [1, ["f"], "right"];
    } else if (nodeOne.direction === "left") {
      return [3, ["r", "r", "f"], "right"];
    } else if (nodeOne.direction === "down") {
      return [2, ["l", "f"], "right"];
    } else if (nodeOne.direction === "up-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "down-right") {
      return [1.5, null, "right"];
    } else if (nodeOne.direction === "up-left") {
      return [2.5, null, "right"];
    } else if (nodeOne.direction === "down-left") {
      return [2.5, null, "right"];
    }
  }
}
