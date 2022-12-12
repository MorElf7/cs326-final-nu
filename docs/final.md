# 1. Title:

## Team Nu

# 2. Subtitle:

## App: CardioBuddy

# 3. Semester:

Fall 2022

# 4. Innovative Idea

-   There are lots of runners who want to have a running buddy so that they can be motivated and consistent with their exercise. However, each runner has a different running route, speed, and schedule, and it is difficult to find a person who fits all of those criteria.

-   On our platform, people can post their running route, speed, schedule, and some information about themselves, and after the process, they get connected to multiple profiles who have similar routes.

-   Runners begin by submitting their preferences:

    -   Information about themselves
    -   Route
    -   Speeds
    -   Schedules

-   Runners who matched would be able to see each other's information, preferred route, etc...

-   This application and its idea can also be expanded to other exercises such as biking, hiking, etc.

# 5. Team Members:

-   Bang Cao: MorElf7
-   Vi Doan: vitdoan
-   Nhan Lai: laithiennhan

# 6. User Interface:

## a. Login page:

This consist of 2 separate pages, signin and signup. Both employ html form elements to get the user username and password, email to register a new user or logging in to an existing account. The log in page would be the first page that the users got to when accessing the page.

## b. Route Panel:
This is the page for user to create and edit their route. Users can add pinpoints on their routes, and those addresses would be checked to ensure they are valid. They can also input their preferred dates and time, as well as their speed.

If the user has already created a route, then they would be redirected to a page where they can view their current route and edit it.
## c. Home Page:
Our Home Page allows user to go through all suggestions where they can decide to Like or Reject. Each suggestion card display other user's basic information, their time and route, along with a map with pinpoints where their routes are. From the home page, user can navigate to Matches, Routes Panel, and Profile page.

## d. Matches page:

This is a page to display all the users that have matched with the logged in user and their information, including their routes info, their name and description. There would be a nav bar at the top to redirect the user to their home page.

## e. Profile page:
The Profile page shows user's account information and allows user to change/update their description if needed. A random image will be generated for user profile.

# 7. API:

## User CRUD

-   Get /api/users/currentUser : Get the current logged in user
-   POST /api/users/login : Login the user
-   POST /api/users/signup : Register the user
-   Get /api/users/logout : Logout the user
-   GET /api/users/:userId : Get the user information
-   PUT /api/users/:userId : Update user information
-   DELETE /api/users/:userId : Delete the user
-   GET /api/users/:userId/match : Get the user list of matches

## Match CRUD

-   GET /api/request : Get all the match requests for a user
-   GET /api/request/:requestId : Get the specific match request with the given id
-   POST /api/request : Create/Request a match request from the current/logged-in user to another user
-   PUT /api/request : The receiver accept/decline the match request with the given id
-   POST /api/request/reject : The user rejected a match suggestion
-   DELETE /api/request : The request sender delete the match request with the given id
-   POST /api/request/suggestion : Get a list of suggestion with information specified in the request body

## Path CRUD

-   GET /api/paths/:pathId : get any path by its id
-   GET /api/paths/:userId : get a user's path
-   POST /api/paths/ : create a new path
-   PUT /api/paths/:pathId : update a path's data
-   DELETE /api/paths/:pathId : delete a path with its id

# 8. Database:

## a. Users:

-   Stores information related to any user using the app.
-   username and email
-   connections: list of other users that current users are matched with ([userId])
-   path: current user's preferred running path ([pathId])

## b. Paths:

-   pinpoints: Locations to mark current user's running route. Each pinpoint contains an address, zipcode and its coordinates
-   user: the id of the user
-   speed: preferred speed of the user, can be set to slow, fast or medium speed.
-   date: Days in weeks that users usually go jogging on.
-   time: time that user usually begin their walk.

## c. Request:

-   stores all connection requests between users, used to generate matches between users
-   sender: id of the user who sent the connection request (hitting "like")
-   receiver: id of the receiver of the connection request
-   status: "PENDING", "ACCPETED" or "REJECTED", to store status of the match

# 9. URL:

https://cardio-buddy.herokuapp.com/

# 10 Authentication/Authorization:
Users are authenticated using their username and password and using session store. The information about session are stored using MongoDB. Every registered user would have the same permission. They can access their match list, request list, and suggestion list and their own homepage and other users profile page. They can make change to request that involved them as the sender or receiver, but they cannot make change to other user requests. They can also make change to their own profile, such as personal information or route information.

# 11 Division of labor
Nhan Lai:
- Paths Model and APIs
- Route Panel and Edit Route Panel Front end 
- Match Suggestion APIs
- Homepage functionalities
- Heroku deployment

Vi Doan
- Google Map API
- Home Page and Edit User Front End
- Render Suggestions
- UI Touch Ups

Bang Cao:
- Authorization
- Match models and APIs functionality
- Match page
- User Model and APIs functionality

# 12 Conclusion:
Throughout the design and implementation of the project, our team has learned a lot of things:
- How to design and implement backend server and databases that is efficient and has a wide range of functionalities to support our application.
- How to design and build interactive web interfaces and compononents that are user-friendly and easy to navigate.
- Effective collaboration and tools like Git, Github, Heroku.
- Product designing

Difficulties we encountered:
- Using location related APIs
- Building complex front-end features. Implementing location maps was difficult due to the amount of knowledge needed.

Things we wish we knew:
- Advanced CSS/Bootstrap, MongoDB queries and Express techniques
- Session/Cookies
- How to use location APIs
