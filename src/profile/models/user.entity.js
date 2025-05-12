class User {

    constructor(user = {}) {
        this.userId = user.userId || 0;
        this.phone = user.phone || '';
        this.email = user.email || '';
        this.password = user.password || '';
        this.confirmPassword = user.confirmPassword || '';
        this.fullName = user.fullName || '';
    }
}

export default User;