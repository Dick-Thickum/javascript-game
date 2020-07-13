import CONFIG from './Config';
import PlayerController from '../Controllers/PlayerController';
import AIController from '../Controllers/AIController';
import FireballController from '../Controllers/FireballController';

export default [
	{
		name: 'red-player',
		url: './sprites/Red-Cap-Character-16x18.png',
		controller: PlayerController,
		key_bindings: {
			up:    {key: 'w'},
			down:  {key: 's'},
			left:  {key: 'a'},
			right: {key: 'd'},
			attack_one: {key: 'f'}
		},
		position: {
			x: CONFIG.MAP_DIMENSIONS.WIDTH / 2,
			y: CONFIG.MAP_DIMENSIONS.HEIGHT / 2
		}
	},
	{
		name: 'fireball',
		url: './sprites/fireball-8x8.png',
		controller: FireballController,
		speed: 2.5,
		dimensions: {
			width: 8,
			height: 8
		}
	}
];