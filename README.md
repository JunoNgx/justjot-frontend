# JustJot (frontend)

A minimalist keyboard-first note-taking Progressive Web App, tailored for fast operations.

Backend repository [here](https://github.com/JunoNgx/justjot-backend).

## Current deployment

The application is currently deployed at [justjot.app](https://justjot.app/) via Vercel.

## Tech stack

The project is powered by [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/) and [Vite](https://vitejs.dev/).

## UI Library

The project is mainly driven by [Mantine components library](https://mantine.dev/) and [Sass](https://sass-lang.com/), with dropdown menu and context menu cherry picked from [Radix Primitives](https://www.radix-ui.com/primitives), which are well-known for being incredibly feature-rich. Native HTML elements are used when possible to minimise dependency on Mantine.

The current state of the codebase is the outcome of attempts to take ownership of CSS without excessively re-inventing the wheel.

## CSS

The project's CSS uses [BEM convention](https://getbem.com/naming/) for elements' classnames.

Additionally, an experiment was performed to use `PascalCase` for classnames, instead of the more conventional `kebab-case`. The following block is an example for a typical classname:

```
.CollectionMenuDropdown__Item--IsSelected
```

This convention has improved (subjective) readability without any encountered issue. This remains in the codebase as of time of writing.

## Running locally

```
yarn
yarn dev
```

## Tests

Run `yarn test` and `yarn intg-test` for unit tests (powered by [Vitest](https://vitest.dev/)) and integration tests (powered by [Playwright](https://playwright.dev/)), respectively.

Unit test passes are required for `yarn build` and deployment.

Playwright tests are performed separately with each push to the `main` branch as a GitHub Actions workflow.

### Environment variable

This application requires the variable `VITE_BACKEND_URL`, which is an url pointing to an appropriate PocketBase instance.

## Feature roadmap
* Export user data to JSON format.
* Offline operations.
* Syntax highlighting and advanced keybindings with Monaco Editor.

## Contribution
For bug reporting, issues, and design suggestions, please open new issues.

Due to the highly personal nature of this, I am selective about what to be developed and merged into production. Please discuss with me prior to investing non-trivial efforts.