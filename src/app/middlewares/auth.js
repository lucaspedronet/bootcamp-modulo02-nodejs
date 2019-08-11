/**
 * @function promisify Nos permite transformar um modelo function de `callbac/promisi` para `Async/Await`.
 */
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import authConfug from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not privaider!' });
  }

  /**
   * @example na linha 18 a const authHeader duas string *Bearer eyJhbGciOiJIUzI1...* separadas por espaço
   * daí a necessidade de utilizar o `split(' ')` separar-las e pegar apenas o token.
   */
  const [, token] = authHeader.split(' ');

  try {
    /**
     * @constant decoded `promisify`(jwt.verify)(token, authConfug.secret) a function promisify transforma a function verify() da lib jwt.
     * em seguida retorna em um segundo parâmetro outras duas váriaveis `(token, authConfug.secret)`, neste momento o *jwt.verify*
     * esta realizando uma verificação/comparação entre *token* e *authConfug.secret*. Caso não seja iguis os token, irá cair diretamente
     * para o cath.
     */
    const decoded = await promisify(jwt.verify)(token, authConfug.secret);

    /**
     * @variation req.userId uma nova variável criada em tempo de execução, que vai
     * armazenar o id do usuário dentro da requisição na variável *req.userId*
     */
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
