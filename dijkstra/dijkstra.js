function dijkstra(aNodes, aEdges, nInitialNodeIdx) {
  // Maps node ID to shortest distance
  const oNodeIdToShortest = {};
  aNodes.forEach(oNode => {
    oNodeIdToShortest[oNode.id] = Infinity;
  });
  // Maps node ID to edges with matching source
  const oNodeIdToEdges = {};
  aEdges.forEach(oEdge => {
    const aNodeEdges = oNodeIdToEdges[oEdge.source] || [];
    aNodeEdges.push(oEdge);
    oNodeIdToEdges[oEdge.source] = aNodeEdges;
  });
  // Start finding distances
  const oInitialNode = aNodes.find(node => node.id === nInitialNodeIdx);
  const aCurNodes = [oInitialNode];
  oNodeIdToShortest[nInitialNodeIdx] = 0;
  while (aCurNodes.length) {
    const oCurNode = aCurNodes.shift();
    oCurNode.visited = true;
    const nCurDistance = oNodeIdToShortest[oCurNode.id];
    const aCurEdges = oNodeIdToEdges[oCurNode.id];
    aCurEdges.forEach(oEdge => {
      const nDistance = nCurDistance + oEdge.metadata.distance;
      if (nDistance < oNodeIdToShortest[oEdge.target])
      oNodeIdToShortest[oEdge.target] = nDistance;
      const oTargetNode = aNodes.find(oNode => oNode.id === oEdge.target);
      if (!oTargetNode.visited) {
        // Will evaluate the target node soon.
        // Nodes should be in order of distance
        // to guarantee that there is no smaller value
        // for nCurDistance out there.
        const nInsertionIdx = aCurNodes.findIndex(oNode => oNodeIdToShortest[oNode.id] > nDistance);
        aCurNodes.splice(nInsertionIdx, 0, oTargetNode);
      }
    });
  }
  console.log(`Shortest paths with initial index ${nInitialNodeIdx}: ${JSON.stringify(oNodeIdToShortest)}`);
}

if (require.main === module) {
  const { graph } = require('./graph.json');
  const { nodes, edges } = graph;
  dijkstra(nodes, edges, 0);
}
