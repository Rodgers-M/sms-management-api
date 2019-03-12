module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      senderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'contacts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      receiverId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'contacts',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('sms');
  }
};
