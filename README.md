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

## Initialise a repository or skip this step if you wish to only run locally and not make any changes

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

Check final application in a Desktop version of Chrome & Firefox + IOS
and Android phones

2. Bring UX2, PROJ2 & PROJ3 together in one .zip, write a README
   describing installation for operations staff

3. Include in the README all the technologies used in the app, places
   where they were used and versions you recommend


## Technologies used

-   font awesome icons:

    -   components/home/home.js

    -   components/home/circle.js

-   Temporal api

    -   pages/addFood/index.js
    -   pages/foodLog/index.js
    -   pages/index.js

-   Prisma

    -   every api route

-   formik

    -   pages/addFood
    -   pages/foodLog
    -   pages/profile
    -   pages/Register

-   limiter

    -   pages/api/handler.js

-   next-auth

    -   pages/api/auth/[...nextauth.ts]
    -   pages/signin.js

-   next-connect

    -   pages/api/handler.js

-   next-pwa

    -   pages/\_doccument.js
    -   service-worker.js

-   next-themes

    -   components/layout/header.js

-   react-spinners

    -   pages/addFood
    -   pages/foodLog
    -   pages/profile
    -   pages/Register

-   React-toastify

    -   pages/addFood
    -   pages/foodLog
    -   pages/profile
    -   pages/Register

-   yup

    -   pages/addFood
    -   pages/foodLog
    -   pages/profile
    -   pages/Register
    -   middleware/validator.js

-   tailwind
    -   all through the application

4. Confirm functionality in relation to plan PROJ1 highlight areas that
   changed, or were not implemented.

Currently creating exercise routines and being able to enter in data for them is incomplete at this stage, along with connecting smart devices like a smartwatch to track steps and body vitals


5. Write a roadmap section that confirms areas of development going
   forward. What bugs do you want to fix or functionality to extend

-   Going forward with development other features that will be implemented are the following

-   Exercise Routine Builder Eta: 3-4 weeks
-   Exercise Tracking such as starting a workout and tracking your reps, sets and weight Eta: 6 weeks
-   Creating a custom meal made up of other custom foods Eta: 2 months
-   Connecting smart devices for activity tracking such as daily steps: 3 months
-   Sharing custom meals and exercises: 4 months
