"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandProcessor = void 0;
class CommandProcessor {
    constructor(knight, commands) {
        this.knight = knight;
        this.commands = commands;
    }
    executeCommands() {
        const executedCommands = [];
        try {
            for (const command of this.commands) {
                executedCommands.push(command);
                const parts = command.split(" ");
                const action = parts[0];
                if (action === "START") {
                    // Expected format: START X,Y,DIR
                    const [xStr, yStr, dir] = parts[1].split(",");
                    const x = parseInt(xStr, 10);
                    const y = parseInt(yStr, 10);
                    this.knight.start(x, y, dir);
                }
                else if (action === "ROTATE") {
                    // Expected format: ROTATE DIR
                    this.knight.rotate(parts[1]);
                }
                else if (action === "MOVE") {
                    // Expected format: MOVE N
                    const steps = parseInt(parts[1], 10);
                    this.knight.move(steps);
                }
            }
            // If all commands execute without error, return SUCCESS with final position.
            return {
                position: {
                    x: this.knight.position.x,
                    y: this.knight.position.y,
                    direction: this.knight.direction
                },
                status: "SUCCESS",
                commands: executedCommands
            };
        }
        catch (error) {
            // If an error occurs, return appropriate status.
            if (error.message === "INVALID_START_POSITION") {
                return { status: "INVALID_START_POSITION", commands: executedCommands };
            }
            else if (error.message === "OUT_OF_THE_BOARD") {
                return { status: "OUT_OF_THE_BOARD", commands: executedCommands };
            }
            else {
                return { status: "GENERIC_ERROR", commands: executedCommands };
            }
        }
    }
}
exports.CommandProcessor = CommandProcessor;
