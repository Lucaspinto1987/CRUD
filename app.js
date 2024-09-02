const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res) => {
    res.send(`
        <h1>Lista de Usuarios</h1>
        <ul>
        ${usuarios.map(usuario => 
            `<li> Id: ${usuario.id} | Nombre: ${usuario.nombre} | Procedencia: ${usuario.lugarProcedencia}</li>`).join('')
        }
        </ul>
        <form action="/usuarios" method="POST">
            <label for='nombre'>Nombre</label>
            <input type='text' id='nombre' name='nombre' required>
            <label for='edad'>Edad</label>
            <input type='number' id='edad' name='edad' required>
            <label for='lugarProcedencia'>Lugar de Procedencia</label>
            <input type='text' id='lugarProcedencia' name='lugarProcedencia' required>
            <button type='submit'>Agregar usuario</button>
        </form>`
    );
});

app.get('/usuarios', (req, res) => {
    res.json(usuarios);
});

app.get('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.find(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (!usuario) {
        res.status(404).json({error:'Usuario no encontrado'});
    } else {
        res.json(usuario);
    }
});

app.post('/usuarios', (req, res) => {
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia,
    };
    usuarios.push(nuevoUsuario);
    res.redirect('/');
});

app.put('/usuarios/:nombre', (req, res) => {
    const index = usuarios.findIndex(u => u.nombre.toLowerCase() === req.params.nombre.toLowerCase());
    if (index !== -1) {
        usuarios[index] = {
            ...usuarios[index],
            ...req.body
        };
        res.json(usuarios[index]);
    } else {
        res.status(404).json({error:'Usuario no encontrado'});
    }
});

app.delete('/usuarios/:nombre', (req, res) => {
    const usuario = usuarios.length;
    usuarios = usuarios.filter(usuarios => usuarios.nombre.toLowerCase() !== req.params.nombre.toLowerCase());
    
    if (usuarios.length < usuario) {
        res.send('Usuario eliminado');
    } else {
        res.status(404).json({error:'Usuario no encontrado'});
    }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`El servidor está escuchando en el puerto http://localhost:${PORT}`);
});
