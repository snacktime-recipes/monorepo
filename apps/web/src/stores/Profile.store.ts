import { writable } from "svelte/store";

// Store interface
interface AuthorizedProfile {
    isAuthorized: true

    // todo: profile and token information
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
            isAuthorized: true,
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Methods
};

export const Profile = new StoreClass();
export default Profile;