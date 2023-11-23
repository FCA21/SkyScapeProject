const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario.model.js")
const bcrypt = require("bcrypt");
require("dotenv").config();

async function login(req, res) {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!usuario)
      return res.status(404).send("Error: Email o Clave incorrecta");

    const comparePass = bcrypt.compareSync(req.body.password, usuario.password);

    if (comparePass) {
      const payload = { email: usuario.email };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
      return res.status(200).send({ token: token, rol: usuario.rol });
    } else {
      return res.status(404).send("Error: Email o Clave incorrecta");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function signup(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPass = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPass;
  try {

       const Usernameexistente = await Usuario.findOne({
         where: { username: req.body.username },
       });
       if (Usernameexistente) {
         return res.status(400).send('El username ya está en uso');
       }
    const usuario = await Usuario.create(req.body);
    const payload = { email: usuario.email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).send("Email duplicado");
  }
}

module.exports = { login, signup };
