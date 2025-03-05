"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
class Board {
    constructor(width, height, obstacles) {
        this.width = width;
        this.height = height;
        this.obstacles = obstacles;
    }
    isWithinBounds(position) {
        const withinBounds = position.x >= 0 && position.x < this.width &&
            position.y >= 0 && position.y < this.height;
        return withinBounds;
    }
    isObstacle(position) {
        const found = this.obstacles.some(obstacle => Number(obstacle.x) === Number(position.x) &&
            Number(obstacle.y) === Number(position.y));
        if (found) {
        }
        else {
        }
        return found;
    }
}
exports.Board = Board;
