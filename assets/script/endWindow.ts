import { _decorator, Component, Node, Label } from "cc";
import { GameControl } from "./const";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = EndWindow
 * DateTime = Sat Oct 30 2021 21:45:58 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = endWindow.ts
 * FileBasenameNoExtension = endWindow
 * URL = db://assets/script/endWindow.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("EndWindow")
export class EndWindow extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @property(Node)
  score: Node;

  onEnable() {
    // [3]
    this.score.getComponent(Label).string = `得分：${GameControl.score}`;
  }

  onButtonClick() {
    this.node.removeFromParent();
    GameControl.restart();
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
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
