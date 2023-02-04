// Imports
import CodiconSignIn from '~icons/codicon/sign-in';

export interface HeaderButton {
    text: string,
    type: 'ghost' | 'full',
    icon?: any,
    href: string,
    displayOnMobile?: boolean,
};

export const HeaderButtons: Array<HeaderButton> = [
    {
        text: 'Signup',
        type: 'ghost',
        href: '/register',
        
        displayOnMobile: false,
    },
    {
        text: 'Login',
        type: 'full',
        icon: CodiconSignIn,
        href: '/login',
    }
];
export default HeaderButtons;