class Phase {
    constructor(app, packetUid) {
        this.app = app;

        this.phaseUid = '';
        this.parentPacketUid = packetUid;
        this.phaseType = '';
        this.phaseSuspense = '';
        this.phaseComments = '';
        this.files = new Files(this.phaseUid);
    }
}