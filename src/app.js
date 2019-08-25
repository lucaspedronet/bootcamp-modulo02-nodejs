import express from 'express';
import routes from './routes';

/* importando arquivo de conexão com base de dados. */
import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  /**
   * @method middlewares Cadastrar todas as middlewares.
   */
  middlewares() {
    /**
     * @deprecated Configurando aplicação para receber o formato JSON.
     */
    this.server.use(express.json());
  }

  /**
   * @method routes Inicializa as rotas.
   */
  routes() {
    /**
     * @description routes é passado como parâmetro para use() pois nossas rotas estão sendo usadas como middewares.
     */
    this.server.use(routes);
  }
}

/**
 * @instance `new App().server` server é uma instancia que devemos exportar do App().
 */
export default new App().server;
