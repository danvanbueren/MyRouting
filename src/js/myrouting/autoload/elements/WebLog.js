let weblogContent = document.getElementById('weblog-content');
let weblogHideBtn = document.getElementById('weblog-hide');
let weblogBody = document.getElementById('weblog-body');

class WebLog {
    constructor() {
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
        this.hidden = !this.hidden;
        weblogBody.hidden = this.hidden;

        if (this.hidden) {
            weblogHideBtn.innerText = 'Show';
        } else {
            weblogHideBtn.innerText = 'Hide';
        }
    }
}

weblogHideBtn.addEventListener("click", () => {
    log.toggleHidden();
});