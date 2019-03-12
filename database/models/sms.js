module.exports = (sequelize, DataTypes) => {
  const Sms = sequelize.define('Sms', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    } 
  }, {
    tableName: 'sms'
  });
  Sms.associate = (models) => {
    Sms.belongsTo(models.Contact,{
      as: 'sender',
      foreignKey:'senderId',
      hooks:true,
    })
    Sms.belongsTo(models.Contact,{
      as: 'receiver',
      foreignKey:'receiverId',
      hooks:true,
    })
  };
  return Sms;
};
