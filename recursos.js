module.exports = {
    mascotas: [
        { tipo: 'Gato', nombre: 'suñan', dueno: 'podre' },
        { tipo: 'Perro', nombre: 'suñana', dueno: 'zero' },
        { tipo: 'Sultan', nombre: 'suñane', dueno: 'dadadas' }
    ],
    veterinarias: [
        { nombre: 'suñan', apellido: 'todo', documento: '666666666' },
        { nombre: 'podre', apellido: 'zero', documento: '123456789' },
        { nombre: 'ricardo', apellido: 'de juan', documento: '321456789' }
    ],
    duenos: [
        { nombre: 'daniel', apellido: 'sanchez', documento: '111111111' },
        { nombre: 'inma', apellido: 'rios', documento: '621368476' },
        { nombre: 'pablo', apellido: 'pol', documento: '951748623' }
    ],
    consultas: [
        {
            mascota: 0, 
            veterinaria: 0, 
            fechaCreacion: new Date(),
            fechaEdicion: new Date(),
            historia: '',
            diagnostico: 'Conjuntivitis' ,
        }
    ]
}