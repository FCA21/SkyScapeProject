const jwt = require("jsonwebtoken");
const User = require("../models/usuario.model.js")
const bcrypt = require("bcrypt");
require("dotenv").config();

async function login(req, res) {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!usuario)
      return res.status(404).send("Error: Email or Password incorrect");

    const comparePass = bcrypt.compareSync(req.body.password, usuario.password);

    if (comparePass) {
      const payload = { email: usuario.email };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
      return res.status(200).send({ token: token, rol: user.rol });
    } else {
      return res.status(404).send("Error: Email or Password incorrect");
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function signup(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    const payload = { email: user.email };
    const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "1h" });
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).send("Email duplicated");
  }
}

module.exports = { login, signup };
