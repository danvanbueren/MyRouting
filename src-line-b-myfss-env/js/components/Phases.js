class Phases {
    // create all the phases associated with a packet
    constructor(packetObject) {
        this.app = packetObject.app;
        this.parentPacket = packetObject;
        this.parentPacketUid = packetObject.uid;

        this.storage = this.app.util.getPhases(this.parentPacket);

    }
}