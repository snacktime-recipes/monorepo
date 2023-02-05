import { writable } from "svelte/store";
import { ApplicationConfig } from "../configs/ApplicationConfig.const";

// Store interface
export interface AuthorizedProfile {
    isLoaded: boolean,
    isAuthorized: true
    
    username: string,
    email: string,
};

export interface UnauthorizedProfile {
    isLoaded: boolean,
    isAuthorized: false
};

export type ProfileStore = AuthorizedProfile | UnauthorizedProfile;

class StoreClass {
    public readonly subscribe;
    private readonly _update;
    
    constructor() {
        const { subscribe, update } = writable<ProfileStore>({
            isLoaded: false,
            isAuthorized: false,
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Methods
    async initialize() {
        // Trying to fetch user profile from backend session
        const response = await fetch(`${ApplicationConfig.apiUrl}/profile`, { credentials: 'include' });
        
        if (response.status == 200) {
            const json = await response.json();
            this._updateProfile(json);
        };

        this._update((object) => {
            return {
                ...object,
                isLoaded: true,
            };
        });
    };

    async login(email: string, password: string): Promise<boolean> {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Accept', '*/*');
        
        const response = await fetch(`${ApplicationConfig.apiUrl}/profile/login`, {
            method: 'POST',
            credentials: 'include',
            headers,
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.status == 200) {
            const json = await response.json();
            this._updateProfile(json);

            return true;
        } else {
            // Handling this error
            return false;
        };
    };

    async logout(): Promise<boolean> {
        // 
        const response = await fetch(`${ApplicationConfig.apiUrl}/profile/logout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (response.status == 200) {
            // Updating store
            this._update(() => {
                return {
                    isLoaded: true,
                    isAuthorized: false,
                };
            });

            return true;
        } else {
            return false;
        };
    };

    _updateProfile(profile: any) {
        this._update((object) => {
            return {
                ...object,
                
                isLoaded: true,
                isAuthorized: true,

                email: profile.email,
                username: profile.userName ?? "unknown"
            };
        });
    };
};

export const Profile = new StoreClass();
export default Profile;