const server = require('./server')

var port = process.env.PORT;
server.listen(port, function () {
    console.log('Listening on port %s', port);
});
