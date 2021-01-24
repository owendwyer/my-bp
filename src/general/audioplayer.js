import PIXI from 'pixi.js';
import { Howl, Howler } from 'howler';
// import { getAudioSpriteA, getAudioSpriteB, getAudioLength } from '../contentview/audioframes';

const RES_PATH = {
	dev: './res/content-3/longAudio/pauses/use/',
	prod: 'https://www.gamestolearnenglish.com/content-3/longAudio/pauses/use/'
};

class AudioPlayer extends PIXI.Container {
	constructor(res) {
		super();
		this.gamePosition = 'A';
		this.showPlayAudioBut = true;
		this.retryCount = 3;
		this.isAudioLoadedA = false;
		this.isAudioLoadedB = false;
		this.loadFailedA = false;
		this.loadFailedB = false;
		this.isAudioOn = true;
		this.loadingInd = 0;
		this.myAudioA = null;
		this.myAudioB = null;
		this.audSpriteA = [];
		this.audSpriteB = [];

		this.audioBut = new PIXI.Sprite(res['audioBut.png']);
		this.playAudioBut = new PIXI.Sprite(res['playAudioBut.png']);
		this.playAudioBut.position.set(-58, 0);
		this.playAudioBut.anchor.set(0.5, 0.5);
		this.audioBut.anchor.set(0.5, 0.5);

		this.loadingText = new PIXI.Text('loading', {
			fontFamily: 'Arial',
			fontSize: 16,
			fill: 0x333333,
			fontWeight: 'bold'
		});
		this.loadingText.anchor.set(0.5, 0.5);
		this.loadingText.position.set(-10, 0);

		this.audioBut.interactive = true;
		this.audioBut.buttonMode = true;
		this.playAudioBut.interactive = true;
		this.playAudioBut.buttonMode = true;
		this.audioBut.on('pointerup', this.toggleAudio.bind(this));

		this.loadingText.visible = false;

		this.addChild(this.audioBut, this.playAudioBut, this.loadingText);
	}

	setPlayButVisible(/*bool*/) {
		//this.showPlayAudioBut = bool;
		//this.playAudioBut.visible = bool;
	}

	playAudio(roundInd, loopInd) {
		if (this.isAudioOn) this.forceAudio(roundInd, loopInd);
	}

	forceAudio(roundInd, loopInd) { //force is to play audio even if !this.isAudioOn
		this.stopAudio();
		if (roundInd < 10) {
			this.playAudioA(roundInd, loopInd);
		} else {
			this.playAudioB(roundInd, loopInd);
		}
	}

	getAudioLength(setInd, roundInd, loopInd) {
		// return getAudioLength(setInd, roundInd, loopInd);
	}

	playAudioA(roundInd, loopInd) {
		if (this.isAudioLoadedA) {
			let snd = 'aud_' + roundInd + '_' + loopInd;
			this.myAudioA.play(snd);
		}
	}

	playAudioB(roundInd, loopInd) {
		if (this.isAudioLoadedB) {
			let snd = 'aud_' + roundInd + '_' + loopInd;
			this.myAudioB.play(snd);
		}
	}

	stopAudio() {
		if (this.isAudioLoadedA) this.myAudioA.stop();
		if (this.isAudioLoadedB) this.myAudioB.stop();
	}

	toggleAudio() {
		if (this.isAudioOn) {
			this.isAudioOn = false;
			this.audioBut.alpha = 0.5;
		} else {
			this.isAudioOn = true;
			this.audioBut.alpha = 1;
		}
		this.stopAudio();
		this.emit('audiotoggle');
	}

	show() {
		this.visible = true;
	}

	hide() {
		this.visible = false;
	}

	showPlayBut() {
		this.showPlayAudioBut = true;
		this.playAudioBut.visible = true;
	}

	hidePlayBut() {
		this.showPlayAudioBut = false;
		this.playAudioBut.visible = false;
	}

	setGamePosition(pos) {
		this.gamePosition = pos;
		this.checkLoaded();
	}

