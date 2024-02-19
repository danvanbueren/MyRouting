class MyRouting {
    constructor() {
        this.userId = '';
        this.isSuperuser = false;
        this.api = new ClientApiDriver(this);
        this.packets = new Packets(this);
    }

    setUserIdForSession(userId) {
        this.userId = userId;
    }

    setSuperuser() {
        this.isSuperuser = true;
    }
}

