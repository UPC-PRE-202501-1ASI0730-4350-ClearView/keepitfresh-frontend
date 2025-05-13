class Profile {

    constructor(profile = {}) {
        this.userId = profile.userId || 0;
        this.profileId = profile.profileId || 0;
        this.fullName = profile.fullName || '';
        this.phone = profile.phone || '';
    }
}

export default Profile;