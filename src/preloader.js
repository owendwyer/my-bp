import PIXI from 'pixi.js';
//import WebFont from 'WebFont';
//import { model, settings } from '../model';
import mySpriteData from './jsons/mySprite.json';
//import myContSpriteData from '../jsons/sets_0_5.json';

const MAIN_SPRITE_PATH = './res/mainSprite.0.0.png';

class Preloader {
	constructor(callBack) {
		this.callBack = callBack;
		//this.tryTimes = 3;
		this.loader = new PIXI.Loader();
		this.loaded = this.loaded.bind(this);
		this.gotError = this.gotError.bind(this);
	}

	startLoad() {
		this.loader.add('main', MAIN_SPRITE_PATH);
		this.loader.onError.add(this.gotError);
		this.loader.onComplete.add(this.loaded);
		//this.loadFonts();
		this.loader.load();
	}

	gotError(e) {
		this.clearUp();
		this.tryTimes -= 1;
		if (this.tryTimes > 0) {
			this.startLoad();
			console.log('load error, retrying', e);
		} else {
			this.emit('failed');
			console.log('load error, giving up', e);
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

	loadFonts() {
		/*WebFont.load({
			google: {
				families: ['Alegreya Sans SC:700', 'Alegreya Sans:700', 'Acme']
			}
		});*/
	}
}

export default Preloader;
