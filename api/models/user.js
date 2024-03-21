import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class user extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('uuid_generate_v1'),
      primaryKey: true
      , field: "user_id"
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "first_name"
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "last_name"
    },
    grade: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    rank: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    branch: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    organizationId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'organization',
        key: 'organization_id'
      },
      field: "organization_id"
    },
    raterId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'user',
        key: 'user_id'
      },
      field: "rater_id"
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    middleInitial: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "middle_initial"
    },
    dodId: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "dod_id"
    },
    searchable: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "user_pkey",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
