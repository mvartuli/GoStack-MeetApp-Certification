// para o yup não dá para fazer importação padrão pq ele não exporta nada
import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('É necessário informar o nome'),
      email: Yup.string()
        .email('informe um e-mail válido')
        .required('É necessário informar o e-mail'),
      password: Yup.string()
        .required('É necessário informar a senha')
        .min(6, 'A senha precisa ter no mínimo 6 caractéres'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      const error = err.inner.map(e => e.message);
      return res
        .status(400)
        .json({ error: `Falha na validação\n${error.join('\n')}` });
    }

    const userExists = await User.findOne({
      where: { email: req.body.email },
    });
    if (userExists) {
      return res.status(400).json({
        error: 'Usuário já cadastrado',
      });
    }
    const { id, name, email } = await User.create(req.body);

    return res.json({ id, name, email });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required('É necessário informar o nome'),
      email: Yup.string()
        .email('informe um e-mail válido')
        .required('É necessário informar o e-mail'),
      oldPassword: Yup.string(),
      password: Yup.string()
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.required('Infome a nova senha') : field
        )
        .when('oldPassword', (oldPassword, field) =>
          oldPassword ? field.min(6, 'No mínimo 6 caractéres') : field
        ),
      confirmPassword: Yup.string().when('password', (password, field) =>
        password
          ? field
              .required('Confirme a nova senha')
              .oneOf([Yup.ref('password')], 'Nova senha não confere')
          : field
      ),
    });

    const { email, oldPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Senha não confere' });
    }

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      const error = err.inner.map(e => e.message);
      return res
        .status(400)
        .json({ error: `Falha na validação\n${error.join('\n')}` });
    }

    if (email !== user.email) {
      const userExists = await User.findOne({
        where: { email },
      });
      if (userExists) {
        return res.status(400).json({
          error: 'Usuário já cadastrado',
        });
      }
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({ id, name, email, provider });
  }
}

export default new UserController();
