import Sequelize from 'sequelize';

import User from '../app/models/User';
import Student from '../app/models/Student';

// Importando configurações do banco
import databaseConfig from '../config/database';

// Array com todas as models da aplicação
const models = [User, Student];

class Database {
  constructor() {
    this.init();
  }

  // Método que inicia a conexão de todos os models
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
