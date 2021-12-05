export default class Neighbors {
  // all neighbors of a cell
  // 1  1  1
  // 1  X  1
  // 1  1  1
  all = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  // diagonals neighbors of a cell
  // 1  0  1
  // 0  X  0
  // 1  0  1
  diagonals = [
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 },
  ];

  // adjacent neighbors of a cell
  // 0  1  0
  // 1  X  1
  // 0  1  0
  adjacent = [
    { x: 0, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
  ];

  // allWithThis neighbors of a cell
  // 1  1  1
  // 1  1  1
  // 1  1  1
  allWithThis = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 0, y: 0 }, // THIS CELL
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  public getAllNeighbors(x: number, y: number) {
    return this.all.map((neighbor) => ({
      x: x + neighbor.x,
      y: y + neighbor.y,
    }));
  }
}
