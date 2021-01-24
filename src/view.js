import PIXI from 'pixi.js';
import gsap from 'gsap';
import Background from './background';
import AudioPlayer from './general/audioplayer';
import { getHashObj } from './general/hashchecker';

class View extends PIXI.Container {
	constructor() {
		super();
		this.currentView = null;
		this.nextView = null;
		this.fadeTween = null;

		// this.audioContextCheck = this.audioContextCheck.bind(this);

		this.hashObj = getHashObj();
	}

	init(res, displayVars) {
		this.scale.set(displayVars.scale);
		this.background = new Background(res, displayVars);
		this.audioPlayer = new AudioPlayer(res);

		this.addChild(this.background, this.audioPlayer);

		this.setupDisplay(displayVars);
		this.addLists();
		this.showFirstView();
	}

	setupDisplay(displayVars) {
		if (displayVars.orient === 0) {
			this.audioPlayer.position.set(760, 40);
		} else {
			this.audioPlayer.position.set(505, 755);
		}
	}

	displayChange(displayVars) {
		this.scale.set(displayVars.scale);
		if (displayVars.orient !== null) {
			this.setupDisplay(displayVars);
			this.background.displayChange(displayVars);
		}
	}

	fontsLoaded() {
	}

	/////////////////////////////////////////////////////////////////////////////
	//views
	showFirstView() {
		//task stuff
		this.showTitle();
	}

	showTitle() {
		this.audioPlayer.show();
		// this.nextView = this.titleView;
		// this.showNextView();
		this.emit('setdisplaylock', false);//for when coming from endview
		this.emit('settouchscroll', true);//for when coming from gameview
	}

	showNextView() {
		if (this.currentView === null) this.addNextView();
		else {
			this.currentView.deit();
			this.fadeTween = gsap.to(this.currentView, { duration: 0.15, alpha: 0, onComplete: this.addNextView });
		}
	}

	addNextView() {
		if (this.currentView !== null) this.removeChild(this.currentView);
		this.addChild(this.nextView);
		this.currentView = this.nextView;
		this.currentView.alpha = 0;
		if (this.firstTime) {
			this.firstTime = false;
			this.fadeTween = gsap.to(this.currentView, { duration: 0.4, delay: 0.3, alpha: 1 });
		} else {
			this.fadeTween = gsap.to(this.currentView, { duration: 0.4, alpha: 1 });
		}
		this.nextView.init();
	}
	//////////////////////////////////////////////////////////////////////////////

	addLists() {

	}
}

export default View;
