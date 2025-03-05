import { Board, Position } from "./board";

export type Direction = "NORTH" | "SOUTH" | "EAST" | "WEST";

export class Knight {
  position: Position;
  direction: Direction;
  board: Board;

  constructor(board: Board) {
    this.board = board; 
    this.position = { x: 0, y: 0 };
    this.direction = "NORTH";
  }

  start(x: number, y: number, direction: Direction) {
    const newPos = { x, y }; 
    if (!this.board.isWithinBounds(newPos) || this.board.isObstacle(newPos)) {
      throw new Error("INVALID_START_POSITION");
    }
    this.position = newPos;
    this.direction = direction;
  }

  rotate(newDirection: Direction) {
    this.direction = newDirection;
  }

  move(steps: number) {
    let { x, y } = this.position;
    for (let i = 0; i < steps; i++) {
      let nextX = x;
      let nextY = y;
      if (this.direction === "NORTH") nextY++;
      else if (this.direction === "SOUTH") nextY--;
      else if (this.direction === "EAST") nextX++;
      else if (this.direction === "WEST") nextX--;
 
      if (!this.board.isWithinBounds({ x: nextX, y: nextY })) {
        throw new Error("OUT_OF_THE_BOARD");
      } 
      if (this.board.isObstacle({ x: nextX, y: nextY })) { 
        break;
      }
 
      x = nextX;
      y = nextY; 
    }
    this.position = { x, y };
  }
}
