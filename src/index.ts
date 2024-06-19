import { Camera, EventDispatcher, Object3D, Vector3 } from "three";

// EventDispatcher
class SpaceShipControls {
  camera: Camera;
  domElement: HTMLElement;
  enabled: boolean;
  target: Object3D;

  private speed: number = 0;
  acceleration: number;
  deceleration: number;
  maxSpeed: number;
  minSpeed: number;

  private rotationSpeed: number = 0;
  rotationAcceleration: number;
  rotationDeceleration: number;
  maxRotationSpeed: number;
  rotationTilt: number;

  private verticalSpeed: number = 0;
  verticalRotationAcceleration: number;
  verticalRotationDeceleration: number;
  maxVerticalAngle: number;

  cameraAngle: number;
  cameraDistance: number;
  cameraFollowing: number;
  maxCameraFollowing: number;
  cameraFollowingWeight: number;
  cameraVerticalFollowing: number;
  cameraHorizontalFollowing: number;
  cameraVerticalOffset: number;
  cameraHorizontalOffset: number;

  private keyBindings = {
    accelerate: "KeyW",
    rotateLeft: "KeyA",
    rotateRight: "KeyD",
    rotateUp: "KeyQ",
    rotateDown: "KeyE",
  };
  private keys = {
    accelerate: false,
    rotateLeft: false,
    rotateRight: false,
    rotateUp: false,
    rotateDown: false,
  };
  private headingLeft: boolean = false;
  private headingRight: boolean = false;

  constructor(camera: Camera, domElement: HTMLElement, target: Object3D) {
    // super();

    this.camera = camera;
    this.domElement = domElement;
    this.target = target;

    // API

    // Set to false to disable this control
    this.enabled = true;

    // this.movementSpeed = 1.0;
    // this.rollSpeed = 0.005;

    // this.dragToLook = false;
    // this.autoForward = false;

    this.acceleration = 0.6;
    this.minSpeed = 0.5;
    this.maxSpeed = 10;
    this.deceleration = 0.25 * 10;

    this.rotationAcceleration = 0.5;
    this.maxRotationSpeed = 0.5;
    this.rotationDeceleration = 0.25 * 10;
    this.rotationTilt = 0.8;
    this.cameraHorizontalFollowing = 0.8;

    this.cameraAngle = Math.PI / 7;
    this.cameraDistance = 2;
    this.cameraFollowing = 0;
    this.cameraFollowingWeight = 0.05;
    this.maxCameraFollowing = 1;

    this.cameraHorizontalOffset = 0.4;
    this.cameraVerticalOffset = 0.4;

    this.maxVerticalAngle = Math.PI / 2 - Math.PI / 12; // 70 degrees
    this.verticalRotationAcceleration = 0.5;
    this.verticalRotationDeceleration = 0.5 * 10;
    this.cameraVerticalFollowing = 0.25;

    const scope = this;

    // const EPS = 0.000001;

    // const lastQuaternion = new Quaternion();
    // const lastPosition = new Vector3();

    // this.tmpQuaternion = new Quaternion();

    // this.status = 0;

    // this.moveState = {
    //   up: 0,
    //   down: 0,
    //   left: 0,
    //   right: 0,
    //   forward: 0,
    //   back: 0,
    //   pitchUp: 0,
    //   pitchDown: 0,
    //   yawLeft: 0,
    //   yawRight: 0,
    //   rollLeft: 0,
    //   rollRight: 0,
    // };
    // this.moveVector = new Vector3(0, 0, 0);
    // this.rotationVector = new Vector3(0, 0, 0);

    window.addEventListener("keydown", this.keydown);
    window.addEventListener("keyup", this.keyup);
  }

  keydown = (event: KeyboardEvent) => {
    if (event.altKey || this.enabled === false) {
      return;
    }

    switch (event.code) {
      case this.keyBindings.accelerate:
        this.keys.accelerate = true;
        break;
      case this.keyBindings.rotateLeft:
        this.keys.rotateLeft = true;
        this.headingLeft = true;
        this.headingRight = false;
        break;
      case this.keyBindings.rotateRight:
        this.keys.rotateRight = true;
        this.headingRight = true;
        this.headingLeft = false;
        break;
      case this.keyBindings.rotateUp:
        this.keys.rotateUp = true;
        break;
      case this.keyBindings.rotateDown:
        this.keys.rotateDown = true;
        break;
    }

    // this.updateMovementVector();
    // this.updateRotationVector();
  };

