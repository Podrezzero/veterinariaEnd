module.exports = function veterinariasHandler(veterinarias){
    return {
        get: (data, callback) => {//añadimos el método 
            if (data.indice) {
                if (veterinarias[data.indice]) {
                    return callback(200, veterinarias[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `veterinaria con indice ${data.indice} no encontrada ` })
            }
            callback(200, veterinarias)
        },
        post: (data, callback) => {//añadimos el método 
            veterinarias.push(data.payload) //Al array de veterinarias le añadimos el payload
            callback(201, veterinarias) //cuando creamos algo el status es 201
        },
        put: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias[data.indice] = data.payload;
                    return callback(200, veterinarias[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `veterinaria con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
        delete: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (veterinarias[data.indice]) {
                    veterinarias = veterinarias.filter((_veterinaria, indice ) => indice != data.indice);
                    return callback(204, { mensaje: 'veterinaria eliminada' }) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `veterinaria con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
    };
}