class Phases {
    // create all the phases associated with a packet
    constructor(packetObject) {
        this.app = packetObject.app;
        this.parentPacket = packetObject;
        this.parentPacketUid = packetObject.uid;

        this.storage = [];

        this.getPhases();
    }

    getPhases() {
        // Reset phase storage
        this.storage = [];

        // Get data through API
        let phasesData = this.app.api.getPhaseById(this.parentPacketUid);

        if(phasesData === null) {
            // No phases associated with this packet
        } else {
            phasesData.forEach((e) => {
                let phase = new Phase(this.parentPacket, e['UID'], e['type'], e['suspense'], e['comments'], e['dateCompleted'], e['stepNumber'], e['FK_users_UID_stakeholder']);
                this.storage.push(phase);
            });
        }
    }
}