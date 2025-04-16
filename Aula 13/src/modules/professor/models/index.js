const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDb');

const Professor = sequelize.define('Professor', {
    matricula:{
        type: DataTypes.CHAR(8),
        primaryKey: true,
        validate:{
            is:{
                args: /^[A-Za-z][0-9]{7}$/,
                msg: 'A matricula deve começar com uma letra e ter mais 7 números'
            }
        }
    },
    nome:{
        type: DataTypes.STRING(100),
        allowNull: false,
        validate:{
            len: {
                args:[100]
            }
        }
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate:{
            isEmail:{
                msg:'Forneça um e-mail válido!'
            }
        }
    },
    senha: {
        type: DataTypes.CHAR(10),
        allowNull: false,
        validate:{
            args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{10}$/,
            msg: 'A senha deve conter exatamente 10 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.'
        }
    }

})

module.exports = Professor