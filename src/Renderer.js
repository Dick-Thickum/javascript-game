import CONFIG from './Config/Config';

export default class Renderer {
	constructor (canvas, context) {
		this.canvas  = canvas;
		this.context = context;
	}

	drawEntity (entity) {
		this.context.drawImage(
			entity.sprite.image_map,
			entity.sprite.cycle_loop[entity.sprite.cycle_loop_index] * entity.sprite.dimensions.width,
			entity.movement.facing * entity.sprite.dimensions.height,
			entity.sprite.dimensions.width,
			entity.sprite.dimensions.height,
			entity.movement.position.x,
			entity.movement.position.y,
			entity.sprite.dimensions.scaled_width,
			entity.sprite.dimensions.scaled_height
		);
	}

	render (entities) {
		this.clear();
		entities.forEach((entity) => this.drawEntity(entity))
	}

	clear () {
		this.context.clearRect(0, 0, CONFIG.MAP_DIMENSIONS.WIDTH, CONFIG.MAP_DIMENSIONS.HEIGHT);
	}

	static Make (canvas_id = undefined) {
		let canvas;
		if (canvas_id == undefined) {
			canvas = document.querySelector('canvas');
		} else {
			canvas = document.getElementById(canvas_id);
		}
		
		const context = canvas.getContext('2d');
		return new Renderer(canvas, context);
	}

}