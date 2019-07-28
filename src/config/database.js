module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // uma coluna que registra data e hora em nosso banco
    underscored: true, //  modificando o sintax de camelcase dentro do banco: nameUser --> nome_user
    underscoredAll: true,
  },
};
