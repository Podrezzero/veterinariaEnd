const url = require('node:url');
const StringDecoder = require('node:string_decoder').StringDecoder; //nos trae esta clase
const enrutador = require("./enrutador");

module.exports = (req, res) => {

    //1 - obtener la url desde el objeto request
    const urlActual = req.url //almacenamos la url
    const urlParseada = url.parse(urlActual, true); //la parseamos(nos da mazo info de la url, como si fuese un objeto)

    //2 - obtener la ruta
    const ruta = urlParseada.pathname;

    //3 - quitar slash
    const rutaLimpia = ruta.replace(/^\/+|\/+$/g, '') //expresion regular para quitar el slash

    //3.1 obtener el request method
    const metodo = req.method.toLowerCase();

    //3.1.1 dar permisos de CORS escribiendo ls headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Request-Methods", "OPTIONS,GET,PUT,DELETE,POST");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS,GET,PUT,DELETE,POST");
    res.setHeader("Access-Control-Allow-Headers", "*");


    //33.1.2 Dar respuesta automatica cuando el metodo sea options
    if(metodo === 'options'){
        res.writeHead(200);
        res.end();
        return
    }

    //3.2 obtener variables del query url
    const { query = {} } = urlParseada;

    //3.3 Obtener los header
    const { headers = {} } = req;

    //3.4 Obtener payload, en caso de haber
    const decoder = new StringDecoder('utf-8');
    let buffer = '';

    //3.4.1 ir acumulando data cuando el request reciba un payload
    req.on('data', (data) => { //cada vez que ocurra el evento data en el request se ejecutara el callback(que recibe los dats(data)) El evento data se emite cada vez que llega un chunk (fragmento)
        buffer += decoder.write(data); //convierte el stream en string y se almacena en el buffer   buffer += decoder.write(data): Los datos convertidos se añaden a un buffer, que es simplemente una cadena de texto que acumula los datos recibidos.
    });

    //3.4.2 terminar de acumular datos y decirle al decoder que finalice
    req.on('end', () => {
        buffer += decoder.end();

        if (headers['content-type'] === 'application/json') {
            buffer = JSON.parse(buffer); //parseamos el buffer para que sea JSON
        }


        //3.4.3 revisar si tiene subrutas
        if (rutaLimpia.indexOf("/") > -1) {
            var [rutaPrincipal, indice] = rutaLimpia.split("/");
        }

        //3.5 ordenar los datos (data) del request
        const data = {
            indice,
            ruta: rutaPrincipal || rutaLimpia,
            query,
            metodo,
            headers,
            payload: buffer
        };



        console.log({ data })

        //3.6 - Elegir el manejador de la respuesa (handler) dependiendo de la ruta y asignarle la funcion del enrutador
        let handler;
        if (
            data.ruta &&
            enrutador[data.ruta] &&
            enrutador[data.ruta][metodo]
        ) { //añadimos el método
            handler = enrutador[data.ruta][metodo]; //llamamos al elemento del handler que tiene contiene el elemnto de rutaPrincipal y el método
        } else {
            handler = enrutador.noEncontrada
        }

        //4 - ejecutar handler para enviar la respuesta
        if (typeof handler === 'function') {
            handler(data, (statusCode = 200, mensaje) => {
                const respuesta = JSON.stringify(mensaje);
                res.setHeader("Content-Type", "application/json")

                res.writeHead(statusCode);

                //linea donde realmente ya estamos respondiendo a la aplicacion
                res.end(respuesta)
            })
        }

    });
}