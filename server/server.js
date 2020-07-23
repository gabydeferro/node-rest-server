require(`./config/config`);

const express = require(`express`);
const app = express();

//MIDDLEWARES
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//RUTAS
app.get(`/`, (req, res) => {

    res.json({
        nombre: `Gabriel`,
        apellido: `Lacina`
    });

});

app.put(`/:empleado`, (req, res) => {

    let empleado = req.params.empleado;

    res.json({
        nombre: `Gabriel`,
        apellido: `Lacina`,
        empleado
    });

});


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});