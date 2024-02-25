class Packet {
    constructor(app, packetUid, packetName, packetType, packetOwner_userUid, packetComments) {
        this.app = app;

        this.uid = packetUid;
        this.name = packetName;
        this.type = packetType;
        this.comments = packetComments;

        this.packetOwner = this.getUser(packetOwner_userUid);
        this.phases = new Phases(this);
    }

    getPacketType() {
        return this.type;
    }

    getPacketStatus() {
        this.phases.storage.sort((a, b) => {
            return a.stepNumber - b.stepNumber;
        });

        // TODO: figure out why this isn't working
        this.phases.storage.forEach((phase) => {
            if(phase.dateCompleted === '') {
                // Phase is incomplete
                return 'Awaiting ' + phase.type + 'by [lookup]' + phase.fkeyUserUidStakeholder;
            } else {
                // Phase is complete
                return 'lol';
            }
        });
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