const server = require('./server')


var port = process.env.PORT || 4000;
server.listen(port, function () {
    console.log('Listening on port %s', port);
});
