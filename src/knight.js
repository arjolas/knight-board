"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Knight = void 0;
class Knight {
    constructor(board) {
        this.board = board;
        this.position = { x: 0, y: 0 };
        this.direction = "NORTH";
    }
    start(x, y, direction) {
        const newPos = { x, y };
        if (!this.board.isWithinBounds(newPos) || this.board.isObstacle(newPos)) {
            throw new Error("INVALID_START_POSITION");
        }
        this.position = newPos;
        this.direction = direction;
    }
    rotate(newDirection) {
        this.direction = newDirection;
    }
    move(steps) {
        let { x, y } = this.position;
        for (let i = 0; i < steps; i++) {
            let nextX = x;
            let nextY = y;
            if (this.direction === "NORTH")
                nextY++;
            else if (this.direction === "SOUTH")
                nextY--;
            else if (this.direction === "EAST")
                nextX++;
            else if (this.direction === "WEST")
                nextX--;
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
exports.Knight = Knight;
