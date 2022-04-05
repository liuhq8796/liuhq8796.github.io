// Interfaces
import type { BlockState } from "@/types/Minesweeper";
import { ref } from "vue";

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

export class GamePlqy {
  state = ref<BlockState[][]>([]);
  mineGenerated = false;

  constructor(public width: number, public height: number) {
    this.reset();
  }

  reset() {
    this.mineGenerated = false;
    this.state.value = Array.from({ length: this.width }, (_, y) =>
      Array.from(
        { length: this.width },
        (_, x): BlockState => ({
          x,
          y,
          adjacentMines: 0,
          revealed: false,
        })
      )
    );
  }

  onClick(item: BlockState) {
    if (!this.mineGenerated) {
      this.generateMines(item);
      this.updateNumbers();
      this.mineGenerated = true;
    }

    item.revealed = true;
    if (item.mine) {
      alert("BOOM!");
    } else {
      this.expendZero(item);
    }
  }

  onRightClick(block: BlockState) {
    block.flagged = !block.flagged;
  }

  generateMines(initial: BlockState) {
    for (const row of this.state.value) {
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
    for (const row of this.state.value) {
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
      sibilings.push(this.state.value[y][x]);
    }
    return sibilings;
  }

  flat(arr: BlockState[][]) {
    return arr.reduce((acc, val) => acc.concat(val), []);
  }

  checkGameState() {
    const blocks = this.flat(this.state.value);

    if (blocks.every((block) => block.revealed || block.flagged)) {
      if (blocks.every((block) => block.flagged && block.mine)) {
        alert("You cheat!");
      } else {
        alert("You win!");
      }
    }
  }
}
