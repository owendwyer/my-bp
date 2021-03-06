import PIXI from 'pixi.js';

const DEF_WIDTH = 800;
const DEF_HEIGHT = 550;
//decide on this, if going to keep big gap, then do it in same way that do spephr
const Y_MARGIN_LAND = 60;
const Y_MARGIN_PORT = 20;
const CANVAS_ID = 'myCanvas';//this is needed for highscorenentryinputs

class Display {
	constructor(view, displayChange) {
		this.windowResize = this.windowResize.bind(this);
		this.displayChange = displayChange;
		this.orient = 0;
		this.scale = 1;
		this.textRes = 1;
		this.devicePixelRatio = window.devicePixelRatio || 1;//this to questions and my-bp too
		this.myContainer = document.getElementById('containerDiv');//just once
		this.initRenderer();
		this.adjustSize();
		this.initTicker(view);
		this.setTouchScroll(true);
		//model.touchMode = PIXI.utils.isMobile.any;
		//let adjustScroll = new AdjustScroll();
		//adjustScroll.reset();
		this.addResizeListener();
	}

	initRenderer() {
		let rendererOptions = {
			width: DEF_WIDTH,
			height: DEF_HEIGHT,
			transparent: true,
			antialias: true,
			autoDensity: true,
			resolution: this.devicePixelRatio
		};
		this.locked = false;
		this.lockedUpdateFlag = false;
		if (PIXI.utils.isWebGLSupported()) {
		//if (false) {
			console.log('Yes WebGLSupported');
			this.renderer = new PIXI.Renderer(rendererOptions);
		} else {
			console.log('Not WebGLSupported');
			this.renderer = new PIXI.CanvasRenderer(rendererOptions);
		}
		// PIXI.settings.ROUND_PIXELS = true;
		this.renderer.view.id = CANVAS_ID;
		//open pr about this?
		this.renderer.plugins.interaction.interactionFrequency = PIXI.utils.isMobile.any ? 100000 : 10;
		this.myContainer.appendChild(this.renderer.view);
	}

	initTicker(view) {
		let ticker = new PIXI.Ticker();
		let myFPS = PIXI.utils.isMobile.any ? 30 : 60;
		ticker.maxFPS = myFPS;
		//ticker.maxFPS = 30;
		ticker.add(() => {
			this.renderer.render(view);
		}, PIXI.UPDATE_PRIORITY.LOW);
		ticker.start();
	}

	adjustSize() {
		let winHei = window.innerHeight;
		let winWid = this.myContainer.clientWidth;

		this.orient = winWid > winHei ? 0 : 1;
		let aspectRatio = this.orient === 0 ? DEF_WIDTH / DEF_HEIGHT : DEF_HEIGHT / DEF_WIDTH;

		let wid = 0;
		let hei = 0;
		let yMargin = this.orient === 0 ? Y_MARGIN_LAND : Y_MARGIN_PORT;
		if (winWid / winHei > aspectRatio) { //window height limits size of canvas
			hei = Math.round(winHei - yMargin);
			wid = Math.round(hei * aspectRatio);//set width according to height
		} else { //window width limits size of canvas
			wid = winWid;
			hei = Math.round(wid / aspectRatio);//set height according to width
			if (hei + yMargin > winHei) { //height according to width is too big
				hei = Math.round(winHei - yMargin);//adjust height to fit
				wid = Math.round(hei * aspectRatio);//set width according to height
			}
		}
		this.scale = this.orient === 0 ? wid / DEF_WIDTH : wid / DEF_HEIGHT;
		this.scale = Math.round(1000 * this.scale) / 1000;
		//this.scale = Math.round(500 * this.scale) / 500;
		this.textRes = this.scale * this.devicePixelRatio;
		if (this.textRes < 1) this.textRes = 1;
		this.renderer.resize(wid, hei);
	}

	addResizeListener() {
		window.addEventListener('resize', this.windowResize);
	}

	windowResize() {
		if (!this.locked) {
			let curOrient = this.orient;
			this.adjustSize();
			//adjustScroll.reset();
			if (curOrient !== this.orient) {
				this.displayChange({ scale: this.scale, orient: this.orient, textRes: this.textRes });
			} else { //orientation didnt change so just pass null
				this.displayChange({ scale: this.scale, orient: null, textRes: this.textRes });
			}
		} else {
			this.lockedUpdateFlag = true;
		}
	}

	getDisplayVars() {
		return { scale: this.scale, orient: this.orient, textRes: this.textRes };
	}

	setTouchScroll(canScroll) {
		if (canScroll) {
			this.renderer.plugins.interaction.autoPreventDefault = false;
			this.renderer.view.style.touchAction = 'auto';
		} else {
			this.renderer.plugins.interaction.autoPreventDefault = true;
			this.renderer.view.style.touchAction = 'none';
		}
	}

	setDisplayLock(lock) {
		this.locked = lock;
		if (this.lockedUpdateFlag) this.windowResize();
		this.lockedUpdateFlag = false;
	}
}

export default Display;
