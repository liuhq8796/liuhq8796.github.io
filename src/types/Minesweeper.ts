export interface MineBlock {
  x: number;
  y: number;
  adjacentMines: number;
  revealed: boolean;
  mine: boolean;
  flagged: boolean;
}
