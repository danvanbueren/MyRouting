import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class category extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    categoryId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: "category_id"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'category',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "category_pkey",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
  }
}
