/**
 * @description Arquivo de conexão com banco de dados e responsável por carregar todos os Models da aplicação.
 */

import Sequelize from 'sequelize';
import databaseConfig from '../config/database';
import User from '../app/models/User';

/**
 * @var this.connection variável de conexão, que se conecta com base de dados.
 * @constant models é um array que armazena todos os Models da Aplicação.
 * @method init() Cria a conexão com banco de dados, chamando cada método `init()` dos
 * respectivos *Models* (User,Agendamento e etc) da aplicação repassando como parâmtro a variável de conexão
 * `this.connection`
 */

const models = [User];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => {
      model.init(this.connection);
    });
  }
}

export default new Database();
