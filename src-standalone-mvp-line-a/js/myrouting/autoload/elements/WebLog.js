class WebLog {
    constructor() {
        this.init();

        this.messages = [];
        this.hidden = false;
        this.toggleHidden();
    }

    log(message) {
        this.add(message, '');
    }

    warn(message) {
        this.add(message, 'text-warning');
    }

    error(message) {
        this.add(message, 'text-danger');
    }

    success(message) {
        this.add(message, 'text-success');
    }

    primary(message) {
        this.add(message, 'text-primary');
    }

    add(message, classes) {
        let fTime = new Date().toLocaleTimeString('en-GB');
        let fMessage = '<strong>[' + fTime + ']</strong> ' + message;
        this.messages.push("<span class='" + classes + "'>" + fMessage + "</span><br>");
        this.updateConsole();
    }

    updateConsole() {
        let weblogContent = document.getElementById('weblog-content');

        let output = '';
        this.messages.forEach((item, index, arr) => {
            output += this.messages[index];
        });
        weblogContent.innerHTML = output;

        if (this.hidden) {
            this.toggleHidden();
        }
    }

    toggleHidden() {
        let weblogBody = document.getElementById('weblog-body');
        let weblogHideBtn = document.getElementById('weblog-hide');

        this.hidden = !this.hidden;
        weblogBody.hidden = this.hidden;

        if (this.hidden) {
            weblogHideBtn.innerText = 'Show';
        } else {
            weblogHideBtn.innerText = 'Hide';
        }
    }

    init() {
        let weblogParent = document.getElementById('weblog');
        weblogParent.innerHTML = '' +
            '<div class="position-absolute bottom-0 start-0 p-3">' +
            '<div class="card" style="width: 18.75rem">' +
            '<div class="card-header d-flex justify-content-between">' +
            '<h6 class="card-subtitle pt-1 text-body-secondary align-self-center">WEBLOG</h6>' +
            '<button type="button" class="btn btn-secondary btn-sm float-end align-self-center" id="weblog-hide" onclick="log.toggleHidden();">Hide</button>' +
            '</div>' +
            '<div class="card-body overflow-y-scroll" style="height: 6rem;" id="weblog-body">' +
            '<p class="font-monospace p-0" id="weblog-content">' +
            '</p>' +
            '</div>' +
            '</div>' +
            '</div>';
    }
}