// Interfaces
import type { MineBlock } from "@/types/Minesweeper";

const DIRECTIONS = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
] as const;

interface GameState {
  board: MineBlock[][];
  mineGenerated: boolean;
  gameState: "playing" | "lost" | "won";
}

export class GamePlay {
  state = ref<GameState>({
    board: [],
    mineGenerated: false,
    gameState: "playing",
  });

  constructor(
    public width: number,
    public height: number,
    public mines: number
  ) {
    this.reset();
  }

  get board() {
    return this.state.value?.board;
  }

  get blocks() {
    return this.flatten(this.state.value.board);
  }

  reset() {
    this.state.value = {
      mineGenerated: false,
      gameState: "playing",
      board: Array.from({ length: this.height }, (_, y) => {
        return Array.from({ length: this.width }, (_, x) => {
          return {
            x,
            y,
            adjacentMines: 0,
            mine: false,
            revealed: false,
            flagged: false,
          };
        });
      }),
    };
  }

  random(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  randomInt(min: number, max: number) {
    return Math.round(this.random(min, max));
  }

  onClick(item: MineBlock) {
    if (this.state.value.gameState !== "playing") return;
    if (!this.state.value?.mineGenerated) {
      this.generateMines(this.board, item);
      this.state.value.mineGenerated = true;
    }

    item.revealed = true;
    if (item.mine) {
      this.state.value.gameState = "lost";
      this.showAllMines();
      return;
    } else {
      this.expendZero(item);
    }
  }

  showAllMines() {
    this.flatten(this.board).forEach((block) => {
      if (block.mine) block.revealed = true;
    });
  }

  onRightClick(block: MineBlock) {
    if (this.state.value?.gameState !== "playing") return;
    if (block.revealed) return;
    block.flagged = !block.flagged;
  }

  generateMines(state: MineBlock[][], initial: MineBlock) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1);
      const y = this.randomInt(0, this.height - 1);
      const block = state[y][x];
      if (Math.abs(initial.x - block.x) <= 1) {
        return false;
      }
      if (Math.abs(initial.y - block.y) <= 1) {
        return false;
      }
      if (block.mine) {
        return false;
      }
      block.mine = true;
      return true;
    };
    Array.from({ length: this.mines }, () => null).forEach(() => {
      let placed = false;
      while (!placed) {
        placed = placeRandom();
      }
    });
    this.updateNumbers();
  }

  updateNumbers() {
    for (const row of this.state.value?.board || []) {
      for (const item of row) {
        if (item.mine) continue;
        this.getSibilings(item).forEach((sibiling) => {
          if (sibiling.mine) item.adjacentMines++;
        });
      }
    }
  }

  expendZero(block: MineBlock) {
    if (block.adjacentMines > 0) return;
    this.getSibilings(block).forEach((sibiling) => {
      if (sibiling.flagged || sibiling.revealed) return;
      sibiling.revealed = true;
      this.expendZero(sibiling);
    });
  }

  getSibilings(block: MineBlock) {
    const sibilings = [] as MineBlock[];
    for (const [dx, dy] of DIRECTIONS) {
      const x = block.x + dx;
      const y = block.y + dy;
      if (x < 0 || x >= this.width || y < 0 || y >= this.height) continue;
      sibilings.push(this.board[y][x]);
    }
    return sibilings;
  }

  // 数组扁平化
  flatten<T>(arr: T[][]): T[] {
    return arr.reduce((flat, toFlatten) => flat.concat(toFlatten), []);
  }

  checkGameState() {
    if (!this.state.value.mineGenerated) return;
    const blocks = this.flatten(this.board);

    if (blocks.every((block) => block.revealed || block.flagged)) {
      if (blocks.some((block) => block.flagged && !block.mine)) {
        this.state.value.gameState = "won";
        this.showAllMines();
      } else {
        this.state.value.gameState = "lost";
      }
    }
  }
}
