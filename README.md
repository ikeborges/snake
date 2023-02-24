# Snake

A JavaScript implementation of the snake game, inspired by the classic game. You can find the live version at https://snake-amber.vercel.app

Tools used: Vite, Vitest, TypeScript.

# Motivation

I've always been interested in how interactive web apps like Figma work which made me go after learning about canvas – I even worked at a company with such type of software, but I wanted to create everything from scracth and see what lies "behind the scenes". I also used this project (and failed at it) as an opportunity to develop using TDD.

# Learnings

- Game development is very different from web development
  - Global state is hard to deal with, and somewhat necessary for the game to work
  - Known design patterns don't solve a lot of problems in the gamedev domain, this level of high-coupling is needed for the game parts to interact with each other, despite me doing my best to fight that.
- It's very _very_ hard to write TDD high-coupling software, and overral testing in general.
- Vite and Vitest are awesome tools, I'll for sure use more of it in a more suitable project.
