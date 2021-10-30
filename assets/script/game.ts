import {
  _decorator,
  Component,
  Node,
  instantiate,
  Prefab,
  randomRange,
  Vec3,
} from "cc";
const { ccclass, property } = _decorator;

import { planetPool } from "./const";
import { Enemy } from "./enemy";

/**
 * Predefined variables
 * Name = Game
 * DateTime = Sat Oct 30 2021 18:09:37 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = game.ts
 * FileBasenameNoExtension = game
 * URL = db://assets/script/game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Game")
export class Game extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property(Node)
  planePool: Node;

  @property(Prefab)
  planPrefab: Prefab;

  onLoad() {}

  start() {
    // [3]
    this.schedule(this.doIt, 1);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  doIt() {
    const plane = this.genreteEnemy();
    this.planePool.addChild(plane);
  }

  genreteEnemy() {
    let b = planetPool.get();
    if (b) {
      b.getComponent(Enemy).reset();
    } else {
      b = instantiate(this.planPrefab);
    }

    return b;
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */
