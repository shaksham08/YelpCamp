# YelpCamp
This is a complete Full stack project made using HTML,CSS,JS,NODE,EXPRESS and MONGO

# RESTful Routes

A table of all 7 RESTful route

REST(Representational state transfer) is jsut a convention for mapping our HTTP Routes to our CRUD functionality.

|   Name  | Path          | HTTP Verb | Pupose                                           |
|:-------:|---------------|-----------|--------------------------------------------------|
|  Index  | /dogs         | GET       | List all dogs                                    |
|   New   | /dogs/new     | GET       | Show new dog form                                |
|  Create | /dogs         | POST      | Create a new Dog,then redirect shomewhere        |
|   Show  | /dogs/:id     | GET       | Show info about one specific dog                 |
|   Edit  | /dog/:id/edit | GET       | Show edit form for one dog                       |
|  Update | /dogs/:id     | PUT       | Update a particular dog, then redirect somewhere |
| Destroy | /dog/:id      | DELETE    | Delete a particular dog,then redirect somewhere  |
