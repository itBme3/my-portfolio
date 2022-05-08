---
title: Classic Arcade
description: Remade some games from childhood to learn more about Svelte.
sections: [
    { 
        title: "Rainbow Snake",
        text: "The only reason I wanted a phone as a child, was to play this game... this version is a little prettier to look at.",
        media: [
            "https://res.cloudinary.com/bmoyni3/video/upload/v1651619380/projects/videos/snake-sequence_tol9bz.mp4",
        ]
    },
    { 
        title: "Connect The Dots",
        text: "Spent a lot of time in high school drawing out the little dot grids... this version is much less painful to start again.",
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
