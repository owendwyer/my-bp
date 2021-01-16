import PIXI from 'pixi.js';
import Background from './background';

class View extends PIXI.Container {
	init(res, displayVars) {
		this.scale.set(displayVars.scale);
		this.background = new Background(res, displayVars);
		this.addChild(this.background);
		this.setupDisplay(displayVars);
		this.showFirstView();
	}

	setupDisplay(displayVars) {
		// if (displayVars.orient === 0) {
		// } else {
		// }
	}

	displayChange(displayVars) {
		this.scale.set(displayVars.scale);
		if (displayVars.orient !== null) {
			this.setupDisplay(displayVars);
			this.background.displayChange(displayVars);
		}
	}

	fontsLoaded() {
	}

	/////////////////////////////////////////////////////////////////////////////
	//views
	showFirstView() {
	}
}

export default View;
