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
        title: 'Products',
        href: '/products'
    },
    {
        title: 'Recipes',
        href: '/recipes'
    }
];

export default HeaderLinks;