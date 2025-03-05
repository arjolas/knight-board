export interface Position {
    x: number;
    y: number;
  }
  
  export class Board {
    width: number;
    height: number;
    obstacles: Position[];
  
    constructor(width: number, height: number, obstacles: Position[]) {
      this.width = width;
      this.height = height;
      this.obstacles = obstacles;
    }
  
    isWithinBounds(position: Position): boolean {
      const withinBounds =
        position.x >= 0 && position.x < this.width &&
        position.y >= 0 && position.y < this.height;
      return withinBounds;
    }
  
    isObstacle(position: Position): boolean {
      const found = this.obstacles.some(obstacle =>
        Number(obstacle.x) === Number(position.x) &&
        Number(obstacle.y) === Number(position.y)
      );
      if (found) {
      } else {
      }
      return found;
    }
  }
  