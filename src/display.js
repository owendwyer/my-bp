import PIXI from 'pixi.js';

const DEF_WIDTH = 800;
const DEF_HEIGHT = 550;

class Display {
	constructor(view, orientationChange) {
		this.orientationChange = orientationChange;
		this.view = view;
		this.orientation = 0;
		this.scale = 1;
		this.locked = false;
		this.myContainer = document.getElementById('containerDiv');//just once
		this.initRenderer();
		this.adjustSize();
		this.initTicker();
		//model.touchMode = PIXI.utils.isMobile.any;
		//let adjustScroll = new AdjustScroll();
		//adjustScroll.reset();
		this.addResizeListener();
	}

	initRenderer() {
		this.renderer = new PIXI.Renderer({
			width: DEF_WIDTH,
			height: DEF_HEIGHT,
			transparent: true,
			antialias: true,
			autoDensity: true,
			resolution: window.devicePixelRatio
		});
		PIXI.settings.ROUND_PIXELS = true;
		this.renderer.view.id = 'myCanvas';//needed for hscores
		this.renderer.plugins.interaction.autoPreventDefault = false;
		//this.renderer.plugins.interaction.interactionFrequency = 1000000;
		this.renderer.plugins.interaction.interactionFrequency = 10;
		if (PIXI.utils.isMobile.any) this.renderer.plugins.interaction.interactionFrequency = 100000;
		this.myContainer.appendChild(this.renderer.view);
	}

	initTicker() {
		let ticker = new PIXI.Ticker();
		//let myFPS = PIXI.utils.isMobile.any ? 30 : settings.MAX_FPS;
		//ticker.maxFPS = myFPS;
		ticker.maxFPS = 30;
		ticker.add(() => {
			this.renderer.render(this.view);
		}, PIXI.UPDATE_PRIORITY.LOW);
		ticker.start();
	}

	adjustSize() {
		let winHei = window.innerHeight;
		let winWid = this.myContainer.clientWidth;
		this.orientation = winWid > winHei ? 0 : 1;
		let aspectRatio = this.orientation === 0 ? DEF_WIDTH / DEF_HEIGHT : DEF_HEIGHT / DEF_WIDTH;

		let wid = 0;
		let hei = 0;
		let yMargin = 16;
		if (winWid / winHei > aspectRatio) {
			//window height limits size of canvas
			hei = Math.round(winHei - yMargin);
			//set width according to height
			wid = Math.round(hei * aspectRatio);
		} else {
			//window width limits size of canvas
			wid = winWid;
			//set height according to width
			hei = Math.round(wid / aspectRatio);
			if (hei + 20 > winHei) {
				wid = winWid - 10;
				hei = Math.round(wid / aspectRatio);
			}
		}
		this.scale = this.orientation === 0 ? wid / DEF_WIDTH : wid / DEF_HEIGHT;
		this.scale = Math.round(1000 * this.scale) / 1000;
		if (!this.locked) {
			this.renderer.resize(wid, hei);
			this.view.scale.set(this.scale, this.scale);
		}
	}

	addResizeListener() {
		//let myTimer = null;//maybe should be this.myTimer and declared at top
		window.addEventListener('resize', () => {
			//clearTimeout(myTimer);
			//myTimer = setTimeout(() => {
			let curOrient = this.orientation;
			this.adjustSize();
			//adjustScroll.reset();
			if (curOrient !== this.orientation) this.orientationChange(this.orientation);
			//}, 300);
		});
	}

	getOrientation() {
		return this.orientation;
	}
}

export default Display;
