# Project Name

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/username/repo/blob/main/LICENSE)

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

## License

[MIT](https://choosealicense.com/licenses/mit/)
