const cringeLogos = [
    "https://cdn3.emoji.gg/emojis/4142-head-pat.png",
    "https://cdn3.emoji.gg/emojis/7243-wtf.png",
    "https://cdn3.emoji.gg/emojis/6269-lmao.png",
    "https://cdn3.emoji.gg/emojis/6728-sunglas.png",
    "https://cdn3.emoji.gg/emojis/5806-clown-trophy.png",
    "https://cdn3.emoji.gg/emojis/2665-cute-gun.png",
    "https://cdn3.emoji.gg/emojis/8314-lip-bite.png",
    "https://cdn3.emoji.gg/emojis/8655-whatthehellphone.png",
    "https://cdn3.emoji.gg/emojis/3796-moyai-the-rock.png",
    "https://cdn3.emoji.gg/emojis/9378-fuckboi.png",
    "https://cdn3.emoji.gg/emojis/4373-amongus-dancing.gif"
];

export const ApplicationConfig = {
    // Backend information
    apiUrl: "http://localhost:5173/api",

    // Theme information
    theme: {
        // todo
        // make normal logo
        logo: cringeLogos[Math.floor(Math.random() * cringeLogos.length)],
    }
};