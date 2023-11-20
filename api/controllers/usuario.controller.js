const Usuario = require("../models/usuario.model");

async function getAllUsuarios(req, res) {
  try {
    const usuarios = await Usuario.findAll({
      where: req.query,
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function getOneUsuario(req, res) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      res.status(500).send('Usuario no encontrado');
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function getPerfil(req, res) {
  try {
    const usuario = await Usuario.findByPk(res.locals.usuario.id, {
      include: Actividad,
    });
    if (!usuario) {
      res.status(500).send('Usuario no encontrado');
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function createUser(req, res) {
  const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALTROUNDS));
  const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);
  req.body.password = hashedPassword;
  try {
    const user = await User.create(req.body);
    return res.status(200).send('User created');
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function updateUser(req, res) {
  try {
    const user = await User.update(req.body, {
      where: { id: req.params.id },
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(402).send(error.message);
  }
}

async function setTask(req, res) {
  try {
    const task = await Task.findByPk(req.body.taskId);
    const user = await User.findByPk(req.body.userId, {
      include: Task,
    });
    if (user.role != 'volunteer') {
      return res.status(501).send('This is not a volunteer');
    }
    if (user.tasks.length >= 2) {
      return res.status(501).send('This volunteer has many of tasks');
    }
    await task.setUser(user);
    return res.status(200).send('Task added');
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

async function deleteUser(req, res) {
  try {
    const user = await User.destroy({
      where: { id: req.params.id },
    });
    return res.status(200).json({ text: 'User removed', user: user });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  getProfile,
  setTask,
};
