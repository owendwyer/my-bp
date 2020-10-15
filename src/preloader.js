import PIXI from 'pixi.js';
//import WebFont from 'WebFont';
//import { model, settings } from '../model';
import mySpriteData from './jsons/mySprite.json';
//import myContSpriteData from '../jsons/sets_0_5.json';

class Preloader {
	constructor(callBack) {
		this.callBack = callBack;
		//this.tryTimes = 3;
		this.loader = new PIXI.Loader();
		this.loadedFun = this.loaded.bind(this);
		this.gotErrorFun = this.gotError.bind(this);
	}

	startLoad() {
		let myPath = './res/mainSprite.0.0.png';
		this.loader.add('main', myPath);
		this.loader.onError.add(this.gotErrorFun);
		this.loader.onComplete.add(this.loadedFun);
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
