# JustJot (frontend)

A minimalist keyboard-first note-taking Progressive Web App, tailored for fast operations.

Backend repository [here](https://github.com/JunoNgx/justjot-backend).

## Current deployment

The application is currently deployed at [justjot.app](https://justjot.app/) via Vercel.

## Tech stack

The project is powered by [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/).

Additionally, it also uses the [Mantine components library](https://mantine.dev/) and [Sass](https://sass-lang.com/).

## Running locally

```
yarn
yarn dev
```

### Environment variable

This application requires the variable `VITE_BACKEND_URL`, which is an url pointing to an appropriate PocketBase instance.

## Feature roadmap
* Unit tests and end-to-end tests.
* Export user data to JSON format.
* Offline operations.
* Syntax highlighting and advanced keybindings with Monaco Editor.

## Contribution
For bug reporting, issues, and design suggestions, please open new issues.

Due to the highly personal nature of this, I am selective about what to be developed and merged into production. Please discuss with me prior to investing non-trivial efforts.