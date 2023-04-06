<div align="center">
<img src="https://chess.fitness/logo.svg" width=25% height=25% />
<h1>Chess Fitness</h1>
<h3><em>Train Chess Openings with your own AI Coach</em></h3>
<p>
<img src="https://img.shields.io/github/contributors/Vincenius/chess-fitness?style=plastic" alt="Contributors">
<img src="https://img.shields.io/github/forks/Vincenius/chess-fitness" alt="Forks">
<img src="https://img.shields.io/github/stars/Vincenius/chess-fitness" alt="Stars">
<img src="https://img.shields.io/github/issues/Vincenius/chess-fitness" alt="Issues">
<img src="https://img.shields.io/github/languages/count/Vincenius/chess-fitness" alt="Languages">
<img src="https://img.shields.io/github/repo-size/Vincenius/chess-fitness" alt="Repository Size">
</p>
</div>

## About
+ Chess Fitness is a fee & open-source web application based on GPT-4. It generates lessons to get a basic understanding of chess openings.
+ I plan to add more features in the future. Feel free to leave ideas and feedback in the GitHub issues.

## Link
You can find the project at [chess.fitness](https://chess.fitness)

## app directory
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-brightgreen)](https://nextjs.org/)

This is a Next.js application that handles the frontend and the public API.

### Steps to run it locally
1. Clone the repository to your local machine <br>
   `git clone https://github.com/Vincenius/chess-fitness.git`
2. Navigate to the app directory <br>
   `cd chess-fitness/app`
3. Install the necessary dependencies <br>
   `npm install`
4. Setup a MongoDB database with one collection: `openings`
5. copy the `.env.dist` file to `.env.local` and set environment variables as described in the file
6. Start the local development server <br>
   `npm run dev`
7. Open your browser to http://localhost:3000
8. Uncomment the `/api/import` file and call it to initialize the database

## server directory

This is a NodeJS server that handles the ChatGPT API calls.

### Steps to run it locally
1. Clone the repository to your local machine <br>
   `git clone https://github.com/Vincenius/chess-fitness.git`
2. Navigate to the app directory <br>
   `cd chess-fitness/server`
3. Install the necessary dependencies <br>
   `npm install`
4. copy the `.env.dist` file to `.env.local` and set environment variables as described in the file
5. Start the local development server <br>
   `node index.js`


## Next TODOs

- ai query loading time improvements
- investigate possibility for practicing opening against AI


## Created By

### Vincent Will : ![Twitter Follow](https://img.shields.io/twitter/follow/wweb_dev?style=social)
## License
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
