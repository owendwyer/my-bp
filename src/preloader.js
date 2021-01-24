import PIXI from 'pixi.js';
import webfont from "./general/webfont";
import mySpriteData from './jsons/mySprite.json';

const RES_URL = {
	dev: './res/',
	prod: 'https://www.gamestolearnenglish.com/games/[dirhere]/res/'
};
const MAIN_SPRITE_PATH = './mainSprite.0.0.png';

class Preloader {
	constructor(callBack, fontsCallback) {
		this.callBack = callBack;
		this.fontsCallback = fontsCallback;
		this.areFontsLoaded = false;
		this.tryTimes = 3;
		this.loader = new PIXI.Loader();
		this.loaded = this.loaded.bind(this);
		this.gotError = this.gotError.bind(this);
	}

	startLoad() {
		let myPath = RES_URL[OPD_ENV] + MAIN_SPRITE_PATH;
		this.loader.add('main', myPath);
		this.loader.onError.add(this.gotError);
		this.loader.onComplete.add(this.loaded);
		this.loadFonts();
		this.loader.load();
	}

	gotError(e) {
		this.clearUp();
		this.tryTimes -= 1;
		if (this.tryTimes > 0) {
			this.startLoad();
			console.log('load error, retrying', e);
		} else {
			console.log('load error, giving up', e);
			this.callBack(null);
		}
	}

	loaded() {
		console.log('loaded');
		let mySheet = new PIXI.Spritesheet(
			this.loader.resources.main.texture.baseTexture, mySpriteData
		);
		mySheet.parse((map) => {
			this.callBack(map);
			this.clearUp();
			//model.textures = map;
		});
	}

	clearUp() {
		this.loader.onError.detachAll();
		this.loader.onComplete.detachAll();
		this.loader.destroy();
	}

	checkFontsLoaded() {
		return this.areFontsLoaded;
	}

	loadFonts() {
		webfont.load({
			google: {
				families: ["Alegreya+Sans:wght@700", "ABeeZee"]
			},
			active: () => {
				this.areFontsLoaded = true;
				this.fontsCallback();
			}
		});
	}
}

export default Preloader;
