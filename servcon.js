"use strict";

/*;
	@module-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2016 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"package": "servcon",
			"path": "servcon/servcon.js",
			"file": "servcon.js",
			"module": "servcon",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"repository": "https://github.com/volkovasystems/servcon.git",``
			"test": "servcon-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Server base constant configuration.
	@end-module-documentation

	@include:
		{
			"yargs": "yargs"
		}
	@end-include
*/

var yargs = require( "yargs" );

var servcon = function servcon( option ){
	option = option || { };

	let parameter = require( "yargs" ).argv;
	let service = parameter.service;

	let base = {
		"server": {
			"protocol": "http",
			"domain": "localhost",
			"host": "127.0.0.1",
			"port": 8000
		}
	};

	let local = option.local || base;
	let staging = option.staging || base;
	let production = option.production || base;
	if( service ){
		local = option.local[ service ] || local;
		staging = option.staging[ service ] || staging;
		production = option.production[ service ] || production;
	}

	let environment = local;
	let type = "local";
	if( parameter.staging ||
		process.env.NODE_ENV == "staging" )
	{
		environment = staging;
		type = "staging";

	}else if( parameter.production ||
		process.env.NODE_ENV == "production" )
	{
		environment = production;
		type = "production";
	}

	return {
		"LOCAL_PROTOCOL": local.server.protocol,
		"LOCAL_DOMAIN": local.server.domain,
		"LOCAL_HOST": local.server.host,
		"LOCAL_PORT": local.server.port,

		"STAGING_PROTOCOL": staging.server.protocol,
		"STAGING_DOMAIN": staging.server.domain,
		"STAGING_HOST": staging.server.host,
		"STAGING_PORT": staging.server.port,

		"PRODUCTION_PROTOCOL": production.server.protocol,
		"PRODUCTION_DOMAIN": production.server.domain,
		"PRODUCTION_HOST": production.server.host,
		"PRODUCTION_PORT": production.server.port,

		"ENVIRONMENT": type,
		"ENVIRONMENT_PROTOCOL": environment.server.protocol,
		"ENVIRONMENT_DOMAIN": environment.server.domain,
		"ENVIRONMENT_HOST": environment.server.host,
		"ENVIRONMENT_PORT": environment.server.port
	};
};

module.exports = servcon;
