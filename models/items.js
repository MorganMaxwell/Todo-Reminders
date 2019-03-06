module.exports = function(sequelize, DataTypes) {
  var Items = sequelize.define("Items", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 15]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 150]
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 10]
      }
    },
    dueDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isDate: true
      }
    },
    reoccurring: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reoccurringDaily: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reoccurringWeekly: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    reoccurringaMontly: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    inprogress: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });

  Items.associate = function(models) {
    Items.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Items;
};
