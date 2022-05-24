---
title: Nostalgia Arcade
description: Recreated some classic games to learn more about Svelte's state management.
order: 2
media: https://res.cloudinary.com/bmoyni3/video/upload/v1653316727/projects/videos/arcade-snake_q8zq2d.mp4
links: {
	github: "https://github.com/itBme3/svelte-arcade",
	live: "https://nostalgia-arcade.netlify.com"
}
sections: [
    { 
        title: "Rainbow Snake",
        text: '<a target="_blank" href="https://nostalgia-arcade.netlify.com/snake" class="button">Play Rainbow Snake</a>',
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1653316727/projects/videos/arcade-snake_q8zq2d.mp4",
        ]
    },
    { 
        title: "Boxes & Dots",
        text: '<a target="_blank" href="https://nostalgia-arcade.netlify.com/boxes-dots" class="button">Play Boxes & Dots</a>',
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1653319233/projects/videos/boxes-dots-sequence_iqeigo.mp4",
        ]
    },
    { 
        title: "Tic Tac Toe",
        text: '<a target="_blank" href="https://nostalgia-arcade.netlify.com/tic-tac-toe" class="button">Play Tic Tac Toe</a>',
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1653316726/projects/videos/arcade-tic-tac-toe_th2zc2.mp4",
        ]
    }
]
technologies: 
    - svelte
    - js
    - html
    - scss
    - vite
---
<project-sections :project="{ sections, technologies, title, description }"></project-sections>
