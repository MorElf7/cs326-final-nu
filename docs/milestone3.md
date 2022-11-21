# Database - MongoDB

### User document

-   username: String
-   email: String
-   description: String // _Brief description of the user_
-   hash: String
-   salt: String
-   connections: [ObjectId] // _Ref: "User", A list if users that have matched with the user_
-   path: ObjectId // _Ref: "Path", The path data_

### Request document

-   sender: ObjectId // _Ref: "User", the sender of the match request_
-   receiver: ObjectId // _Ref: "User", the receiver of the match request_
-   message: String // _The request message from the sender_
-   status: String // _Status of the request: includes PENDING, ACCEPTED, REJECTED_

# Labour division

-   Authentication services: login, signup, logout, hash, salt of users: Bang Cao

-   Request models, crud/controllers: Bang Cao

-   Get suggestions for a user: Bang Cao

-   Set up Atlas cluster: Bang Cao
