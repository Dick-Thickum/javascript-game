import EntityConfigs from './Config/EntityConfigs';

class EntityContainer {
	static configs = [];

	static Set (entity_configs = []) {
		EntityContainer.configs = EntityContainer.AddIds(entity_configs);
	}

	static GetByName (name) {
		let index = this.configs.findIndex((config) => config.name === name);
		return EntityContainer.configs[index];
	}

	static All () {
		return EntityContainer.configs;
	}

	static AddIds (configs) {
		return configs.map((config, index) => {
			config.id = index;
			return config;
		});
	}

	static AddConfig (config) {
		EntityContainer.configs.push(config);
		EntityContainer.configs = EnityConfig.AddIds(entity_configs);
	}
}

EntityContainer.Set(EntityConfigs);

export default EntityContainer;