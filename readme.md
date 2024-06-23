# three-spaceship-controls

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ukth/three-spaceship-controls)
[![npm version](https://badge.fury.io/js/three-spaceship-controls.svg)](https://www.npmjs.com/package/three-spaceship-controls)

**This project is in beta version.**

A threejs spaceship-style control with keyboard.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the project.

```bash
npm install three-spaceship-controls
```

## Usage

```javascript
import { SpaceShipControls } from "three-spaceship-controls";

const controls = new SpaceShipControls(camera, canvas, ship);

const clock = new THREE.Clock();
let oldElapsedTime = 0;

const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;

  oldElapsedTime = elapsedTime;
  controls.update(deltaTime);

  window.requestAnimationFrame(animate);
};
```

Control the spaceship with W,A,D,Q,E

#### Props

| Prop name                    | Description                                                                          | Default value                               | Example values |
| ---------------------------- | ------------------------------------------------------------------------------------ | ------------------------------------------- | -------------- |
| enabled                      | Enables or disables the controls.                                                    | true                                        |
| acceleration                 | The rate at which the spaceship gains speed.                                         | 0.6                                         |
| minSpeed                     | The minimum speed of the spaceship.                                                  | 0.5                                         |
| maxSpeed                     | The maximum speed of the spaceship.                                                  | 10                                          |
| deceleration                 | The rate at which the spaceship loses speed when not accelerating.                   | 2.5                                         |
| rotationAcceleration         | The rate at which the spaceship starts to rotate.                                    | 0.5                                         |
| maxRotationSpeed             | The maximum speed at which the spaceship can rotate.                                 | 0.5                                         |
| rotationDeceleration         | The rate at which the spaceship stops rotating when not being controlled.            | 0.25 \* 10                                  |
| rotationTilt                 | The tilt effect of the spaceship during rotation.                                    | 0.8                                         |
| cameraHorizontalFollowing    | The extent to which the camera follows the spaceship horizontally.                   | 0.8                                         |
| cameraAngle                  | The angle at which the camera is positioned relative to the spaceship.               | Math.PI / 7                                 |
| cameraDistance               | The distance of the camera from the spaceship.                                       | 2                                           |
| cameraFollowingWeight        | The weight that determines the smoothness of the camera following the spaceship.     | 0.05                                        |
| maxCameraFollowing           | The maximum limit for camera following.                                              | 1                                           |
| cameraHorizontalOffset       | The horizontal offset of the camera from the spaceship.                              | 0.4                                         |
| cameraVerticalOffset         | The vertical offset of the camera from the spaceship.                                | 0.4                                         |
| maxVerticalAngle             | The maximum vertical angle the spaceship can achieve.                                | `5/12 * Math.PI` (approximately 70 degrees) |
| verticalRotationAcceleration | The rate at which the spaceship starts to rotate vertically.                         | 0.5                                         |
| verticalRotationDeceleration | The rate at which the spaceship stops rotating vertically when not being controlled. | 0.5 \* 10                                   |
| cameraVerticalFollowing      | The extent to which the camera follows the spaceship vertically.                     | 0.25                                        |

#### Methods

#### `update(delta)`

Updates the position of the camera and spaceship.

**Parameters:**

- `delta` (number): The time elapsed in seconds to update the positions.

#### `setKeyBindings(keyBindings)`

Sets the key bindings for the controls.

**Parameters:**

- `keyBindings` (object): The key bindings for the controls.

**Example usage(default value):**

```javascript
controls.setKeyBindings({
  accelerate: "KeyW",
  rotateLeft: "KeyA",
  rotateRight: "KeyD",
  rotateUp: "KeyQ",
  rotateDown: "KeyE",
});
```

## Support

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://buymeacoffee.com/ukth)

## License

[MIT](https://choosealicense.com/licenses/mit/)

```

```
