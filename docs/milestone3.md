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

### Path Document
- pinpoints: [{address: String, zipcode: String,}]. Pinpoints on a user's route. Each pinpoint is an object that contains an address and its zipcode. The zipcode information is used to find suggestions for users (suggests users in the same zipcodes). Pinpoints will be validated before a route is created
- user: ObjectId of the path's user. Ref: "User"
- speed: String. Users' prefered speed (Slow/Medium/Fast)
- date: [String]. Days in week that users run/walk on preferred route. ()
# Labour division

-   Authentication services: login, signup, logout, hash, salt of users: Bang Cao

-   Request models, crud/controllers: Bang Cao

-   Get suggestions for a user: Bang Cao

-   Set up Atlas cluster: Bang Cao

- paths models: Nhan Lai
- paths crud/routing: Nhan Lai
- address validation: Nhan Lai
- Heroku deployment frontend/backend: Nhan Lai

- User models: Vi Doan
- User crud/routing: Vi Doan
- Frontend endpoint, bug fixing: Vi Doan
- Handle edit and save user information functionality: Vi Doan