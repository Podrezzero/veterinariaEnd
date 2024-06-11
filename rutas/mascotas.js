module.exports = function mascotasHandler(mascotas){
    return {
        get: (data, callback) => {//añadimos el método 
            if (data.indice) {
                if (mascotas[data.indice]) {
                    return callback(200, mascotas[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `mascota con indice ${data.indice} no encontrada ` })
            }
            callback(200, mascotas)
        },
        post: (data, callback) => {//añadimos el método 
            mascotas.push(data.payload) //Al array de mascotas le añadimos el payload
            callback(201, mascotas) //cuando creamos algo el status es 201
        },
        put: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (mascotas[data.indice]) {
                    mascotas[data.indice] = data.payload;
                    return callback(200, mascotas[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `mascota con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
        delete: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (mascotas[data.indice]) {
                    mascotas = mascotas.filter((_mascota, indice ) => indice != data.indice);
                    return callback(204, { mensaje: 'mascota eliminada' }) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `mascota con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
    };
}