import { Board } from "../src/board";
import { Knight } from "../src/knight";

describe("Knight movement", () => {
  const boardData = {
    width: 5,
    height: 5,
    obstacles: [
      { x: 2, y: 0 },
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 }
    ]
  };
  let board = new Board(boardData.width, boardData.height, boardData.obstacles);
  let knight: Knight;

  beforeEach(() => {
    knight = new Knight(board);
  });

  test("Should start at a valid position", () => {
    knight.start(0, 0, "NORTH");
    expect(knight.position).toEqual({ x: 0, y: 0 });
    expect(knight.direction).toBe("NORTH");
  });

  test("Should throw error for invalid start position", () => {
    expect(() => knight.start(2, 1, "EAST")).toThrow("INVALID_START_POSITION");
  });

  test("Should rotate correctly", () => {
    knight.start(0, 0, "NORTH");
    knight.rotate("WEST");
    expect(knight.direction).toBe("WEST");
  });

  test("Should move within bounds when no obstacle", () => {
    knight.start(0, 0, "NORTH");
    knight.move(4);
    expect(knight.position).toEqual({ x: 0, y: 4 });
  });

  test("Should stop at obstacle during move", () => {
    knight.start(0, 0, "EAST");
    knight.move(2);
    expect(knight.position).toEqual({ x: 1, y: 0 });
  });

  test("Should throw OUT_OF_THE_BOARD if move goes out", () => {
    knight.start(4, 4, "NORTH");
    expect(() => knight.move(1)).toThrow("OUT_OF_THE_BOARD");
  });
});
