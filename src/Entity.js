import CONFIG from './Config/Config';
import Sprite from './Sprite';

export default class Entity {
	static engine = {};

	constructor (id, url, game_loop, movement, width, height) {
		this.id        = id;
		this.collision = true;
		this.has_moved = false;
		this.sprite    = Sprite.Make(url, game_loop, width, height);
		this.movement  = Object.assign({
			position : {x:0,y:0},
			facing   : CONFIG.FACING.DOWN,
			speed    : 1
		}, movement);
	}

	move (deltaX, deltaY, facing) {
		let collisions     = false;

		this.other_entities.forEach((entity) => {
			if (Entity.CollidesWith(this, entity, deltaX, deltaY)) {
				collisions = true;
			}
		});

		if (!collisions) {
			if (this.movement.position.x + deltaX > 0) {
				this.movement.position.x += deltaX;
			}
			if (this.movement.position.y + deltaY > 0) {
				this.movement.position.y += deltaY;
			}
			this.has_moved = true;
		}
		
		
		this.movement.facing = facing;
	}

	get other_entities () {
		return Entity.engine.entities.filter((entity) => entity.id !== this.id && entity.collision);
	}

	static Make (id, url, game_loop, movement = {position:{x:0,y:0}, facing:CONFIG.FACING.DOWN, speed:1}, width = 16, height = 18) {
		return new Entity(id, url, game_loop, movement, width, height);
	}

	static CollidesWith (entity_one, entity_two, deltaX, deltaY) {
		return entity_one.movement.position.x + deltaX < entity_two.movement.position.x + entity_two.sprite.dimensions.scaled_width &&
			   entity_one.movement.position.x + deltaX + entity_one.sprite.dimensions.scaled_width > entity_two.movement.position.x &&
			   entity_one.movement.position.y + deltaY < entity_two.movement.position.y + entity_two.sprite.dimensions.scaled_height &&
			   entity_one.movement.position.y + deltaY + entity_one.sprite.dimensions.scaled_height > entity_two.movement.position.y
	}

	static SetEngine (engine) {
		Entity.engine = engine;
	}
}