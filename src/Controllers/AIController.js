import CONFIG from '../Config/Config';
import GameMap from '../GameMap';
import BaseController from './BaseController';

export default class AIController extends BaseController {
	constructor (entity) {
		super(entity);
		this.count = 0;
		this.limit = 100;
		this.countdown = false;
	}

	move (game_map) {
		if (this.count < this.limit && !this.countdown) {
			if (GameMap.WithinBounds(this.entity, game_map, this.entity.movement.speed, 0)) {
				this.entity.move(this.entity.movement.speed, 0, CONFIG.FACING.RIGHT);
			}
			this.count++;
		}

		if (this.count >= this.limit) {
			this.countdown = true
		}

		if (this.countdown && this.count === 0) {
			this.countdown = false;
		}

		if (this.countdown) {
			if (GameMap.WithinBounds(this.entity, game_map, -this.entity.movement.speed, 0)) {
				this.entity.move(-this.entity.movement.speed, 0, CONFIG.FACING.LEFT);
			}
			this.count--;
		}

		this.handleMoveCycle();
	}

	handleActions (game_map) {
		this.move(game_map);
	}

	static Make (entity) {
		return new AIController(entity);
	}
}