import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class packetPhase extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    packetPhaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true,
      field: "packet_phase_id"
    },
    suspense: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    comments: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    stepNumber: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: "step_number"
    },
    completionDate: {
      type: DataTypes.TIME,
      allowNull: true,
      field: "completion_date"
    },
    packetId:{
      type: DataTypes.UUID,
      allowNull: false,
      field: "packet_id",
      references: {
        model: 'packet',
        key: 'packet_id'
      }
    },
    phase: {
      type: DataTypes.TEXT,
      allowNull: true
  
    },
    assignee: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'packet_phase',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "packet_phase_pkey",
        unique: true,
        fields: [
          { name: "packet_phase_id" },
        ]
      },
    ]
  });
  }
}