	checkLoaded() {
		if (this.gamePosition === 'A') {
			if (this.isAudioLoadedA) {
				this.unshowLoading();
			} else {
				this.showLoading();
			}
		} else if (this.isAudioLoadedB) {
			this.unshowLoading();
		} else {
			this.showLoading();
		}
	}

	showLoading() {
		this.audioBut.visible = false;
		this.playAudioBut.visible = false;
		this.loadingText.visible = true;
		this.loadingText.text = 'loading';
		this.checkFailed();
	}

	unshowLoading() {
		this.audioBut.visible = true;
		if (this.showPlayAudioBut) this.playAudioBut.visible = true;
		this.loadingText.visible = false;
	}

	checkFailed() {
		if (this.gamePosition === 'A' && this.loadFailedA) {
			if (this.loadFailedA) this.loadingText.text = 'failed';
		} else if (this.loadFailedB) this.loadingText.text = 'failed';
	}

	checkAllLoaded() {
		return this.isAudioLoadedB;
	}

	checkAudioOn() {
		return this.isAudioOn;
	}

	checkSuspended() {
		this.checkAudioContext = false;
		if ('ctx' in Howler && Howler.ctx !== null) {
			Howler.ctx.resume();
		}
	}

	//////////////////////////////////////////////////////////////////////////////
	//loading

	loadAudio(ind) {
		this.unsetAudioB();//reseting of any previous audio
		//this.unsetAudioA();//this is unneeded as tryLoadA unsets anyway
		this.isAudioLoadedA = false;
		this.isAudioLoadedB = false;
		this.loadFailedA = false;
		this.loadFailedB = false;
		this.loadingInd = ind;
		this.retryCount = 3;
		// this.audSpriteA = getAudioSpriteA(ind);
		this.showLoading();
		this.tryLoadA();
	}

	//loading A
	tryLoadA() {
		this.unsetAudioA();
		let audPath = RES_PATH[OPD_ENV] + 'a_' + this.loadingInd + '_a';
		this.myAudioA = new Howl({
			src: [audPath + '.ogg', audPath + '.mp3'],
			sprite: this.audSpriteA,
			onload: () => {
				this.audioLoadedA();
			},
			onloaderror: () => {
				this.retryCount -= 1;
				if (this.retryCount < 1) {
					this.audioFailedA();
				} else {
					this.tryLoadA();
				}
			}
		});
	}

	audioLoadedA() {
		this.isAudioLoadedA = true;
		this.checkLoaded();
		this.loadAudioB();
	}

	audioFailedA() {
		this.unsetAudioA();
		this.loadFailedA = true;
		this.checkLoaded();//this will set text to show 'failed'
	}

	unsetAudioA() {
		if (this.myAudioA !== null) {
			this.myAudioA.off('load');
			this.myAudioA.off('loaderror');
			this.myAudioA.unload();
			this.myAudioA = null;
		}
	}

	loadAudioB() {
		this.retryCount = 3;
		// this.audSpriteB = getAudioSpriteB(this.loadingInd);
		this.tryLoadB();
	}

	//loading B
	tryLoadB() {
		this.unsetAudioB();
		let audPath = RES_PATH[OPD_ENV] + 'a_' + this.loadingInd + '_b';
		this.myAudioB = new Howl({
			src: [audPath + '.ogg', audPath + '.mp3'],
			sprite: this.audSpriteB,
			onload: () => {
				this.audioLoadedB();
			},
			onloaderror: () => {
				this.retryCount -= 1;
				if (this.retryCount < 1) {
					this.audioFailedB();
				} else {
					this.tryLoadB();
				}
			}
		});
	}

	unsetAudioB() {
		if (this.myAudioB !== null) {
			this.myAudioB.off('load');
			this.myAudioB.off('loaderror');
			this.myAudioB.unload();
			this.myAudioB = null;
		}
	}

	audioFailedB() {
		this.unsetAudioB();
		this.loadFailedB = true;
		this.checkLoaded();
	}

	audioLoadedB() {
		this.isAudioLoadedB = true;
		this.checkLoaded();
		this.emit('audioallloaded');
	}
}

export default AudioPlayer;
