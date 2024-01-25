type sizeType = {
  width: number;
  height: number;
};

type positionType = {
  x: number;
  y: number;
};

import cloneDeep from 'lodash.clonedeep';

export class Cell {
  index: number;
  value: string;
  state: 'untouched' | 'flagged' | 'digged';

  constructor(index: number) {
    this.index = index;
    this.value = '';
    this.state = 'untouched';
  }
}

export default class Game {
  private _grid: Cell[][];
  state: 'playing' | 'win' | 'lose' = 'playing';
  time: number = 10 * 60;

  public get grid() {
    return this._grid.flat();
  }

  constructor(gridSize: sizeType, quantityOfBomb: number, time?: number) {
    this.time = time || this.time;
    const bombsPosition: positionType[] = [];
    while (bombsPosition.length < quantityOfBomb) {
      const newBomb = {
        x: Math.floor(Math.random() * gridSize.width),
        y: Math.floor(Math.random() * gridSize.height),
      };
      if (
        bombsPosition.filter(
          (value) => value.x === newBomb.x && value.y === newBomb.y
        ).length === 0
      ) {
        bombsPosition.push(newBomb);
      }
    }

    let grid: Cell[][] = new Array(gridSize.height);
    for (let i = 0; i < grid.length; i++) {
      grid[i] = new Array(gridSize.width);
      for (let j = 0; j < grid[i].length; j++) {
        grid[i][j] = new Cell(i * grid[i].length + j);
      }
    }

    bombsPosition.forEach((bomb) => {
      const cell = grid[bomb.y][bomb.x];
      cell.value = '💣';
    });

    this._grid = grid;

    grid.flat().map((Cell) => {
      Cell.value = this.countBombsAround(Cell);
    });
  }

  getFLatGrid() {
    return this._grid.flat();
  }

  private getCoordinateFromIndex(index: number): positionType {
    return {
      x: index % this._grid[0].length,
      y: Math.floor(index / this._grid[0].length),
    };
  }

  countBombsAround = (Cell: Cell): string => {
    const grid = this._grid;
    const { y, x } = this.getCoordinateFromIndex(Cell.index);
    if (grid[y][x].value === '💣') return '💣';
    let counter = 0;
    if (y > 0) {
      if (x > 0) {
        if (grid[y - 1][x - 1].value === '💣') counter++;
      }
      if (x < grid[0].length - 1) {
        if (grid[y - 1][x + 1].value === '💣') counter++;
      }
      if (grid[y - 1][x].value === '💣') counter++;
    }

    if (x > 0) {
      if (grid[y][x - 1].value === '💣') counter++;
    }
    if (x < grid[0].length - 1) {
      if (grid[y][x + 1].value === '💣') counter++;
    }

    if (y < grid.length - 1) {
      if (x > 0) {
        if (grid[y + 1][x - 1].value === '💣') counter++;
      }
      if (x < grid[0].length - 1) {
        if (grid[y + 1][x + 1].value === '💣') counter++;
      }
      if (grid[y + 1][x].value === '💣') counter++;
    }
    return counter === 0 ? '' : counter.toString();
  };

  onTimerEnd() {
    this.state = 'lose';
    return cloneDeep(this);
  }

  getCellFromIndex = (index: number): Cell => {
    const { x, y } = this.getCoordinateFromIndex(index);
    return this._grid[y][x];
  };

  flagCell = (Cell: Cell): Game => {
    const cellToUpdate = this.getCellFromIndex(Cell.index);
    if (Cell.state === 'untouched') {
      cellToUpdate.state = 'flagged';
    } else if (Cell.state === 'flagged') {
      cellToUpdate.state = 'untouched';
    }
    return cloneDeep(this);
  };

  digCell = (cell: Cell): Game => {
    // Base case: Check if the cell is already processed or out of bounds
    if (cell.state !== 'untouched') {
      return cloneDeep(this);
    }

    const { y, x } = this.getCoordinateFromIndex(cell.index);

    const cellToUdpdate = this.getCellFromIndex(cell.index);
    // Change the state of the current cell
    cellToUdpdate.state = 'digged';
    if (cell.value === '💣') {
      this.state = 'lose';
      return cloneDeep(this);
    }

    // If the cell is empty, recursively dig adjacent cells
    if (cell.value === '') {
      this.digAdjacentCells(x, y);
    }

    if (this.hasWon()) {
      this.state = 'win';
    }

    return cloneDeep(this);
  };

  private hasWon = () => {
    return this.grid.every((cell) => {
      return cell.value === '💣' || cell.state === 'digged';
    });
  };

  public setTimes = (time: number) => {
    this.time = time;
    if (this.time === 0) {
      this.onTimerEnd();
    }
    return cloneDeep(this);
  };

  private digAdjacentCells = (x: number, y: number) => {
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue; // Skip the current cell

        const newX = x + dx;
        const newY = y + dy;

        // Check boundaries
        if (
          newX >= 0 &&
          newX < this._grid[0].length &&
          newY >= 0 &&
          newY < this._grid.length
        ) {
          const adjacentCell = this._grid[newY][newX];
          if (adjacentCell.state === 'untouched') {
            this.digCell(adjacentCell);
          }
        }
      }
    }
  };
}
