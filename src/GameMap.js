import CONFIG from './Config/Config';

export default class GameMap {
	constructor (dimensions) {
		this.dimensions = dimensions;
	}

	static Make (dimensions = {width:CONFIG.MAP_DIMENSIONS.WIDTH, height:CONFIG.MAP_DIMENSIONS.HEIGHT}) {
		return new GameMap(dimensions);
	}

	static WithinBounds (entity, game_map, deltaX, deltaY) {
		return (entity.movement.position.x + entity.sprite.dimensions.scaled_width  + deltaX) < game_map.dimensions.width &&
			   (entity.movement.position.y + entity.sprite.dimensions.scaled_height + deltaY) < game_map.dimensions.height &&
			   (entity.movement.position.x + deltaX) > 1 &&
			   (entity.movement.position.y + deltaY) > 1
	}
}