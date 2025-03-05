# Knight Board

This project models a knight in shiny armor moving on a board with obstacles, following a series of commands provided by his king. The program validates the starting position, executes movement commands (including rotations and step-by-step movement), stops before obstacles, and reports the final position and status.

The project is implemented in TypeScript and runs in a Node.js environment. It is containerized using Docker.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Requirements](#requirements)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [Docker Instructions](#docker-instructions)
- [Environment Variables](#environment-variables)
- [API Details](#api-details)
- [Expected Output](#expected-output)
- [License](#license)

## Features

- **Board Modeling:** The board is defined by its dimensions and obstacles. The starting position must not overlap an obstacle or be out of bounds.
- **Knight Movement:** Supports the commands:
  - `START X,Y,DIR` (starting position and direction)
  - `ROTATE DIR` (changes the knight's direction without moving)
  - `MOVE N` (moves the knight forward N steps, stopping if an obstacle is encountered or if it goes out of bounds)
- **Error Handling:** Returns status codes:
  - `SUCCESS` if all commands execute correctly.
  - `INVALID_START_POSITION` if the starting position is invalid.
  - `OUT_OF_THE_BOARD` if a move would cause the knight to fall off the board.
  - `GENERIC_ERROR` for all other errors.
- **Dockerized:** Easily build and run the application in a Docker container.
- **Test Coverage:** Unit tests for knight movement and command processing are included.

## Project Structure

knight-board/ 
├── src/ │ 
├── index.ts 
# Application entry point 
│ ├── apiService.ts 
# Module to fetch board and command data from APIs 
│ ├── board.ts 
# Board class: defines board dimensions and obstacle checks 
│ ├── knight.ts 
# Knight class: implements starting, rotating, and step-by-step moving 
│ └── commandProcessor.ts 
# Processes and executes commands, handles error conditions 
├── tests/ 
│ ├── knight.test.ts 
# Unit tests for knight movement logic 
│ └── commandProcessor.test.ts # Unit tests for command processing and overall execution 
├── package.json 
# Project metadata, dependencies, and scripts 
├── tsconfig.json 
# TypeScript compiler configuration 
├── Dockerfile
# Dockerfile to build the container image 
└── README.md # Project documentation (this file)


## Features

- **Board Modeling:** The board is defined by its width, height, and obstacles (positions where the knight cannot step). The knight’s starting position is validated against these.
- **Knight Movement:** Supports commands:
  - `START X,Y,DIR`: Set starting position and initial direction (NORTH, SOUTH, EAST, or WEST)
  - `ROTATE DIR`: Rotate the knight to face the specified direction (without moving)
  - `MOVE N`: Move the knight forward N steps; if an obstacle is encountered, the knight stops before it; if a move would take the knight off the board, execution terminates with an error status.
- **Error Handling:**  
  - Returns `SUCCESS` when all commands execute without error.
  - Returns `INVALID_START_POSITION` if the starting position is not valid.
  - Returns `OUT_OF_THE_BOARD` if a move causes the knight to fall off the board.
  - Returns `GENERIC_ERROR` for other unexpected issues.
- **Dockerized:** Easily build and run the application in a Docker container.
- **Unit Testing:** Comprehensive tests ensure the correct behavior of knight movement and command processing.

## Requirements

- **Node.js**
- **npm**
- **Docker**

## Installation & Setup

1. **install the libraries**
npm install

2. **build the project**
npm run build

3. **run the application**
npm run start

## finish
**running tests**:
npm test

### Docker Instructions
1. **Build the Docker Image**
docker build -t knight_board:latest .

2. **Run the docker container**
docker run -e BOARD_API=https://storage.googleapis.com/jobrapido-backend-test/board.json \
           -e COMMANDS_API=https://storage.googleapis.com/jobrapido-backend-test/commands.json \
           knight_board:latest


### Environment Variables
**BOARD_API**
URL to fetch the board definition (dimensions and obstacles).
BOARD_API = "https://storage.googleapis.com/jobrapido-backend-test/board.json";

**COMMANDS_API**
URL to fetch the list of commands for the knight.
COMMANDS_API = "https://storage.googleapis.com/jobrapido-backend-test/commands.json";


### API Details
**Board API**
Returns a JSON object with:

width: Number (dimension along the x-axis)
height: Number (dimension along the y-axis)
obstacles: Array of objects, each with x and y coordinates representing obstacle positions
Example:

json
Copia
{
  "width": 10,
  "height": 10,
  "obstacles": [
    { "x": 1, "y": 1 },
    { "x": 1, "y": 2 }
  ]
}

**Commands API**
Returns a JSON object with:

commands: An array of strings (commands). Valid commands are:
START X,Y,DIR
ROTATE DIR
MOVE N
Example:

json
Copia
{
  "commands": [
    "START 1,0,NORTH",
    "ROTATE SOUTH",
    "MOVE 3",
    "ROTATE EAST",
    "MOVE 5"
  ]
}
Expected Output
After processing all commands, the application outputs a JSON object:

On Success:

json
Copia
{
  "position": {
    "x": 1,
    "y": 1,
    "direction": "NORTH"
  },
  "status": "SUCCESS"
}
On Error:
The output will include a status of INVALID_START_POSITION, OUT_OF_THE_BOARD, or GENERIC_ERROR and will omit position information.