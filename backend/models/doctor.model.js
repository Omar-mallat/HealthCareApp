module.exports = (sequelize, DataTypes) => {
  const Doctor = sequelize.define(
    "Doctor",
    {
      doctor_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "doctors",
    }
  );

  return Doctor;
};
