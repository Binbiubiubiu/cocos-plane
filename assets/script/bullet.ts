import {
  _decorator,
  Component,
  BoxCollider2D,
  CollisionEventType,
  Node,
  PhysicsSystem2D,
  Contact2DType,
  Vec3,
} from "cc";
import { bulletPool, GameControl } from "./const";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Bullet
 * DateTime = Sat Oct 30 2021 12:51:09 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = bullet.ts
 * FileBasenameNoExtension = bullet
 * URL = db://assets/script/bullet.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Bullet")
export class Bullet extends Component {
  // [1]
  // dummy = '';

  // [2]
  @property
  speed: number = 800;

  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  onBeinContact() {
    GameControl.addScore();
    this._removeFromParent();
  }

  update(deltaTime: number) {
    // [4]
    this.node.translate(new Vec3(0, this.speed * deltaTime, 0));
    // this.node.setPosition(this.node.position.add3f(0,this.speed * deltaTime,0));
    if (this.node.position.y > 667) {
      this._removeFromParent();
    }
  }

  _removeFromParent() {
    this.node.removeFromParent();
    bulletPool.put(this.node);
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
