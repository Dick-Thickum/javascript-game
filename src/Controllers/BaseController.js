import CONFIG from '../Config/Config';

export default class BaseController {
	constructor (entity) {
		this.entity = entity;
	}

	handleActions () {
		throw new Error('Must override `handleActions` method in child class.')
	}

	move () {
		throw new Error('Must override `move` method in child class.');
	}

	handleMoveCycle () {
		if (this.entity.has_moved) {
	    	this.entity.sprite.frame_count++;
			if (this.entity.sprite.frame_count >= CONFIG.FRAME_LIMIT) {
				this.entity.sprite.frame_count = 0;
				this.entity.sprite.cycle_loop_index++;
				if (this.entity.sprite.cycle_loop_index >= this.entity.sprite.cycle_loop.length) {
					this.entity.sprite.cycle_loop_index = 0;
				}
			}
		}

		if (!this.entity.has_moved) {
			this.entity.sprite.cycle_loop_index = 0;
		}
	}
}