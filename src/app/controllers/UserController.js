import * as Yup from 'yup';
import User from '../models/User';

/**
 * @method User.findOne() Esse método tenta encontrar um usuário em User com a tenda as condições passadas por where: {}
 * `where: { email: req.body.email }` verifica se existe algum email em User com mesmo email *req.body.email*
 */

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .required()
        .min(6),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const emailExists = await User.findOne({
      where: { email: req.body.email },
    });

    if (emailExists) {
      return res.status(400).json({
        error: `User already exists.`,
      });
    }

    const { id, name, email, provider } = await User.create(req.body);
    return res.json({ id, name, email, provider });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(6),
      password: Yup.string()
        .min(6)
        .when('oldPassword', (oldPassword, field) => {
          return oldPassword ? field.required() : field;
        }),
      confirmPassword: Yup.string().when('password', (password, field) => {
        return password ? field.required().oneOf([Yup.ref('password')]) : field;
      }),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { email, oldPassword } = req.body;

    /**
     * @user  User.findByPk(req.userId) busca o usuário que corresponde a esse userId.
     */
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const emailExists = await User.findOne({ where: { email } });

      if (emailExists) {
        return res.status(401).json({ error: 'User already exists' });
      }
    }

    /**
     * @exemple temos duas condições neste *if* caso oldPassword não esteja vazio e
     * user.checkPassword(oldPassword) retorne *false* o **!** nega essa condição pra *true*
     * assim ele indica que as *senhas não batem* e a execução do código continua na linha 47
     * retornando um status(401) de error.
     */
    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does exists match' });
    }

    /**
     * @user atualizando, salvando os novos dados de user e desestruturando apenas id, name e provider.
     */
    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
