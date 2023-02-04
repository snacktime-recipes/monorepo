import { writable } from "svelte/store";

// Store interface
interface AuthorizedProfile {
    isAuthorized: true
    
    username: string,
    email: string,
};

interface UnauthorizedProfile {
    isAuthorized: false
};

export type ProfileStore = AuthorizedProfile | UnauthorizedProfile;

class StoreClass {
    public readonly subscribe;
    private readonly _update;
    
    constructor() {
        const { subscribe, update } = writable<ProfileStore>({
            isAuthorized: false,
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Methods
};

export const Profile = new StoreClass();
export default Profile;