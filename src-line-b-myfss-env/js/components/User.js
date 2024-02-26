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

    getMediumRank() {
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
                return '2d Lt';
            case 'O-2':
                return '1st Lt';
            case 'O-3':
                return 'Capt';
            case 'O-4':
                return 'Maj';
            case 'O-5':
                return 'Lt Col';
            case 'O-6':
                return 'Col';
            case 'O-7':
                return 'Brig Gen';
            case 'O-8':
                return 'Maj Gen';
            case 'O-9':
                return 'Lt Gen';
            case 'O-10':
                return 'Gen';
        }
    }

    getLongRank() {
        switch (this.grade) {
            case 'E-1':
                return 'Airman Basic';
            case 'E-2':
                return 'Airman';
            case 'E-3':
                return 'Airman First Class';
            case 'E-4':
                return 'Senior Airman';
            case 'E-5':
                return 'Staff Sergeant';
            case 'E-6':
                return 'Technical Sergeant';
            case 'E-7':
                return 'Master Sergeant';
            case 'E-8':
                return 'Senior Master Sergeant';
            case 'E-9':
                return 'Chief Master Sergeant';
            case 'O-1':
                return 'Second Lieutenant';
            case 'O-2':
                return 'First Lieutenant';
            case 'O-3':
                return 'Captain';
            case 'O-4':
                return 'Major';
            case 'O-5':
                return 'Lieutenant Colonel';
            case 'O-6':
                return 'Colonel';
            case 'O-7':
                return 'Brigadier General';
            case 'O-8':
                return 'Major General';
            case 'O-9':
                return 'Lieutenant General';
            case 'O-10':
                return 'General';
        }
    }

    getFormalName() {
        return this.getLongRank() + ' ' + this.firstName + ' ' + this.lastName;
    }

    getShortFormalName() {
        return this.getMediumRank() + ' ' + this.lastName;
    }
}