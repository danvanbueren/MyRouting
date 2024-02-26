class Utilities {
    constructor(app) {
        this.app = app;
    }

    // Returns a Packet object associated with the database UID
    getPacket(packetUid) {
        let r = this.app.api.getPacketById(packetUid);
        return new Packet(this.app, r[0]['UID'], r[0]['name'], r[0]['type'], r[0]['FK_users_UID'], r[0]['comments']);
    }

    // Returns array of every Packet object in the database
    getPackets() {
        let storage = [];

        let response = this.app.api.getPackets();

        response.forEach((e) => {
            let p = new Packet(this.app, e['UID'], e['name'], e['type'], e['FK_users_UID'], e['comments']);
            storage.push(p);
        });

        return storage;
    }

    // Returns array of Phases associated with a Packet object
    getPhases(packetObject) {
        // Reset phase storage
        let storage = [];

        // Get data through API
        let response = this.app.api.getPhaseById(packetObject.uid);

        if(response !== null) {
            response.forEach((e) => {
                let phase = new Phase(packetObject, e['UID'], e['type'], e['suspense'], e['comments'], e['dateCompleted'], e['stepNumber'], e['FK_users_UID_stakeholder']);
                storage.push(phase);
            });
        }

        return storage;
    }

    // Returns a User object associated with the database UID
    getUser(dbUid) {
        let response = this.app.api.getUserById(dbUid);

        let uid = response[0]['UID'];
        let first = response[0]['firstName'];
        let last = response[0]['lastName'];
        let grade = response[0]['grade'];
        let org = response[0]['organization'];

        return new User(this.app, uid, first, last, grade, org);
    }
}