module.exports = {
	mysql: {
		host: '127.0.0.1',
		user: 'root',
		password: 'password',
		database: 'zhidan',
		multipleStatements: true
	},
	redisConfig: {
		'cookie' : {
			'maxAge' : 1800000  // 30 * 60 * 1000 ms = 30 mins
		 },
		 'sessionStore' : {
			 'host' : '127.0.0.1',
			 'port' : '6379',
			 'pass' : 'password',
			 'db' : 1,
			 'ttl' : 1800, // 60 * 30 sec = 30 mins
			 'logErrors' : true
		 }
	}
}
