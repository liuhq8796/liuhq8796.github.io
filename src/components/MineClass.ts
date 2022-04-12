// Interfaces
import type { BlockState } from "@/types/Minesweeper";

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
  board: BlockState[][];
  mineGenerated: boolean;
  gameState: "playing" | "lost" | "won";
}

export class GamePlay {
  state = ref<GameState>({
    board: [],
    mineGenerated: false,
    gameState: "playing",
  });

  constructor(public width: number, public height: number) {
    this.reset();
  }

  get board() {
    return this.state.value?.board;
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

  onClick(item: BlockState) {
    if (this.state.value.gameState !== "playing") return;
    if (!this.state.value?.mineGenerated) {
      this.generateMines(item);
      this.updateNumbers();
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

  onRightClick(block: BlockState) {
    if (this.state.value?.gameState !== "playing") return;
    if (block.revealed) return;
    block.flagged = !block.flagged;
  }

  generateMines(initial: BlockState) {
    for (const row of this.board) {
      for (const block of row) {
        if (
          Math.abs(initial.x - block.x) <= 1 &&
          Math.abs(initial.y - block.y) <= 1
        )
          continue;
        block.mine = Math.random() < 0.1;
      }
    }
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

  expendZero(block: BlockState) {
    if (block.adjacentMines > 0) return;
    this.getSibilings(block).forEach((sibiling) => {
      if (sibiling.flagged || sibiling.revealed) return;
      sibiling.revealed = true;
      this.expendZero(sibiling);
    });
  }

  getSibilings(block: BlockState) {
    const sibilings = [] as BlockState[];
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
