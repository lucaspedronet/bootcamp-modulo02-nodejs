import User from '../models/User';

/**
 * @method User.findOne() Esse método tenta encontrar um usuário em User com a tenda as condições passadas por where: {}
 * `where: { email: req.body.email }` verifica se existe algum email em User com mesmo email *req.body.email*
 */

class UserController {
  async store(req, res) {
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
    console.log('req');

    return res.json({ ok: true });
  }
}

export default new UserController();
