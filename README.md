## About

This is a webapp made with SvelteKit that helps you keep tracks of you generative AI prompts. You can see a of all your
prompts and add and delete from the table to your heart's content. Unfortunately, you cannot upload any actual files as
that would be too costly to host. As there is no backend due to being out of scope for this project,
all data is stored in the browser's localStorage API which is not reliable for long term storage as it can be
overwritten very easily.

## Screenshots

## Setup

1. Clone Repo

2. Make sure you are using Node 22.

3. Run `npm i -g pnpm` to install pnpm.

4. Run `pnpm i` to install the dependencies.

## Building

To create a production version of the app:

1. Run `pnpm build` to create an optimized production build of the app.

2. You can preview the production build with `pnpm preview -- open` and open the app in a new browser tab.

## Developing

1. Run `pnpm dev --open` to start the development server and open the app in a new browser tab.

## Testing

1. Run `pnpm t` to run the unit tests.

## Linting

1. Run `pnpm lint` to run prettier and eslint.

2. Run `pnpm format` to format with prettier.
