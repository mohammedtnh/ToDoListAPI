module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define(
    "Task",
    {
      name: { type: DataTypes.STRING },
      done: { type: DataTypes.BOOLEAN, defaultValue: false },
      priority: { type: DataTypes.STRING, defaultValue: "low" },
      deadline: { type: DataTypes.DATE },
    },
    {
      timestamps: false,
    }
  );

  return Task;
};
