let express = require('express'),
    path = require('path'),
    app = express();

let argv = require('yargs')
    .usage('Usage: $0 --port=[num]')
    .alias('p', 'port')
    .default({
        port: 80
    })
    .argv;

app.use(express.static(path.join(__dirname, 'wwwroot')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'wwwroot/index.html'));
});

app.listen(argv.port, () => {
    console.log(`Start webclient on port ${argv.port}!`);
});

process.on('SIGINT', () => {
    console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
    console.log('Server stopped!');

    process.exit();
})