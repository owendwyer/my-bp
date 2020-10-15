import PIXI from 'pixi.js';
import Background from './background';

class View extends PIXI.Container {
	init(res, orientation) {
		this.background = new Background(res, orientation);
		this.addChild(this.background);
	}

	orientationChange(orientation) {
		this.background.orientationChange(orientation);
	}
}

export default View;
