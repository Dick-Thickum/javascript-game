import BaseController from './BaseController';
import CONFIG from '../Config/Config';
import EntityContainer from '../EntityContainer';
import GameMap from '../GameMap';

export default class FireballController extends BaseController {
	constructor (fireball) {
		super(fireball);
	}

	move (game_map) {
		if (this.entity.movement.facing === CONFIG.FACING.UP) {
			this.entity.move(0, -this.entity.movement.speed, CONFIG.FACING.UP);
		}
		if (this.entity.movement.facing === CONFIG.FACING.DOWN) {
			this.entity.move(0, this.entity.movement.speed, CONFIG.FACING.DOWN);
		}
		if (this.entity.movement.facing === CONFIG.FACING.LEFT) {
			this.entity.move(-this.entity.movement.speed, 0, CONFIG.FACING.LEFT);
		}
		if (this.entity.movement.facing === CONFIG.FACING.RIGHT) {
			this.entity.move(this.entity.movement.speed, 0, CONFIG.FACING.RIGHT);
		}

		this.handleMoveCycle();
	}

	handleActions (game_map) {
		this.decay(game_map);
		this.move(game_map);
	}

	decay (game_map) {
		if (
			!GameMap.WithinBounds(this.entity, game_map, 0, -this.entity.movement.speed) ||
			!GameMap.WithinBounds(this.entity, game_map, 0, this.entity.movement.speed)  ||
			!GameMap.WithinBounds(this.entity, game_map, -this.entity.movement.speed, 0) ||
			!GameMap.WithinBounds(this.entity, game_map, this.entity.movement.speed, 0)
		) {
			FireballController.engine.removeEntityById(this.entity.id);
			FireballController.engine.renderer.clear();
			FireballController.engine.renderer.render(FireballController.engine.entities);
		}
	}

	static GetStartPosition (from_entity) {
		let x;
		let y;
		if (from_entity.movement.facing === CONFIG.FACING.UP) {
			x = from_entity.movement.position.x + from_entity.sprite.dimensions.scaled_width / 3;
			y = from_entity.movement.position.y - 17;
		} else if (from_entity.movement.facing === CONFIG.FACING.DOWN) {
			x = from_entity.movement.position.x + from_entity.sprite.dimensions.scaled_width / 3;
			y = from_entity.movement.position.y + from_entity.sprite.dimensions.scaled_height + 9;
		} else if (from_entity.movement.facing === CONFIG.FACING.LEFT) {
			x = from_entity.movement.position.x - 17;
			y = from_entity.movement.position.y + from_entity.sprite.dimensions.height;
		} else if (from_entity.movement.facing === CONFIG.FACING.RIGHT) {
			x = from_entity.movement.position.x + 31;
			y = from_entity.movement.position.y + from_entity.sprite.dimensions.height;
		}
		return {x,y};
	}

	static Make (entity) {
		return new FireballController(entity);
	}

	static Fire (from_entity) {
		const fireball_config = EntityContainer.GetByName('fireball');
		fireball_config.position = FireballController.GetStartPosition(from_entity);
		fireball_config.facing = from_entity.movement.facing;
		FireballController.engine.addEntity(fireball_config);
		FireballController.engine.renderer.clear();
		FireballController.engine.renderer.render(FireballController.engine.entities);
	}
}