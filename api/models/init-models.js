import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _category from  "./category.js";
import _file from  "./file.js";
import _organization from  "./organization.js";
import _organizationCategory from  "./organization_category.js";
import _packet from  "./packet.js";
import _packetPhase from  "./packet_phase.js";
import _phase from  "./phase.js";
import _user from  "./user.js";

export default function initModels(sequelize) {
  const category = _category.init(sequelize, DataTypes);
  const file = _file.init(sequelize, DataTypes);
  const organization = _organization.init(sequelize, DataTypes);
  const organizationCategory = _organizationCategory.init(sequelize, DataTypes);
  const packet = _packet.init(sequelize, DataTypes);
  const packetPhase = _packetPhase.init(sequelize, DataTypes);
  const phase = _phase.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);
/*
  user.belongsTo(organization, { as: "organization", foreignKey: "organizationId"});
  organization.hasMany(user, { as: "users", foreignKey: "organizationId"});
  file.belongsTo(packet, { as: "packet", foreignKey: "packetId"});
  packet.hasMany(file, { as: "files", foreignKey: "packetId"});
  packet.hasMany(packetPhase, { as: "phases", foreignKey: "packetId"});
  user.belongsTo(user, { as: "rater", foreignKey: "raterId"});
  user.hasMany(user, { as: "users", foreignKey: "raterId"});
*/

user.belongsTo(organization, { as: "organization", foreignKey: "organizationId"});
organization.hasMany(user, { as: "users", foreignKey: "organizationId"});
file.belongsTo(packet, { as: "packet", foreignKey: "packetId"});
packet.hasMany(file, { as: "files", foreignKey: "packetId"});
packet.hasMany(packetPhase, { as: "phases", foreignKey: "packetId"});
user.belongsTo(user, { as: "rater", foreignKey: "raterId"});
user.hasMany(user, { as: "users", foreignKey: "raterId"});
packet.belongsTo(user, { as: "creatorUser", foreignKey: "creator"});
user.hasMany(packet, { as: "createdPackets", foreignKey: "creator" });
packetPhase.belongsTo(user, { as: "assigneeUser", foreignKey: "assignee"});
user.hasMany(packetPhase, { as: "assigneePackets", foreignKey: "assignee" });



  return {
    category,
    file,
    organization,
    organizationCategory,
    packet,
    packetPhase,
    phase,
    user,
  };
}
