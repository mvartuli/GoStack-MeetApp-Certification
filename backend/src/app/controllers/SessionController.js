import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email('informe um e-mail válido')
        .required('É necessário informar o e-mail'),
      password: Yup.string().required('É necessário informar a senha'),
    });

    try {
      await schema.validate(req.body, { abortEarly: false });
    } catch (err) {
      const error = err.inner.map(e => e.message);
      return res
        .status(400)
        .json({ error: `Falha na validação\n${error.join('\n')}` });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }
    const { id, name } = user;
    return res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
