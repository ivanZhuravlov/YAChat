let shell = require('shelljs');
shell.rm(
    '-rf',
    'wwwroot/app/*.js',
    'wwwroot/app/*.d.ts',
    'wwwroot/app/*.js.map',
    'wwwroot/app/wwwroot',
    'aot/src/*.js',
    'aot/src/*.js.map',
    'src/*.js',
    'src/*.js.map');