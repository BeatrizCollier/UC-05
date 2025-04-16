const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Aluno = sequelize.define(
  'Aluno',
  {
    matricula: {
      type: DataTypes.CHAR(5),
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique,
        validate:{
            isEmail:{
                msg: 'Forneça um e-mail válido!'
            },
            len:{
                args:[10,60], //tamanho minimo e maximo
                msg: 'O e-mail deve ter no mínimo 10 caracteres e no máximo 60.'
            }
        }
    },
    senha:{
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
            leg: {
                args:[10],
                msg: 'A senha deve ter 10 caracteres.'
            }
        }
    },
    turma_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: turma
        }
    }
    
  },
  {
    // Other model options go here
    tableName:'aluno',
    createdAt:'criado_em',
    updatedAt:'atualizado_em'
  },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true