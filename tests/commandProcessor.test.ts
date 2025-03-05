import { Board } from "../src/board";
import { Knight } from "../src/knight";
import { CommandProcessor } from "../src/commandProcessor";

describe("Command Processor", () => {
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
  let knight = new Knight(board);
  let processor: CommandProcessor;

  test("Should execute sample commands successfully", () => {
    const commands = [
      "START 0,0,NORTH",
      "MOVE 4",
      "ROTATE EAST",
      "MOVE 4",
      "ROTATE SOUTH",
      "MOVE 4"
    ];
    processor = new CommandProcessor(knight, commands);
    const result = processor.executeCommands();
    expect(result).toEqual({
      position: { x: 4, y: 0, direction: "SOUTH" },
      status: "SUCCESS",
      commands: commands
    });
  });

  test("Should return INVALID_START_POSITION if starting invalid", () => {
    const commands = ["START 2,1,EAST"];
    processor = new CommandProcessor(knight, commands);
    const result = processor.executeCommands();
    expect(result.status).toBe("INVALID_START_POSITION");
    expect(result.position).toBeUndefined();
  });

  test("Should return OUT_OF_THE_BOARD if move goes off board", () => {
    const commands = ["START 4,4,NORTH", "MOVE 1"];
    processor = new CommandProcessor(knight, commands);
    const result = processor.executeCommands();
    expect(result.status).toBe("OUT_OF_THE_BOARD");
    expect(result.position).toBeUndefined();
  });

  test("Should stop at obstacle and continue executing subsequent commands", () => {
    const commands = ["START 0,0,EAST", "MOVE 3", "ROTATE NORTH", "MOVE 2"];
    processor = new CommandProcessor(knight, commands);
    const result = processor.executeCommands();
    expect(result).toEqual({
      position: { x: 1, y: 2, direction: "NORTH" },
      status: "SUCCESS",
      commands: commands
    });
  });
});
