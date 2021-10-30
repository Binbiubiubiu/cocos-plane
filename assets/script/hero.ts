import {
  _decorator,
  Component,
  Node,
  EventTouch,
  UITransform,
  Vec3,
  Prefab,
  instantiate,
  BoxCollider2D,
  Contact2DType,
  director,
  AudioClip,
  AudioSourceComponent,
} from "cc";
import { bulletPool, GameControl } from "./const";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Hero
 * DateTime = Sat Oct 30 2021 11:59:30 GMT+0800 (中国标准时间)
 * Author = Simon-bin
 * FileBasename = hero.ts
 * FileBasenameNoExtension = hero
 * URL = db://assets/script/hero.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

@ccclass("Hero")
export class Hero extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  @property(Prefab)
  bulletPrefab: Prefab;

  @property(Prefab)
  endWindowPrefab: Prefab;

  @property(Node)
  bulletPoolNode: Node;

  @property(Node)
  endWindow: Node;

  @property
  shutTime: number = 0.5;

  private locked: boolean = false;
  private localOffset: Vec3;

  onLoad() {}

  start() {
    const collider = this.getComponent(BoxCollider2D);
    collider.on(Contact2DType.BEGIN_CONTACT, this.onBeinContact, this);
  }

  onBeinContact() {
    GameControl.end();
    this.node.parent.addChild(instantiate(this.endWindowPrefab));
  }

  onEnable() {
    // [3]
    this.node.on(Node.EventType.TOUCH_START, this.startDrag, this, true);
    this.node.on(Node.EventType.TOUCH_MOVE, this.onDragMove, this, true);
    this.node.on(Node.EventType.TOUCH_END, this.endDrag, this, true);
    this.node.on(Node.EventType.TOUCH_CANCEL, this.endDrag, this, true);
    this.schedule(this.authoShut, this.shutTime);
  }

  onDisable() {
    this.node.off(Node.EventType.TOUCH_START, this.startDrag, this, true);
    this.node.off(Node.EventType.TOUCH_MOVE, this.onDragMove, this, true);
    this.node.off(Node.EventType.TOUCH_END, this.endDrag, this, true);
    this.node.off(Node.EventType.TOUCH_CANCEL, this.endDrag, this, true);
    this.unschedule(this.authoShut);
  }

  // update (deltaTime: number) {
  //     // [4]
  // }

  onDragMove(e: EventTouch) {
    if (!this.locked) return;
    const { x, y } = e.getLocation();
    const location = this.convertToWorldPosition(x, y);
    this.node.setPosition(location);
  }

  startDrag(e: EventTouch) {
    const { x, y } = e.getLocation();
    const position = new Vec3(x, y, 0);
    this.localOffset = this.node
      .getComponent(UITransform)
      .convertToNodeSpaceAR(position);
    this.locked = true;
  }

  endDrag() {
    this.locked = false;
  }

  convertToWorldPosition(x: number, y: number) {
    const position = new Vec3(x, y, 0);
    const result = this.node.parent
      .getComponent(UITransform)
      .convertToNodeSpaceAR(position)
      .subtract(this.localOffset);
    return result;
  }

  generateBullet() {
    let b = bulletPool.get();
    if (!b) {
      b = instantiate(this.bulletPrefab);
    }
    b.setPosition(this.node.position);
    return b;
  }

  authoShut() {
    const bullet = this.generateBullet();
    this.getComponent(AudioSourceComponent).play();
    this.bulletPoolNode.insertChild(bullet, 0);
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
