import View from './view';
import Display from './display';

class Controller {
	init(res) {
		this.view = new View();
		this.display = new Display(this.view, this.orientationChange);
		let orientation = this.display.getOrientation();
		this.view.init(res, orientation);
	}

	orientationChange(orientation) {
		this.view.orientationChange(orientation);
	}
}

export default Controller;
