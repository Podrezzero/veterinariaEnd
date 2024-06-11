module.exports = function consultasHandler( {consultas, veterinarias, mascotas}){
    return {
        get: (data, callback) => {//añadimos el método 
            if (data.indice) {
                if (consultas[data.indice]) {
                    return callback(200, consultas[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada ` })
            }
            const consultaConRelaciones = consultas.map((consulta)=>({
                ...consulta, 
                mascota: { ...mascotas[consulta.mascota], id: consulta.mascota},
                veterinaria: {...veterinarias[consulta.veterinaria], id: consulta.veterinaria}
            }
            ));
            callback(200, consultaConRelaciones);
        },
        post: (data, callback) => {//añadimos el método 
            let nuevaConsulta = data.payload;
            nuevaConsulta.fechaCreacion = new Date();
            nuevaConsulta.fechaModificacion = new Date();
            consultas = [...consultas,nuevaConsulta] //Al array de consultas le añadimos el payload
            callback(201, consultas) //cuando creamos algo el status es 201
        },
        put: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (consultas[data.indice]) {
                    const { fechaCreacion } = consultas[data.indice];
                    consultas[data.indice] = {
                        ...data.payload,
                        fechaCreacion,
                        fechaEdicion: new Date()
                    }
                    return callback(200, consultas[data.indice]) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
        delete: (data, callback) => {//añadimos el método 
            if (typeof data.indice !== "undefined") {
                if (consultas[data.indice]) {
                    consultas = consultas.filter((_consulta, indice ) => indice != data.indice);
                    return callback(204, { mensaje: 'consulta eliminada' }) //en este caso el return lo usamos para que no siga hacia abajo
                }
                return callback(404, { mensaje: `consulta con indice ${data.indice} no encontrada ` })
            }
            callback(400,  { mensaje: `falta indice` })
        },
    };
}