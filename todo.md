## FIT app todo

## Connect to the database
- Create the database of which the data will be sent to

## App per page functionality

# Register Page
- create/style register page
- Post Username/password
- Form for the users personal information
- Name, Age, Height, Weight, Sex, Activity Level - Calculate TDEE
- Post the user Data
- Redirect to /Home

# Login Page
- Create a Register button on login page or open to the register page if not launched before
- Get request for Login

# Home Page
- Connect home page Tdee totals etc to the users Data

# Log Foods
- Connect the results option to an api for food Data
- Make the selectedFoods array element include data of nurtrional information
- Maybe make a total of nutri info in the selectedFood element
- Maybe make it when you select a food from the search list it opens a modal to a more detailed screen of the nutrional information and serving size etc
- Add an Add new food option to the bottom of the results element
- Add new food function allows custom food name, nutrional information - Post to database
- Add to Log button POSTS the data in accordance to the userID and date

# Food Log
- Connect to the usersDiet table or something, show totals based on the day
- Allow user to show food data by date

# Create routine page
- Connect to database
- Fetch all the avaliable exercises 
- Create search bar to query the search bar
- Create an add new exercise button
- When exercise is clicked on add to Routine array
- Make an option to remove exercise from Routine array
- Post the data - Workout Name, exercises, userID

# My Routines Page
- Connect page to database
- Fetch from database/routines, loop through the routines the user has to create the element
- Add onclick to the routine element to navigate to new page containing that routine exercises 
- create an add routine button/make a page for it

# Workout Page
- Connect to the database
- Fetch the routine data
- Create page based on the fetched Data
- add input boxes to store workout data
- Create state to record the entered information
- Create a finish workout button to POST the collected workout information in the state variable

# Workout History Page
- Fetch the data that the workout page posts to
- Allow filtering of data by date and workout 

# Profile Page
- Create onclicks on each element that opens a modal
- Modal contains a form to change the profile information
- Post that form data

# Settings Page
- Make darkmode a thing somehow
- Language and notifications are a lie
- Add a function in here that - if user is admin - toggle admin pannel on? option 


## App done then maybe well just the functionality ##
## Still need to style it all properly ##


