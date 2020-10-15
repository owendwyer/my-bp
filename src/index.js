import PIXI from 'pixi.js';
import opdPreloader from 'opdPreloader';
import Preloader from './preloader';
import Controller from './controller';

//when have this sorted, make a template and upload as new my-bp

class Main {
	preload() {
		this.preloader = new Preloader(this.preloadComplete.bind(this));
		this.preloader.startLoad();
	}

	preloadComplete(res) {
		if (res === null) {
			opdPreloader.loadFailed();
		} else {
			opdPreloader.clearAll();
			this.init(res);
		}
	}

	init(res) {
		this.controller = new Controller();
		this.controller.init(res);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	//may need other checks here
	if (PIXI.utils.isWebGLSupported()) {
		let main = new Main();
		main.preload();
	} else {
		opdPreloader.browserNotSupported();
	}
});
