const numCpus = require('os').cpus().length;

module.exports = {
	apps : [
		{
			name: 'build-worker',
			script: 'worker.js',
			instances: Math.ceil(numCpus * 0.75),
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
			env: {
				NODE_ENV: 'development',
				PORT: 3000 // Ensure PORT is specified if needed by build-worker
			},
			env_development: {
				NODE_ENV: 'development',
				PORT: 3000
			},
			env_production: {
				NODE_ENV: 'production'
			}
		},
		{
			name: 'chan',
			script: 'server.js',
			instances: Math.ceil(numCpus * 0.75),
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
			wait_ready: true,
			kill_timeout: 5000,
			env: {
				NODE_ENV: 'development',
				PORT: 3000 // Added PORT for chan to bind to localhost:3000
			},
			env_development: {
				NODE_ENV: 'development',
				PORT: 3000
			},
			env_production: {
				NODE_ENV: 'production',
				PORT: 3000 // Ensure PORT is defined in production if needed
			}
		},
		{
			name: 'schedules',
			script: 'schedules/index.js',
			instances: 1,
			autorestart: true,
			watch: false,
			max_memory_restart: '1G',
			log_date_format: 'YYYY-MM-DD HH:mm:ss.SSS',
			env: {
				NODE_ENV: 'development'
			},
			env_development: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
