class AppResizer {
	static sizer(renderer, model, view) {
		let WIDTH = 800;
		let HEIGHT = 550;
		let myContainer = document.getElementById('containerDiv');

		let winHei = window.innerHeight;
		let winWid = myContainer.clientWidth;
		let orientation = winWid > winHei ? 0 : 1;
		let aspectRatio = orientation === 0 ? WIDTH / HEIGHT : HEIGHT / WIDTH;

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
		let scale = orientation === 0 ? wid / WIDTH : wid / HEIGHT;
		scale = Math.round(1000 * scale) / 1000;
		if (!model.locked) {
			renderer.resize(wid, hei);
			view.scale.set(scale, scale);
			model.orientation = orientation;
			model.canvasRatio = scale;
		}
	}
}

export default AppResizer;
