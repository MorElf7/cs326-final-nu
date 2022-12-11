# 1. Title:
## Team Nu
# 2. Subtitle:
## App: CardioBuddy
# 3. Semester:

Fall 2022

# 4. Innovative Idea

- There are lots of runners who want to have a running buddy so that they can be motivated and consistent with their exercise. However, each runner has a different running route, speed, and schedule, and it is difficult to find a person who fits all of those criteria. 


- On our platform, people can post their running route, speed, schedule, and some information about themselves, and after the process, they get connected to multiple profiles who have similar routes.

- Runners begin by submitting their preferences:
  * Information about themselves
  * Route
  * Speeds
  * Schedules

- Runners who matched would be able to see each other's information, preferred route, etc...

- This application and its idea can also be expanded to other exercises such as biking, hiking, etc.

# 5. Team Members:
-   Bang Cao: MorElf7
-   Vi Doan: vitdoan
-   Nhan Lai: laithiennhan

# 6. User Interface:
## a. Login page:

## b. Route Panel:

## c. Home Page:

## d. Matches page:

## e. Profile page:

# 7. API:
## a. auth:

## b. paths:

## c. requests:

## d. users:
# 8. Database:
## a. Users:
- Stores information related to any user using the app.
- username and email
- connections: list of other users that current users are matched with ([userId])
- path: current user's preferred running path ([pathId])
## b. Paths:
- pinpoints: Locations to mark current user's running route. Each pinpoint contains an address, zipcode and its coordinates
- user: the id of the user
- speed: preferred speed of the user, can be set to slow, fast or medium speed.
- date: Days in weeks that users usually go jogging on.
- time: time that user usually begin their walk.
## c. Request:
- stores all connection requests between users, used to generate matches between users
- sender: id of the user who sent the connection request (hitting "like")
- receiver: id of the receiver of the connection request
- status: "PENDING", "ACCPETED" or "REJECTED", to store status of the match
# 9. URL:
https://cardio-buddy.herokuapp.com/