import CONFIG from './Config';
import PlayerController from '../Controllers/PlayerController';
import AIController from '../Controllers/AIController';

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
		name: 'green-player',
		url: './sprites/Green-Cap-Character-16x18.png',
		controller: PlayerController,
		key_bindings: {
			up:    {key: 'i'},
			down:  {key: 'k'},
			left:  {key: 'j'},
			right: {key: 'l'},
			attack_one: {key: 'f'}
		},
		position: {
			x: CONFIG.MAP_DIMENSIONS.WIDTH - (16*2),
			y: 0
		}
	},
	{
		name: 'fireball',
		url: './sprites/fireball-8x8.png',
		controller: AIController,
		dimensions: {
			width: 8,
			height: 8
		},
		position: {
			x: 200,
			y: 50
		},
		speed: 1.5
	}
];