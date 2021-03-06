import CONFIG from './Config/Config';
import GameMap from './GameMap';
import Renderer from './Renderer';
import EntityContainer from './EntityContainer';
import Engine from './Engine';
import EntityConfigs from './Config/EntityConfigs';
import Entity from './Entity';
import BaseController from './Controllers/BaseController';

window.onload = function () {
	document.querySelector('canvas').setAttribute('height', CONFIG.MAP_DIMENSIONS.HEIGHT + 'px');
	document.querySelector('canvas').setAttribute('width', CONFIG.MAP_DIMENSIONS.WIDTH + 'px');

	const game_map = GameMap.Make();

	const renderer = Renderer.Make();

	const entities = [EntityContainer.GetByName('red-player')];

	const engine = Engine.Make(game_map, entities, renderer);

	Entity.SetEngine(engine);

	BaseController.SetEngine(engine);

	window.engine = engine;

	engine.start();
};