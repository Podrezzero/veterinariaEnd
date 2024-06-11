const http = require('node:http');
const requestHandler = require("./request-handler");






const server = http.createServer(requestHandler);

server.listen( //hacemos que el servidor escuche
    5000, //el puerto 5000
    () => { console.log("server ok in 5000") } //Callback que se ejecuta una vez que el servidor comienza a escuchar en el puerto especificado
);  