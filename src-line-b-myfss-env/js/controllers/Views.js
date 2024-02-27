class Views {
    constructor(app) {
        this.app = app;
    }

    updateViewPacketModal(packetUid) {
        let packet = this.app.util.getPacket(packetUid);

        let modalContentElement = document.getElementById('view-packet-modal-content');

        let allPhasesHtml = '';

        for (let phase of packet.phases.storage) {
            let phaseHtml = '';
            phaseHtml += '' +
                '<div class="card m-2"><div class="card-body">' +
                '<p class="card-text">Phase stepNumber: ' + phase.stepNumber + '</p>' +
                '<p class="card-text">Phase type: ' + phase.type + '</p>' +
                '<p class="card-text">Phase suspense: ' + phase.suspense + '</p>' +
                '<p class="card-text">Phase comments: ' + phase.comments + '</p>' +
                '<p class="card-text">Phase dateCompleted: ' + phase.dateCompleted + '</p>' +
                '<p class="card-text">Phase fkeyUserUidStakeholder: ' + phase.fkeyUserUidStakeholder + '</p>' +
                '<p class="card-text">Phase files: ' + phase.files + '</p>' +
                '</div></div>';

            allPhasesHtml += phaseHtml;
        }

        if (allPhasesHtml === '')
            allPhasesHtml = '<span class="badge text-bg-light fst-italic">This packet doesn\'t have any phases yet. Add one to get started!</span>';

        modalContentElement.innerHTML = '' +
            '<div class="modal-header">' +
            '<h1 class="modal-title fs-5" id="modal-title-1">' + packet.type + ' Packet</h1>' +
            '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '</div>' +
            '<div class="modal-body">' +
            '<p class="fst-italic">Packet Subject: ' + packet.packetOwner.getFormalName() + '</p>' +
            '<h5>Phases</h5>' +
            allPhasesHtml +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>' +
            '<button type="button" class="btn btn-primary" disabled>Save</button>' +
            '</div>';
    }

    updateViewAddPacketModal() {
        let membersHtml = '';

        let users = this.app.util.getUsers();

        users.sort((a, b) => {
            return a.lastName.localeCompare(b.lastName);
        });

        users.forEach((e, i) => {
            membersHtml += '' +
                '<tr><th scope="row"><div class="form-check"><label for="rr1"></label>' +
                '<input class="form-check-input" type="radio" value="' + e.uid + '" name="gg1" id="rr1">' +
                '</div></th>' +
                '<td>' + e.getMediumRank() + '</td>' +
                '<td>' + e.lastName + ', ' + e.firstName + '</td>' +
                '<td>' + e.organization + '</td></tr>';
        });

        document.getElementById('add-packet-modal-member-table').innerHTML = '' +
            '<table class="table table-striped">' +
            '<thead><tr><th scope="col">Select</th><th scope="col">Rank</th><th scope="col">Name</th><th scope="col">Organization</th></tr></thead>' +
            '<tbody>' +
            membersHtml +
            '</tbody>' +
            '</table>';
    }

}







