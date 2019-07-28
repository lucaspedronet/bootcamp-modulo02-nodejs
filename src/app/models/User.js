import Sequelize, { Model } from 'sequelize';

/**
 * @static init() Método static chamado automaticamente pelo Sequelize.
 * @param {*} sequelize É o segundo parâmetro passado pro método *super.`init()`*
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
        emai: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );
  }
}

export default User;
