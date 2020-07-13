import BaseController from './BaseController';
import CONFIG from '../Config/Config';
import GameMap from '../GameMap';
import EntityContainer from '../EntityContainer';
import Entity from '../Entity';
import FireballController from './FireballController';

export default class PlayerController extends BaseController {
	constructor (player, key_bindings) {
		super(player);
		this.on_cooldown = false;
		this.key_bindings = PlayerController.MakeKeyBindings(key_bindings);
		this.bindKeyListeners();
		this.cooldown_limit = 100;
		this.cooldown_timer = 0;
	}

	handleActions (game_map) {
		this.move(game_map);
		this.checkAttackCooldown();
		this.attack();
	}

	attack () {
		if (this.key_bindings.attack_one.pressed && !this.on_cooldown) {
			this.on_cooldown = true;
			FireballController.Fire(this.entity);
		}
	}

	checkAttackCooldown () {
		if (this.on_cooldown) {
			if (this.cooldown_timer < this.cooldown_limit) {
				this.cooldown_timer++;
			} else {
				this.cooldown_timer = 0;
				this.on_cooldown = false;
			}
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