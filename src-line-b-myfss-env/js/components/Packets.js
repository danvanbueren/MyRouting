class Packets {
    constructor(app) {
        this.app = app;

        this.storage = [];
        this.getPackets();

        this.updateView();
    }

    addPacket(newPacket) {
        this.storage.push(newPacket);
    }

    // Use this to reset the whole array with fresh data
    getPackets() {
        this.storage = [];

        let response = this.app.api.getPackets();

        response.forEach((e) => {
            let p = new Packet(this.app, e['UID'], e['name'], e['type'], e['FK_users_UID'], e['comments']);
            this.storage.push(p);
        });
    }

    updateView() {
        let html = this.getTableView(null);

        let pendingActionTable = document.getElementById('element_table_pending');
        let submittedToAfpcTable = document.getElementById('element_table_afpc');
        let awaitingSignatureTable = document.getElementById('element_table_signature');
        let recentlyCompletedTable = document.getElementById('element_table_completed');

        pendingActionTable.innerHTML = html;
        submittedToAfpcTable.innerHTML = html;
        awaitingSignatureTable.innerHTML = html;
        recentlyCompletedTable.innerHTML = html;
    }

    getTableView(filter) {
        let output = '';

        // TODO: add capability to discern packet types with filters (switch?)

        if (this.storage.length < 1) {
            return '' +
                '<div class="col-auto p-0 m-0">' +
                '<span class="material-symbols-outlined" style="font-size: 2.5rem;">info</span>' +
                '</div>' +
                '<div class="col">' +
                '<h6>No Items Pending</h6>' +
                '<span>There are currently no pending items.</span>' +
                '</div>';
        } else {
            output = '' +
                '<table class="table table-striped">' +
                '<thead>' +
                '<tr>' +
                '<th scope="col" style="width: 25%">Recipient</th>' +
                '<th scope="col" style="width: 25%">Type</th>' +
                '<th scope="col" style="width: 25%">Status</th>' +
                '<th scope="col" style="width: 25%">Actions</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            this.storage.forEach((packet) => {
                output += '' +
                    '<tr>' +
                    '<td>' + packet.packetOwner.getFormalName() + '</td>' +
                    '<td>' + packet.getPacketType() + '</td>' +
                    '<td>' + packet.getPacketStatus() + '</td>' +
                    '<td>' +
                    '<button type="button" class="btn btn-secondary rounded-0">View</button>' +
                    '<button type="button" class="btn btn-secondary rounded-0">Reassign</button>' +
                    '</td>' +
                    '</tr>';
            });

            output += '</tbody></table>';
        }
        return output;
    }
}