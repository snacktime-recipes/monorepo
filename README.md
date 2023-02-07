# snacktime

## Project structure

`apps/backend`: Backend application, built using [AdonisJS framework](https://adonisjs.com)     
`apps/web`: Web application, built using [SvelteKit](https://kit.svelte.dev)    

`packages/types`: Type definitions for effortless communication between *backend* and *web* apps    

## How to run locally?

First of all, you'll need to clone this repository to your local machine, using something like `git clone https://github.com/snacktime-recipes/monorepo`    
Then, you'll need to install all npm dependencies running `npm install` in root folder of the project.  
You'll need to define **environmental** variables in .env file in root folder. You can just copy contents of `.env.example`.    
Three more steps to go! Firstly, you'll need to run migrations and seed your newly migrated **SQLite** database. Just run these commands: `nx run backend:migration:run` and then `nx run backend:migration:seed` to seed you database with showcase tables and data
And then you'll be ready to go! Just run `nx run-many --target=serve` in root folder and access your local Snacktime instance at `http://localhost:5173`    