const server = require('./server')


var port = process.env.PORT || 4040;
server.listen(port, function () {
    console.log('Listening on port %s', port);
});
