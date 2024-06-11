module.exports = function duenosHandler(duenos){
    return {
        get: (data, callback) => {//añadimos el método 
            if (data.indice) {
                if (duenos[data.indice]) {
                    return callback(200, duenos[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `dueno con indice ${data.indice} no encontrada ` })
            }
            callback(200, duenos)
        },
        post: (data, callback) => {//añadimos el método 
            duenos.push(data.payload) //Al array de duenos le añadimos el payload
            callback(201, duenos) //cuando creamos algo el status es 201
        },
        put: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos[data.indice] = data.payload;
                    return callback(200, duenos[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `dueno con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
        delete: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (duenos[data.indice]) {
                    duenos = duenos.filter((_dueno, indice ) => indice != data.indice);
                    return callback(204, { mensaje: 'dueno eliminada' }) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `dueno con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
    };
}