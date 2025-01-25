# [Generative AI Prompt Manager](https://ari-s-123.github.io/PDP-HW1)

## About

This is a webapp made with SvelteKit and OOP that helps you keep tracks of you generative AI prompts. You can see a of
all your
prompts and add and delete from the table to your heart's content. Unfortunately, you cannot upload any actual files as
that would be too costly to maintain. As there is no backend due to being out of scope for this homework assignment,
all the data is stored in the browser's localStorage API which is not reliable for long term storage as it can be
overwritten very easily.

### Creative Addition for Rubric

The [PromptStorageService](https://github.com/Ari-S-123/PDP-HW1/blob/main/src/solution/classes/PromptStorageService.ts)
class is the "creative addition" for the rubric. It implements the duties of a prompt manager using the localStorage
API. I didn't write the tests for this class because I would have to mock the localStorage API.

### Generative AI Usage

I used GitHub Copilot to generate some repetitive unit tests. They are marked with a comment above them in each test
file in src/tests/solution/.

## TODO

- [x] Update IPromptManager and all its users to include a text search on the inputted prompt on getFilteredPrompts.
- [x] Implement a search bar in the UI to filter prompts by text on all fields.

## UML Diagram

![UML Diagram](https://github.com/user-attachments/assets/d2caadb0-3bef-4059-ba6d-8eaef22bfaf8)

## Screenshots

![Screenshot 2025-01-25 124814](https://github.com/user-attachments/assets/b1006a7a-2fba-4b18-be21-276fec6a4869)
![Screenshot 2025-01-25 124830](https://github.com/user-attachments/assets/c41eb796-e5c5-44da-80f0-05af9f5c2a24)
![Screenshot 2025-01-25 125448](https://github.com/user-attachments/assets/31e3750a-78a7-4cb6-bd44-bfca753dd078)
![Screenshot 2025-01-25 125503](https://github.com/user-attachments/assets/f8d6072a-9592-4849-83ae-88132c723c41)
![Screenshot 2025-01-25 125520](https://github.com/user-attachments/assets/61045ea6-437b-481d-ba9c-e450e10732c5)
![Screenshot 2025-01-25 125544](https://github.com/user-attachments/assets/048108b6-d8cb-4651-b3ba-4a3739240329)

## Setup

1. Clone Repo

2. Make sure you are using the latest Node LTS version at the time of the last commit [v22.x].

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
