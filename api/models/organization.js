import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class organization extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    organizationId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true,
      field: "organization_id"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    commanderId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      },
      field: "commander_id"
    },
    selId: {
      type: DataTypes.UUID,
      allowNull: true,
      field: "sel_id"
    }
  }, {
    sequelize,
    tableName: 'organization',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "organization_pkey",
        unique: true,
        fields: [
          { name: "organization_id" },
        ]
      },
    ]
  });
  }
}
