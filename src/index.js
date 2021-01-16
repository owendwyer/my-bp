import opdPreloader from 'opdPreloader';
import Preloader from './preloader';
import View from './view';
import Display from './display';

class Main {
	preload() {
		console.log('todo - setup polyfill');

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
	///////////////////////////////////////////////////////////////////////////
	//polyfill check and load - probably put into main
	let main = new Main();
	main.preload();
});

/*

polyfillLoad() {
	this.loadScript(POLYFILL_PATH, (err) => {
		if (err) {
			opdPreloader.browserNotSupported();
		} else {
		let main = new Main();
		main.preload();
		}
	});
}

loadScript(url, callback) {
	let script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	script.onload = function() {
		console.log('loaded');
		script.onload = null;
		script.onerror = null;
		callback(null);
	};
	script.onerror = function() {
		script.onload = null;
		script.onerror = null;
		callback(true);
	};
	document.head.appendChild(script);
}

*/
