class ClientApiDriver {
    constructor(app) {
        this.app = app;
    }

    getUsers() {
        let url = 'http://localhost/api/get.php?switch=users';
        return this.request(url);
    }

    getUserById(id) {
        let url = 'http://localhost/api/get.php?switch=users&id=' + id;
        return this.request(url);
    }

    getFiles() {
        let url = 'http://localhost/api/get.php?switch=files';
        return this.request(url);
    }

    getFileById(id) {
        let url = 'http://localhost/api/get.php?switch=files&id=' + id;
        return this.request(url);
    }

    getPackets() {
        let url = 'http://localhost/api/get.php?switch=packets';
        return this.request(url);
    }

    getPacketById(id) {
        let url = 'http://localhost/api/get.php?switch=packets&id=' + id;
        return this.request(url);
    }

    getPhases() {
        let url = 'http://localhost/api/get.php?switch=phases';
        return this.request(url);
    }

    getPhaseById(id) {
        let url = 'http://localhost/api/get.php?switch=phases&id=' + id;
        return this.request(url);
    }

    request(url) {
        const request = new XMLHttpRequest();
        request.open("GET", url, false);
        request.send(null);

        if (request.status !== 200)
            return null;

        let responseText = request.responseText;

        return JSON.parse(responseText);
    }
}