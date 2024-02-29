import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class packet extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    packetId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true,
      field: "packet_id"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    comments:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    creator:{
      type: DataTypes.UUID,
      allowNull: true
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at"
    }
  }, {
    sequelize,
    tableName: 'packet',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "packet_pkey",
        unique: true,
        fields: [
          { name: "packet_id" },
        ]
      },
    ]
  });
  }
}
