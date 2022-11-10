# Part 0, Backend API planning

### User CRUD

-   GET /api/users/:userId : Get the user information
-   POST /api/users : Create and register a new user
-   UPDATE /api/users/:userId : Update user information
-   DELETE /api/users/:userId : Delete the user
-   POST /api/users/login : Login the user

### Match CRUD

-   GET /api/request : Get all the match requests for a user
-   GET /api/request/:requestId : Get the specific match request with the given id
-   POST /api/request : Create/Request a match request from the current/logged-in user to another user
-   UPDATE /api/request : The receiver accept/decline the match request with the given id
-   DELETE /api/request : The request sender delete the match request with the given id
-   GET /api/users/:userId/match : Get the list of users that has matched with the user with the specified id
-   GET /api/users/:userId/request : Get the list of request that was sent by the user
-   POST /api/request/suggestion : Get a list of suggestion with information specified in the request body
-   POST /api/users/search : Search for users with the specified info in the request body

### Path CRUD

-   GET /api/paths/:pathId : get any path by its id
-   GET /api/paths/userId : get a user's paths
-   POST /api/paths/ : create a new path
-   UPDATE /api/paths/:pathId : update a path's data
-   DELETE /api/paths/:pathId : delete a path with its id
-   GET /api/paths/:pathId/matches : Get list of users matched with current user on current path
