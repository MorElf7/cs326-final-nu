# Part 0, Backend API planning

### User CRUD

-   GET /api/users/:userId : Get the user information
-   POST /api/users : Create and register a new user
-   UPDATE /api/users/:userId : Update user information
-   DELETE /api/users/:userId : Delete the user
-   POST /api/users/:userId/login : Login the user

### Match CRUD

- GET /api/users/:userId/request : Get all the match requests for the user
- GET /api/users/:userId/request/:requestId : Get the match request for the user with the given id 
- POST /api/users/:userId/request : Create/Request a match request from the current/logged-in user to the user with the specified id
- UPDATE /api/users/:userId/request/:requestId : Accept/Decline the match request with the given id
- GET /api/users/:userId/match : Get the list of users that has matched with the user with the specified id
