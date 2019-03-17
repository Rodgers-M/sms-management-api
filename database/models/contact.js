module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define('Contact', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      unique: true,
    } 
  }, {
    tableName: 'contacts',
  });
  Contact.associate = (models) => {
    Contact.hasMany(models.Sms,{onDelete:'CASCADE',foreignKey:'senderId',hooks:true})
    Contact.hasMany(models.Sms,{onDelete:'CASCADE',foreignKey:'receiverId',hooks:true})
  };
  return Contact;
};
