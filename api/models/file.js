import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class file extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    fileId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true,
      field: "file_id"
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
   
    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      field: "created_at"
    },
    packetId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'packet',
        key: 'packet_id'
      },
      field: "packet_id"
    }
  }, {
    sequelize,
    tableName: 'file',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "file_id_pkey",
        unique: true,
        fields: [
          { name: "file_id" },
        ]
      },
    ]
  });
  }
}
