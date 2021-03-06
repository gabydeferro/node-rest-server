const express = require(`express`);
const app = express();
const bcrypt = require(`bcrypt`);
const _ = require(`underscore`);


const Usuario = require(`../modelos/usuario`);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get(`/`, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true })
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                res.status(400).json({
                    ok: false,
                    err
                });
            } else {

                Usuario.countDocuments({ estado: true }, (err, cuantos) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos
                    });
                });
            }
        })
});

app.post(`/usuario`, (req, res) => {

    let body = req.body;


    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save()
        .then(usuarioDB => {
            return res.json({
                ok: true,
                usuario: usuarioDB
            });
        })
        .catch(err => {
            return res.status(400).json({
                ok: true,
                err
            });
        });

});

app.put(`/usuario/:id`, (req, res) => {

    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'estado']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else {
            res.json({
                ok: true,
                usuario: usuarioDB
            });
        }
    });
});

app.delete(`/usuario/:id`, (req, res) => {

    let id = req.params.id;
    let cambioEstado = { estado: false };

    Usuario.findByIdAndUpdate(id, cambioEstado, { new: true }, (err, usuarioPorBorrar) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            });
        } else if (!usuarioPorBorrar) {
            res.status(400).json({
                ok: false,
                err: {
                    message: `Usuario no encontrado`
                }
            });
        } else {

            res.json({
                ok: true,
                usuario: usuarioPorBorrar
            });
        }
    });

});

module.exports = {
    app
}