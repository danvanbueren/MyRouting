import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class organizationCategory extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    organizationId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "organization_id"
    },
    categoryId: {
    //  autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "category_id"
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "user_id"
    }
  }, {
    sequelize,
    tableName: 'organization_category',
    schema: 'public',
    timestamps: false
  });
  }
}
