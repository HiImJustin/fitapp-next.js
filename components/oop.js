class Admin {
    constructor(email, name, admin) {
        this.email = email;
        this.name = name;
        this.admin = admin;
    }
    getEmail() {
        return this.email;
    }
    getName() {
        return this.name;
    }
    getIsAdmin() {
        return this.admin;
    }
}
export { Admin };
