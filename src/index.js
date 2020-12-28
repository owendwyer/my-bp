import opdPreloader from 'opdPreloader';
import Preloader from './preloader';
import View from './view';
import Display from './display';

class Main {
	preload() {
		console.log('todo - need to bundle js src from the indextemplatedev.html and use that instead');
		console.log('todo - setup polyfill');
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

	orientationChange(orientation) {
		this.view.orientationChange(orientation);
	}

	init(res) {
		this.view = new View();
		this.display = new Display(this.view, this.orientationChange);
		let orientation = this.display.getOrientation();
		this.view.init(res, orientation);
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
