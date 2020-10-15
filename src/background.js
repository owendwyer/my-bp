import PIXI from 'pixi.js';

//think about making this a separate canvas
//or maybe do smg so not redrawn each time

class Background extends PIXI.Container {
	constructor(res, orientation) {
		super();
		this.orientation = orientation;
		this.interactiveChildren = false;
		this.interactive = false;
		this.border = new PIXI.Graphics();
		this.back = new PIXI.Sprite(res['back.png']);
		this.addChild(this.back, this.border);
		this.setupDisplay();
	}

	setupDisplay() {
		this.border.clear();
		this.border.lineStyle(16, 0xffffff, 1);
		if (this.orientation === 0) {
			this.border.drawRoundedRect(-8, -8, 814, 564, 48);
			this.border.lineStyle(1, 0x777777, 1);
			this.border.drawRoundedRect(1, 1, 798, 548, 36);
			this.back.scale.set(1, 1);
			this.back.position.set(0, 0);
		} else {
			this.border.drawRoundedRect(-8, -8, 564, 814, 48);
			this.border.lineStyle(1, 0x777777, 1);
			this.border.drawRoundedRect(1, 1, 548, 798, 36);
			this.back.scale.set(8 / 5.5, 8 / 5.5);
			this.back.position.set(-200, 0);
		}
	}

	orientationChange(orientation) {
		this.orientation = orientation;
		this.setupDisplay();
	}
}

export default Background;
