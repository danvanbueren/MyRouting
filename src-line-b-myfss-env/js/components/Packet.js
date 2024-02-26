class Packet {
    constructor(app, packetUid, packetName, packetType, packetOwner_userUid, packetComments) {
        this.app = app;

        this.uid = packetUid;
        this.name = packetName;
        this.type = packetType;
        this.comments = packetComments;

        this.packetOwner = this.app.util.getUser(packetOwner_userUid);
        this.phases = new Phases(this);
    }

    getPacketType() {
        return this.type;
    }

    getPacketStatus() {
        this.phases.storage.sort((a, b) => {
            return a.stepNumber - b.stepNumber;
        });

        for(let element of this.phases.storage) {
            if(element.dateCompleted === '') {
                // Phase is incomplete - pull it
                let user = this.app.util.getUser(element.fkeyUserUidStakeholder);
                return 'Awaiting ' + element.type.toLowerCase() + ' by ' + user.getShortFormalName();
            }
        }

        return 'Packet not yet initialized';
    }
}