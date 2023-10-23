## Starter command
-    npm install
-    npm start (for running server) : port 4000
-    nodemon npm start (for dev)
## Technology stack
-    Database
      -    mongodb
      -    mongo-express
-    Backend
      -    javaScripts
## Backend infomation

- Database Design
- Backend  Design & route

### Database Model

        - Course
            - courseNo
            - year
            - semester
            - csoList
                - scoreUsesList
                - objEN
                - objTH
                - selectedSO
                - csoScore
            - status
                - enum: ["Waiting", "Success"],
            - section
                - sectionNumber
                - status
                    - enum: ["Waiting", "In Progress", "Success"],
                - csoScoreEachSec

        - So
            - courseNo
            - year
            - semester
            soScore
                - so1
                - so2
                - so3
                - so4
                - so5
                - so6
                - so7
                
## Backend Design
- home page
  -    getdata 
      -    fetch data from fs-api by using Teacher Email
      -    then store into project database
- edit page
  -    edit
    -    fetch data from project database and display for user
- summary button
  -    summary
    -    calculate data from database with json body
## Backend route

### course
  - get
      - courses/      (get all course in db)
      - courses/:id
  - post
  - put
      - courses/:id
  - delete
      - courses/:id
### so
  - get
      - so/            (get all so in db)
      - so/:id
  - post
  - put
      - so/:id
  - delete
      - so/:id

### getdata
  - 3 params
    - tEmail
    - year
    - semester
  - route example : /getDatas?tEmail=karn.patanukhom@cmu.ac.th&year=2566&semester=1

### edit
  - 4 params
    - course number
    - year
    - semester
    - section
  - route example : /edits?courseNo=261499&year=2566&semester=1&section=1
    
### summary

  - 4 params
    - course number
    - year
    - semester
    - section
  - json body example

    -

    ```
    {
        "scoreUsesList":[["คะแนนควิซ 1","คะแนนควิซ 2"],["คะแนนมิดเทอม"]],
        "score":[[[3,2,5,6,5,4,8,9,4,1],[5,9,10,4,6,6,8,9,6,4]],[[6,9,7,5,8,6,4,3,1,2]]],
        "standard":[[[0,2,4,6,8],[0,3,5,7,9]],[[0,3,5,7,8]]]

    }
    ```

  - route example : /summary?courseNo=261499&year=2566&semester=1&section=1
