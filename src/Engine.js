import Entity from './Entity';

export default class Engine {
	constructor (game_map, entities, renderer) {
		this.game_map = game_map;
		this.controllers = this.makeControllers(entities);
		this.renderer = renderer;
	}

	addEntity (entity_config) {
		this.controllers.push(this.makeController(this.controllers.length, entity_config))
	}

    removeEntityById (id) {
        const index = this.controllers.findIndex((controller) => controller.entity.id === id);
        this.controllers.splice(index, 1);
    }

	makeControllers (entity_configs) {
    	return entity_configs.map((entity_config, id) => this.makeController(id, entity_config));
    }

    makeEntityInstance (id, entity_config) {
		let controller;
		let args = [];

		args.push(id);
		args.push(entity_config.url);
		args.push(this.run());

		if (entity_config.hasOwnProperty('position')) {
			args.push({position:entity_config.position})
		}

		if (entity_config.hasOwnProperty('speed')) {
			args[args.length-1].speed = entity_config.speed;
		}

        if (entity_config.hasOwnProperty('facing')) {
            args[args.length-1].facing = entity_config.facing;
        }

		if (entity_config.hasOwnProperty('dimensions')) {
			args.push(entity_config.dimensions.width);
			args.push(entity_config.dimensions.height);
		}

        if (entity_config.hasOwnProperty('collision')) {
            args.push(entity_config.collision);
        }

		return Entity.Make(...args);
    }

    makeController (id, entity_config) {
    	//make entity instance
    	const entity_instance = this.makeEntityInstance(id, entity_config);
    	const args = [];

    	args.push(entity_instance);

		if (entity_config.hasOwnProperty('key_bindings')) {
			args.push(entity_config.key_bindings);
		}

		return entity_config.controller.Make(...args);
    }

    //main game loop
	run () {
        return () => {
        	this.controllers.map((controller) => controller.handleActions(this.game_map));

        	this.renderer.render(this.entities);

        	this.wait();

			window.requestAnimationFrame(this.run());
		};
    }

    start () {
    	return this.run()();
    }

    getCurrentTimeInSeconds () {
        return (new Date()).getTime();
    }

    wait () {
        let start = this.getCurrentTimeInSeconds();
        setTimeout((start + 0.016) - this.getCurrentTimeInSeconds());
    }

    get entities () {
    	const entities = [];
    	this.controllers.forEach((controller) => entities.push(controller.entity));
    	return entities;
    }

    static Make (game_map, entities, renderer) {
    	return new Engine(game_map, entities, renderer);
    }
}