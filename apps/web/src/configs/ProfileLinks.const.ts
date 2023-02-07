// Icons
import CodiconSymbolField from '~icons/codicon/symbol-field';
import CodiconSettingsGear from '~icons/codicon/settings-gear';
import CodiconHeartFilled from '~icons/codicon/heart-filled';
import CodiconHistory from '~icons/codicon/history';
import CodiconBookmark from '~icons/codicon/bookmark'
import CodiconSignOut from '~icons/codicon/sign-out';
import Profile from '../stores/Profile.store';

// ProfileLink
interface ProfileLink {
    icon: any,
    title: string,
    subtitle?: string,
    gradient?: {
        from: string,
        to: string,
    },
    matches?: RegExp,
    background?: string,
    action?: CallableFunction,
    href?: string,
    isDesktopOnly?: boolean,
};

export const ProfileLinks: Array<ProfileLink> = [
    {
        icon: CodiconSymbolField,
        title: "My Products",
        subtitle: "Ingredients that you have",
        gradient: {
            from: "#2dd4bf",
            to: "#0891b2"
        },
        matches: /profile\/products/,
        href: '/profile/products',
    },
    {
        icon: CodiconBookmark,
        title: "Bookmarks",
        subtitle: "Recipes that've picked your interest",
        gradient: {
            from: "#fbbf24",
            to: "#eab308"
        },
        matches: /profile\/bookmarks/,
        href: '/profile/bookmarks',
    },
    // {
    //     icon: CodiconHistory,
    //     title: "Viewed Recently",
    //     subtitle: "Things you've seen recently",
    //     gradient: {
    //         from: "#06b6d4",
    //         to: "#0284c7"
    //     },
    //     matches: /profile\/history/,
    //     href: '/profile/history',
    // },
    {
        icon: CodiconHeartFilled,
        title: "Liked",
        subtitle: "Everything you've liked",
        gradient: {
            from: "#ef4444",
            to: "#ea580c"
        },
        matches: /profile\/liked/,
        href: '/profile/liked',
    },
    // {
    //     icon: CodiconSettingsGear,
    //     title: "Settings",
    //     subtitle: "Profile avatar, username and much more",
    //     gradient: {
    //         from: "#6d28d9",
    //         to: "#a21caf"
    //     },
    //     matches: /profile\/settings/,
    //     href: '/profile/settings',
    // },
    {
        icon: CodiconSignOut,
        title: "Logout",
        background: "#e11d48",
        action: () => {
            Profile.logout();
        },
        isDesktopOnly: true
    }
];
export default ProfileLinks;