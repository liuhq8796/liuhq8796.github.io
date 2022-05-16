// Interfaces
import type { MineBlock } from "@/types/Minesweeper";

const DIRECTIONS: [number, number][] = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
  [0, 1],
  [-1, 1],
  [-1, 0],
];

export default class MineClass {
  blocks = ref<MineBlock[][]>([]);
  mineGenerated = ref(false);
  gameState = ref<"playing" | "lost" | "won">("playing");

  constructor(
    public width: number,
    public height: number,
    public mines: number
  ) {
    this.reset();
  }

  reset() {
    this.blocks.value = Array.from({ length: this.height }, (_, y) => {
      return Array.from({ length: this.width }, (_, x) => {
        return {
          x,
          y,
          adjacentMines: 0,
          mine: false,
          revealed: false,
          flagged: false,
          errorFlag: false,
        };
      });
    });
  }

  onClick(block: MineBlock) {
    if (this.gameState.value !== "playing") return;

    if (!this.mineGenerated.value) {
      this.generateMines(block);
      this.mineGenerated.value = true;

      this.updateAdjacentMines();
    }

    if (block.revealed) return;
    block.revealed = true;

    if (block.flagged) block.flagged = false;

    if (block.mine) {
      this.gameState.value = "lost";
      this.showAllMines();
      this.checkErrorFlags();
      nextTick(() => {
        alert("You Lost!");
      });
    } else {
      this.expendZero(block);
    }

    // 如果所有的非地雷方块都被揭开，则游戏胜利
    const hasWon = this.blocks.value.every((row) => {
      return row.every((block) => {
        return block.revealed && !block.mine;
      });
    });
    if (hasWon) {
      this.gameState.value = "won";
      this.showWin();
    }
  }

  showWin() {
    for (const row of this.blocks.value) {
      for (const block of row) {
        if (block.mine) {
          block.flagged = true;
        } else {
          block.revealed = true;
        }
      }
    }
    nextTick(() => {
      alert("You Win!");
    });
  }

  expendZero(block: MineBlock) {
    if (block.adjacentMines === 0) {
      for (const direction of DIRECTIONS) {
        const adjacentBlock = this.getAdjacentBlock(block, direction);
        if (adjacentBlock && !adjacentBlock.revealed) {
          adjacentBlock.revealed = true;
          this.expendZero(adjacentBlock);
        }
      }
    }
  }

  getAdjacentBlock(block: MineBlock, direction: [number, number]) {
    const [x, y] = direction;
    const adjacentX = block.x + x;
    const adjacentY = block.y + y;

    if (adjacentX < 0 || adjacentX >= this.width) return;
    if (adjacentY < 0 || adjacentY >= this.height) return;

    return this.blocks.value[adjacentY][adjacentX];
  }

  showAllMines() {
    for (const row of this.blocks.value) {
      for (const block of row) {
        if (block.mine) block.revealed = true;
      }
    }
  }

  checkErrorFlags() {
    for (const row of this.blocks.value) {
      for (const block of row) {
        if (block.flagged && !block.mine) {
          block.errorFlag = true;
        }
      }
    }
  }

  generateMines(initial: MineBlock) {
    for (let i = 0; i < this.mines; i++) {
      let block: MineBlock | undefined;
      // 如果炸弹在初始化的位置或相邻的位置，则重新生成
      do {
        block = this.getRandomBlock();
      } while (
        block.mine ||
        ((block.x === initial.x - 1 ||
          block.x === initial.x ||
          block.x === initial.x + 1) &&
          (block.y === initial.y - 1 ||
            block.y === initial.y ||
            block.y === initial.y + 1))
      );
      block.mine = true;
    }
  }

  getRandomBlock() {
    const x = Math.floor(Math.random() * this.width);
    const y = Math.floor(Math.random() * this.height);
    return this.blocks.value[y][x];
  }

  updateAdjacentMines() {
    for (const row of this.blocks.value) {
      for (const block of row) {
        if (block.mine) continue;
        block.adjacentMines = this.getAdjacentMines(block);
      }
    }
  }

  getAdjacentMines(block: MineBlock) {
    const { x, y } = block;
    return this.flatten(this.blocks.value).filter(
      (b) =>
        b.mine &&
        (b.x === x - 1 || b.x === x || b.x === x + 1) &&
        (b.y === y - 1 || b.y === y || b.y === y + 1)
    ).length;
  }

  flatten(arr: MineBlock[][]) {
    return arr.reduce((flat, current) => flat.concat(current), []);
  }

  onRightClick(block: MineBlock) {
    if (this.gameState.value !== "playing") return;

    if (block.revealed) return;

    block.flagged = !block.flagged;

    const hasWon = this.blocks.value.every((row) => {
      return row.every((b) => b.mine === b.flagged);
    });
    if (hasWon) {
      this.gameState.value = "won";
      this.showWin();
    }
  }
}
