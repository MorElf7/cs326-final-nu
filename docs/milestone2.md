# Part 0, Backend API planning

### User CRUD

-   GET /api/users/:userId : Get the user information
-   POST /api/users : Create and register a new user
-   UPDATE /api/users/:userId : Update user information
-   DELETE /api/users/:userId : Delete the user
-   POST /api/users/:userId/login : Login the user

### Match CRUD

- GET /api/request : Get all the match requests for a user
- GET /api/request/:requestId : Get the specific match request with the given id 
- POST /api/request : Create/Request a match request from the current/logged-in user to another user
- UPDATE /api/request/:requestId : The receiver accept/decline the match request with the given id
- DELETE /api/request/:requestId : The request sender delete the match request with the given id
- GET /api/users/:userId/match : Get the list of users that has matched with the user with the specified id

