class Packet {
    constructor(app, packetUid, packetName, packetType, packetOwner_userUid, packetComments) {
        this.app = app;

        this.packetUid = packetUid;
        this.packetName = packetName;
        this.packetType = packetType;
        this.packetComments = packetComments;

        this.packetOwner = this.getUser(packetOwner_userUid);
        //this.packetPhases = new Phases(this.packetUid);
    }

    getPacketType() {
        return this.packetType;
    }

    getPacketStatus() {
        return 'Status';
    }

    getUser(id) {
        let userData = this.app.api.getUserById(id);

        let uid = userData[0]['UID'];
        let first = userData[0]['firstName'];
        let last = userData[0]['lastName'];
        let grade = userData[0]['grade'];
        let org = userData[0]['organization'];

        return new User(this.app, uid, first, last, grade, org);
    }
}