import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

/**
 * @static init() Método static chamado automaticamente pelo Sequelize.
 * @param {*} sequelize É o segundo parâmetro passado pro método *super.`init()`*, esta function espera
 * uma variável de conexão com banco Postgres passada pelo sequelize.
 * @function super.init() Método *super`.init()`* vem da classe Model (classe pai), atravez de um objeto = {}
 * nós enviamos as colunas que serão preenchidas pelo usuários.
 * @example Primeiro parâmetro passado para seuper.init() são os dados de entrada do usuário, o
 * segundo parâmentro também é objeto = {}.
 */

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
    /**
     * @method addHook são basicamente trechos de códicos executados automaticamente, uma function baseado em ações que
     * acontece em nosso model. por exemplo `beforeSave` nos permite executar o uma ação antes de um usuário ser criado
     * nosso Mode. *user* é parametro que contém informações do usuário, desta forma conseguimos realizar
     * varias modificações antes de salvar nosso usuário no banco.
     */

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcryptjs.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   * O método bcryptjs.`compare()` retorna *true* caso o password seja o mesmo que this.password_hash
   * caso contário retorna *false*
   * O `compare()` é uma function assícrona e qundo nós chamarmos devemos utilizar o `await`.
   */
  checkPassword(password) {
    return bcryptjs.compare(password, this.password_hash);
  }
}

export default User;
