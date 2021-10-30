import { director, game, NodePool } from "cc";

export const bulletPool = new NodePool();
export const planetPool = new NodePool();

export class GameControl {
  public static score = 0;

  public static addScore() {
    GameControl.score += 1;
  }

  public static restart() {
    bulletPool.clear();
    planetPool.clear();
    GameControl.score = 0;
    director.resume();
    game.restart();
  }

  public static end() {
    director.pause();
  }
}
