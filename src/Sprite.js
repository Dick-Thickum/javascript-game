import CONFIG from './Config/Config';

export default class Sprite {
	constructor (url, game_loop, scale, width, height, cycle_loop) {
		this.cycle_loop_index   = 0;
		this.frame_count        = 0;
		this.cycle_loop         = cycle_loop;
		this.image_map          = Sprite.MakeImageMap(url, game_loop);
		this.dimensions         = {
			scale, width, height,
			scaled_width : scale * width,
			scaled_height: scale * height
		};
	}

	static Make (url, game_loop, width = 16, height = 18, scale = 2, cycle_loop = CONFIG.CYCLE_LOOP) {
		return new Sprite(url, game_loop, scale, width, height, cycle_loop)
	}

	static MakeImageMap (url, game_loop) {
		const image_map  = new Image();
		image_map.onload = function () {
			window.requestAnimationFrame(game_loop);
		};
		image_map.src    = url;
		return image_map;
	}
}