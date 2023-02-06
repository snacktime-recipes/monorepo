import LogosGoogleIcon from '~icons/logos/google-icon';
import LogosTwitter from '~icons/logos/twitter';
import LogosDiscordIcon from '~icons/logos/discord-icon';
import LogosFacebook from '~icons/logos/facebook';
import { ApplicationConfig } from './ApplicationConfig.const';

interface SocialAuthEntry {
    title: string,
    icon: any,
    href: string,
};

export const SocialAuth: Array<SocialAuthEntry> = [
    {
        title: "Google",
        icon: LogosGoogleIcon,
        href: `${ApplicationConfig.apiUrl}/social/google`,
    },
    {
        title: "Facebook",
        icon: LogosFacebook,
        href: `${ApplicationConfig.apiUrl}/social/facebook`,
    },
    {
        title: "Twitter",
        icon: LogosTwitter,
        href: `${ApplicationConfig.apiUrl}/social/twitter`,
    },
    {
        title: "Discord",
        icon: LogosDiscordIcon,
        href: `${ApplicationConfig.apiUrl}/social/discord`,
    },
];