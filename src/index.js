import opdPreloader from 'opdPreloader';
import Preloader from './preloader';
import View from './view';
import Display from './display';

class Main {
	preload() {
		this.preloadCompleteBool = false;
		this.displayChange = this.displayChange.bind(this);
		this.setDisplayLock = this.setDisplayLock.bind(this);
		this.setTouchScroll = this.setTouchScroll.bind(this);
		this.preloader = new Preloader(this.preloadComplete.bind(this), this.fontsLoaded.bind(this));
		this.preloader.startLoad();
	}

	preloadComplete(res) {
		if (res === null) {
			opdPreloader.loadFailed();
		} else {
			opdPreloader.clearAll();
			this.init(res);
			if (this.preloader.checkFontsLoaded()) this.view.fontsLoaded();
			this.preloadCompleteBool = true;
		}
	}

	init(res) {
		this.view = new View();
		this.display = new Display(this.view, this.displayChange);
		let displayVars = this.display.getDisplayVars();
		this.view.on('setdisplaylock', this.setDisplayLock);//b4 init
		this.view.on('settouchscroll', this.setTouchScroll);
		this.view.init(res, displayVars);
	}

	fontsLoaded() {
		if (this.preloadCompleteBool) this.view.fontsLoaded();
	}

	displayChange(displayVars) {
		this.view.displayChange(displayVars);
	}

	setDisplayLock(lock) {
		this.display.setDisplayLock(lock);
	}

	setTouchScroll(canScroll) {
		this.display.setTouchScroll(canScroll);
	}
}

document.addEventListener('DOMContentLoaded', () => {
	let main = new Main();
	main.preload();
});
