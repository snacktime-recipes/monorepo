import CodiconSymbolField from '~icons/codicon/symbol-field';
import CodiconSettingsGear from '~icons/codicon/settings-gear';
import CodiconHeartFilled from '~icons/codicon/heart-filled';
import CodiconHistory from '~icons/codicon/history';
import CodiconBookmark from '~icons/codicon/bookmark'

interface ProfileSection {
    icon: any,
    title: string,
    description: string,
    matches: RegExp,
    gradient?: {
        from: string,
        to: string,
    },
    href: string,
};

export const ProfileSections: Array<ProfileSection> = [
    {
        icon: CodiconSymbolField,
        title: "Products",
        description: "Ingredients that you have",
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
        description: "Recipes that've picked your interest",
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
    //     description: "Things you've seen recently",
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
        description: "Everything you've liked",
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
    //     description: "Profile avatar, username and much more",
    //     gradient: {
    //         from: "#6d28d9",
    //         to: "#a21caf"
    //     },
    //     matches: /profile\/settings/
    // }
];