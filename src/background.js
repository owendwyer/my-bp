import PIXI from 'pixi.js';

class Background extends PIXI.Container {
	constructor(res, displayVars) {
		super();
		this.interactiveChildren = false;
		this.interactive = false;
		this.border = new PIXI.Graphics();
		this.back = new PIXI.Sprite(res['back.png']);
		this.addChild(this.back, this.border);
		this.setupDisplay(displayVars);
	}

	setupDisplay(displayVars) {
		this.border.clear();
		this.border.lineStyle(16, 0xffffff, 1);
		if (displayVars.orient === 0) {
			this.border.drawRoundedRect(-8, -8, 816, 566, 48);
			this.border.lineStyle(4, 0xdddddd, 1);
			this.border.drawRoundedRect(2, 2, 796, 546, 34);
			this.border.lineStyle(1, 0xaaaaaa, 1);
			this.border.drawRoundedRect(1, 1, 798, 548, 36);
			this.border.lineStyle(1, 0xbbbbbb, 1);
			this.border.drawRoundedRect(4, 4, 792, 542, 32);
			this.back.scale.set(1, 1);
			this.back.position.set(0, 0);
		} else {
			this.border.drawRoundedRect(-8, -8, 566, 816, 48);
			this.border.lineStyle(4, 0xdddddd, 1);
			this.border.drawRoundedRect(2, 2, 546, 796, 34);
			this.border.lineStyle(1, 0xaaaaaa, 1);
			this.border.drawRoundedRect(1, 1, 548, 798, 36);
			this.border.lineStyle(1, 0xbbbbbb, 1);
			this.border.drawRoundedRect(4, 4, 542, 792, 32);

			this.back.scale.set(8 / 5.5, 8 / 5.5);
			this.back.position.set(-20, 0);
		}
	}

	displayChange(displayVars) {
		this.setupDisplay(displayVars);
	}
}

export default Background;
