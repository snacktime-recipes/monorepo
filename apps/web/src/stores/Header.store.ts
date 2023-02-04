import { writable } from "svelte/store";
import type { HeaderButton } from "../configs/HeaderButtons.const";
import HeaderButtons from "../configs/HeaderButtons.const";

export interface HeaderStore {
    buttons: Array<HeaderButton>
};

class StoreClass {
    public readonly subscribe;
    private readonly _update;

    constructor() {
        const { subscribe, update } = writable<HeaderStore>({
            buttons: HeaderButtons,
        });

        this.subscribe = subscribe;
        this._update = update;
    };

    // Methods
    public resetButtons() {
        this._update((object) => {
            return {
                ...object,
                buttons: HeaderButtons
            };
        });
    };

    public updateButtons(buttons: Array<HeaderButton>) {
        this._update((object) => {
            return {
                ...object,
                buttons,
            };
        });
    };
};

export const Header = new StoreClass();
export default Header;