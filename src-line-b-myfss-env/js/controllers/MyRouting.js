class MyRouting {
    constructor() {
        this.userId = '';
        this.isSuperuser = false;
        this.util = new Utilities(this);
        this.api = new ClientApiDriver(this);
        this.packets = new Packets(this);
        this.views = new Views(this);

        this.packets.updateAdminView();
    }

    setUserIdForSession(userId) {
        this.userId = userId;
    }

    setSuperuser() {
        this.isSuperuser = true;
    }
}

