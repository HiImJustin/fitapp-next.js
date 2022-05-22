## About FIT

-   FIT is a fitness information tracker, this app is designed in a way that allows users to have an unrestricted experience to track their fitness results. Users can search a predefined database of food items or create their own custom food items to tailor the results for themselves and add them to their food log. Users can also do the same for creating exercise routines and tracking their weight, reps etc.

-   This application has been built in Nextjs which utilises the react framework for building the frontend, next-auth, prisma and postgresql as the major frameworks involved.

## Future Development

-   Going forward with development other features that will be implemented are the following

-   Exercise Routine Builder Eta: 3-4 weeks
-   Exercise Tracking such as starting a workout and tracking your reps, sets and weight Eta: 6 weeks
-   Creating a custom meal made up of other custom foods Eta: 2 months
-   Connecting smart devices for activity tracking such as daily steps: 3 months
-   Sharing custom meals and exercises: 4 months

## Getting Started

## Step one

-   Clone this repository to your local environment
-   Open this project up in your IDE of choice

## Initialise a repository or skip this step if you wish to only run locally

-   follow the instructions at https://docs.github.com/en/get-started/importing-your-projects-to-github/importing-source-code-to-github/adding-locally-hosted-code-to-github

## Install dependencies

-   Run node -v to check your version of node.js, ensure it is upto date or is at least of version 13.2.0 or greater
-   Run npm install to install all node dependencies

# If you wish to create your own database follow these instructions to set it up otherwise skip this step

-   https://dev.to/prisma/how-to-setup-a-free-postgresql-database-on-heroku-1dc1
-   Enter the connection string uri into the .env file
-   Run npx db push

## Starting the server

-   To run a development version run 'npm run dev'
-   To create a optimised build version run 'npm run build' Then run 'npm start' after the build is complete
-   Your app will be served at this address - [http://localhost:3000]

## Deployment

-   To deploy this to a live environment create a free account on "https://vercel.com/"
-   For deployment pushing you must have created a git repository and pushed your version up
-   After account has been created navigate to the dashboard and click on Create new project
-   Connect your github account upto vercel and following the confirmation prompts presented
-   In the .env file change the following lines or create environment variables in the deployment settings on vercel
-   Comment out the existing variables by using shift+/ and enter your new one in from the examples below
-   NEXT_PUBLIC_API_URL=https://YourWebsiteUrlHere!!!/api
-   NEXTAUTH_URL = https://YourWebsiteUrlHere!!
-   To run in dev env on localhost:3000 your .env variables will need to be changed back
-   Select the repository to connect and allow vercel to build your project and deploy

## customising the app

-   if you have the knowledge or want to change parts of this project and deploy a new version
-   Simply follow the steps on github on how to commit changes and push to your repository
-   Vercel will then notice the change and build and deploy the new version pushed up
