import {
  _decorator,
  Component,
  Animation,
  Vec3,
  BoxCollider2D,
  Contact2DType,
  PhysicsSystem2D,
  animation,
  AnimationClip,
  randomRange,
  AudioClip,
  AudioSourceComponent,
} from "cc";
const { ccclass, property } = _decorator;
import { planetPool } from "./const";

/**
 * Predefined variables
 * Name = Enemy
 * DateTime = Sat Oct 30 2021 18:06:24 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = enemy.ts
 * FileBasenameNoExtension = enemy
 * URL = db://assets/script/enemy.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Enemy")
export class Enemy extends Component {
  // [1]
  // dummy = '';

  @property
  speed: number = 200;

  private _animation: Animation;
  private _audio: AudioSourceComponent;
  private hasDied = false;

  start() {
    this._animation = this.getComponent(Animation);
    this._audio = this.getComponent(AudioSourceComponent);
    this.reset();
    this._animation.on(
      Animation.EventType.FINISHED,
      this._removeFromParent,
      this
    );
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  update(deltaTime: number) {
    this.node.translate(new Vec3(0, -this.speed * deltaTime, 0));
    if (this.node.position.y < -700) {
      this._removeFromParent();
    }
  }

  reset() {
    this.hasDied = false;
    this._animation && this._animation.play("idle");
    const position = new Vec3(randomRange(-300, 300), 700, 0);
    this.node.setPosition(position);
  }

  onBeinContact() {
    if (this.hasDied) return;
    this.hasDied = true;
    this._audio.play();
    this._animation.play("bom");
  }

  _removeFromParent() {
    this.node.removeFromParent();
    planetPool.put(this.node);
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
