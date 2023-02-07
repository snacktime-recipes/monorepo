interface HeaderLink {
    title: string,
    href: string,
};

export const HeaderLinks: Array<HeaderLink> = [
    {
        title: 'Home',
        href: '/'
    },
    {
        title: 'Recipes',
        href: '/recipes'
    }
];

export default HeaderLinks;