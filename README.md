## About

This is a webapp made with SvelteKit and OOP that helps you keep tracks of you generative AI prompts. You can see a of all your
prompts and add and delete from the table to your heart's content. Unfortunately, you cannot upload any actual files as
that would be too costly to maintain. As there is no backend due to being out of scope for this homework assignment,
all the data is stored in the browser's localStorage API which is not reliable for long term storage as it can be
overwritten very easily.

## Screenshots

![Screenshot 2025-01-23 190326](https://github.com/user-attachments/assets/4916710a-1def-492c-b1e4-11a31f518edc)
![Screenshot 2025-01-23 190359](https://github.com/user-attachments/assets/402b6fac-aa9d-464e-a66e-c22dfac55acf)
![Screenshot 2025-01-23 190341](https://github.com/user-attachments/assets/ff28d940-7a2c-4c75-b718-fec456aa7bcd)
![Screenshot 2025-01-23 190409](https://github.com/user-attachments/assets/0c9248bc-ae96-4bf2-815f-d8692e576e0d)

## Setup

1. Clone Repo

2. Make sure you are using Node 22.

3. Run `npm i -g pnpm@latest-10` to install pnpm.

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
