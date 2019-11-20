import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      // Recebe todos os campos da tabela de usuários
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL, // campo que não existe na base de dados
        password_hash: Sequelize.STRING,
      },
      // Configurações da tabela
      {
        sequelize,
      }
    );

    // Antes de salvar
    this.addHook('beforeSave', async user => {
      if (user.password) {
        // Criptografa a senha
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  checkPassword(password) {
    // Compara a senha do usuário com a senha criptografada;
    return bcrypt.compare(password, this.password_hash);
  }
}
export default User;
