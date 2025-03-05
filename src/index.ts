import * as dotenv from "dotenv";
dotenv.config();

import { ApiService } from "./apiService";
import { Board } from "./board";
import { Knight } from "./knight";
import { CommandProcessor } from "./commandProcessor";

const BOARD_API = process.env.BOARD_API || "https://storage.googleapis.com/jobrapido-backend-test/board.json";
const COMMANDS_API = process.env.COMMANDS_API || "https://storage.googleapis.com/jobrapido-backend-test/commands.json";

async function main() {
  try {
    const boardData = await ApiService.fetchBoard(BOARD_API);
    const commandsData = await ApiService.fetchCommands(COMMANDS_API);

    const board = new Board(boardData.width, boardData.height, boardData.obstacles);
    const knight = new Knight(board);
    const processor = new CommandProcessor(knight, commandsData.commands);

    const result = processor.executeCommands();
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("Error:", error);
  }
}

main();
