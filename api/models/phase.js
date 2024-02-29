import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class phase extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    phaseId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "phase_id"
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'phase',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "phase_pkey",
        unique: true,
        fields: [
          { name: "phase_id" },
        ]
      },
    ]
  });
  }
}
