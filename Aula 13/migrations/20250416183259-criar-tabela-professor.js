'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('professor', { 
      matricula:{
        type: Sequelize.CHAR(8),
        primaryKey: true,
              
      },
      nome:{
        type: Sequelize.STRING(100),
        allowNull: false,
              
      },
      email:{
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: Sequelize.CHAR(10),
        allowNull: false,      
      } 
    });
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('professor');
  }
};
