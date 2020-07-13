import BaseController from './BaseController';
import CONFIG from '../Config/Config';
import GameMap from '../GameMap';

export default class PlayerController extends BaseController {
	constructor (player, key_bindings) {
		super(player);
		this.key_bindings = PlayerController.MakeKeyBindings(key_bindings);
		this.bindKeyListeners();
	}

	handleActions (game_map) {
		this.move(game_map);
		this.attack(game_map);
	}

	attack (game_map) {
		if (this.key_bindings.attack_one.pressed) {
			
		}
	}

	move (game_map) {
		this.entity.has_moved = false;

		if (this.key_bindings.up.pressed && GameMap.WithinBounds(this.entity, game_map, 0, -this.entity.movement.speed)) {
			this.entity.move(0, -this.entity.movement.speed, CONFIG.FACING.UP);
		}
		if (this.key_bindings.down.pressed && GameMap.WithinBounds(this.entity, game_map, 0, this.entity.movement.speed)) {
			this.entity.move(0, this.entity.movement.speed, CONFIG.FACING.DOWN);
		}
		if (this.key_bindings.left.pressed && GameMap.WithinBounds(this.entity, game_map, -this.entity.movement.speed, 0)) {
			this.entity.move(-this.entity.movement.speed, 0, CONFIG.FACING.LEFT);
		}
		if (this.key_bindings.right.pressed && GameMap.WithinBounds(this.entity, game_map, this.entity.movement.speed, 0)) {
			this.entity.move(this.entity.movement.speed, 0, CONFIG.FACING.RIGHT);
		}

		this.handleMoveCycle();
	}

	bindKeyListeners () {
		window.addEventListener('keyup', this.handleKeyUp());
		window.addEventListener('keydown', this.handleKeyDown());
	}

	handleKeyUp () {
        return (event) => {
        	for (const direction in this.key_bindings) {
        		if (this.key_bindings[direction].key === event.key) {
        			this.key_bindings[direction].pressed = false;
        		}
        	}
        };
    }

    handleKeyDown () {
        return (event) => {
            for (const direction in this.key_bindings) {
        		if (this.key_bindings[direction].key === event.key) {
        			this.key_bindings[direction].pressed = true;
        		}
        	}
        };
    }

    static Make (player, key_bindings) {
		return new PlayerController(player, key_bindings);
	}

	static MakeKeyBindings (key_bindings) {
		for (const direction in key_bindings) {
			key_bindings[direction].pressed = false;
		}
		return key_bindings;
	}
}