  keyup = (event: KeyboardEvent) => {
    if (this.enabled === false) return;

    switch (event.code) {
      case this.keyBindings.accelerate:
        this.keys.accelerate = false;
        break;
      case this.keyBindings.rotateLeft:
        this.keys.rotateLeft = false;
        this.headingLeft = false;
        break;
      case this.keyBindings.rotateRight:
        this.keys.rotateRight = false;
        this.headingRight = false;
        break;
      case this.keyBindings.rotateUp:
        this.keys.rotateUp = false;
        break;
      case this.keyBindings.rotateDown:
        this.keys.rotateDown = false;
        break;
    }
  };

  updatetarget = (delta: number) => {
    if (this.keys.accelerate) {
      this.cameraFollowing += delta;
      if (this.cameraFollowing > this.maxCameraFollowing) {
        this.cameraFollowing = this.maxCameraFollowing;
      }
      if (this.speed < this.minSpeed) this.speed = this.minSpeed;
      this.speed *= 1 + this.acceleration * delta;
      if (this.speed > this.maxSpeed) this.speed = this.maxSpeed;
    } else {
      this.cameraFollowing -= delta;
      if (this.cameraFollowing < 0) {
        this.cameraFollowing = 0;
      }
      this.speed *= 1 - this.deceleration * delta;
    }

    if (this.headingLeft) {
      this.rotationSpeed += this.rotationAcceleration * delta;

      if (this.rotationSpeed > this.maxRotationSpeed)
        this.rotationSpeed = this.maxRotationSpeed;
    } else if (this.headingRight) {
      this.rotationSpeed -= this.rotationAcceleration * delta;
      if (this.rotationSpeed < -this.maxRotationSpeed)
        this.rotationSpeed = -this.maxRotationSpeed;
    } else {
      this.rotationSpeed *= 1 - this.rotationDeceleration * delta;
    }

    this.target.rotation.y += this.rotationSpeed * delta;

    this.target.rotation.z = -this.rotationSpeed * this.rotationTilt;

    if (
      this.target.rotation.x + this.verticalSpeed * delta >
      this.maxVerticalAngle
    ) {
      this.keys.rotateDown = false;
    } else if (
      this.target.rotation.x + this.verticalSpeed * delta <
      -this.maxVerticalAngle
    ) {
      this.keys.rotateUp = false;
    }

    if (this.keys.rotateUp) {
      this.verticalSpeed -= this.verticalRotationAcceleration * delta;
      if (this.speed < this.minSpeed) this.speed = this.minSpeed;
    } else if (this.keys.rotateDown) {
      this.verticalSpeed += this.verticalRotationAcceleration * delta;
      if (this.speed < this.minSpeed) this.speed = this.minSpeed;
    } else {
      this.verticalSpeed *= 1 - this.verticalRotationDeceleration * delta;
    }

    if (
      this.target.rotation.x + this.verticalSpeed * delta >
      this.maxVerticalAngle
    ) {
      this.target.rotation.x = this.maxVerticalAngle;
    } else if (
      this.target.rotation.x + this.verticalSpeed * delta <
      -this.maxVerticalAngle
    ) {
      this.target.rotation.x = -this.maxVerticalAngle;
    } else {
      this.target.rotation.x += this.verticalSpeed * delta;
    }

    const direction = new Vector3(0, 0, 1);
    direction.applyQuaternion(this.target.quaternion);
    direction.normalize();

    const nextPosition = this.target.position.addScaledVector(
      direction,
      this.speed * delta
    );

    this.target.position.copy(nextPosition);
  };

  updateCamera = () => {
    const angle =
      this.cameraAngle - this.verticalSpeed * this.cameraVerticalFollowing;

    const distance =
      this.cameraDistance +
      this.speed * this.cameraFollowing * this.cameraFollowingWeight;
    const offset = new Vector3(
      0,
      Math.sin(angle) * distance,
      -Math.cos(angle) * distance
    );
    offset.applyQuaternion(this.target.quaternion);
    this.camera.position.copy(this.target.position).add(offset);
    const lookAt = new Vector3(
      -this.rotationSpeed * this.cameraHorizontalFollowing,
      this.cameraVerticalOffset,
      this.cameraHorizontalOffset
    );
    lookAt.applyQuaternion(this.target.quaternion);

    this.camera.lookAt(this.target.position.clone().add(lookAt));
  };

  update = (delta: number) => {
    if (this.enabled === false) return;

    this.updatetarget(delta);
    this.updateCamera();
  };
}

export { SpaceShipControls };
