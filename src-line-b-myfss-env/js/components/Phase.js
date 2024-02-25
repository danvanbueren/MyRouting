class Phase {
    constructor(packetObject, phaseUid, phaseType, phaseSuspense, phaseComments, phaseDateCompleted, phaseStepNumber, fkeyUserUidStakeholder) {
        this.parentPacket = packetObject;
        this.app = packetObject.app;

        this.uid = phaseUid;
        this.type = phaseType;
        this.suspense = phaseSuspense;
        this.comments = phaseComments;
        this.dateCompleted = phaseDateCompleted;
        this.stepNumber = phaseStepNumber;
        this.fkeyUserUidStakeholder = fkeyUserUidStakeholder;

        this.files = new Files(this.uid);
    }
}