require(`./config/config`);
const { app } = require(`./rutas/usuario`);
const mongoose = require(`mongoose`);



mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {

    if (err) throw err;

    console.log(`Base de datos online`);
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});