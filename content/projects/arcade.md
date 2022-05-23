---
title: Classic Arcade
description: Recreated some classic games to learn more about Svelte's state management.
media: https://res.cloudinary.com/bmoyni3/video/upload/v1651619380/projects/videos/snake-sequence_tol9bz.mp4
links: {
	github: "https://github.com/itBme3/svelte-arcade",
	live: "https://github.com/itBme3/svelte-arcade"
}
sections: [
    { 
        title: "Rainbow Snake",
        text: "The game that made dumb phones worth having. Added a bit of flare by colors as snake grows — scaling color spectrum accomplished w/ chroma-js.",
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1651619380/projects/videos/snake-sequence_tol9bz.mp4",
        ]
    },
    { 
        title: "Connect The Dots",
        text: "This game was most intensive state mapping — pleasantly surprised w/ Svelte's store.",
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1651619204/projects/videos/connect-dots-sequence_igsb96.mp4",
        ]
    },
    { 
        title: "Tic Tac Toe",
        text: "Tossed this one in because 3 is beautiful number.",
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1651619204/projects/videos/connect-dots-sequence_igsb96.mp4",
        ]
    }
]
technologies: 
    - svelte
    - js
    - scss
---
<project-sections :project="{ sections, technologies, title, description }"></project-sections>
