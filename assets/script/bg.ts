import { _decorator, Component, Node } from "cc";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bg
 * DateTime = Thu Oct 28 2021 00:26:33 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = bg.ts
 * FileBasenameNoExtension = bg
 * URL = db://assets/script/bg.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Bg")
export class Bg extends Component {
  @property
  speed: number = 90;

  @property([Node])
  private bgNode: Node[] = [];

  start() {}

  update(deltaTime: number) {
    for (let i = 0; i < this.bgNode.length; i++) {
      const bgNode = this.bgNode[i];
      bgNode.setPosition(
        bgNode.position.subtract3f(0, this.speed * deltaTime, 0)
      );
      if (bgNode.position.y < -(750 + 667)) {
        bgNode.setPosition(bgNode.position.add3f(0, 750 * 3, 0));
      }
    }
  }

  bgMove() {}
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
