class User {
    // create a user from the associated packet
    constructor(app, uid, firstName, lastName, grade, organization) {
        this.app = app;

        this.uid = uid;
        this.firstName = firstName;
        this.lastName = lastName;
        this.grade = grade;
        this.organization = organization;
    }

    getShortRank() {
        switch (this.grade) {
            case 'E-1':
                return 'AB';
            case 'E-2':
                return 'Amn';
            case 'E-3':
                return 'A1C';
            case 'E-4':
                return 'SrA';
            case 'E-5':
                return 'SSgt';
            case 'E-6':
                return 'TSgt';
            case 'E-7':
                return 'MSgt';
            case 'E-8':
                return 'SMSgt';
            case 'E-9':
                return 'CMSgt';
            case 'O-1':
                return '2Lt';
            case 'O-2':
                return '1Lt';
            case 'O-3':
                return 'Capt';
            case 'O-4':
                return 'Maj';
            case 'O-5':
                return 'LtC';
            case 'O-6':
                return 'Col';
            case 'O-7':
                return 'BrigGen';
            case 'O-8':
                return 'MajGen';
            case 'O-9':
                return 'LtGen';
            case 'O-10':
                return 'Gen';
        }
    }

    getFormalName() {
        return this.getShortRank() + ' ' + this.firstName + ' ' + this.lastName;
    }
}