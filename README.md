## backend infomation

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

### route

#### - course

  - get
  - post
  - put
  - delete

#### - so

  - get
  - post
  - put
  - delete

#### - getdata
  - 3 params
    - tEmail
    - year
    - semester
  - route example : /getDatas/test?tEmail=karn.patanukhom@cmu.ac.th&year=2566&semester=1
  - 
#### - edit
  - 4 params
    - course number
    - year
    - semester
    - section
  - route example : /edits?courseNo=261499&year=2566&semester=1&section=1
    
#### - summary

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
