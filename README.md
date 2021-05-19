# Rick And Morty
Tech test base Rick and Morty api, read Api doc [here](https://rickandmortyapi.com/documentation/).
## How to Run the Application

I'm using visual studio code remote dev containers for runing the development environment. If you don't know what VSCode remote containers are please visit the [oficial page](https://code.visualstudio.com/docs/remote/containers).

### Starting Development Environment on Remote Dev Container

#### Preconditions

- You should have VSCode installed
- You need to install Remote Dev Container extension

#### Start the Project

If you already have all this installed you shoud open the project on VSCode and open remote container (there should be a green button left down on the screen and you should choose the option open in remote container). 
When you open the project on the remote container all the dependencies will be installed for you.

Finally open a terminal and execute the following command on the root folder
- `$ yarn start`

This command will start the backend and the frontend. 

The frontend will be running on `localhost:3000` and will be automatically open on your browser. 
You can check and test the backend on `http://localhost:8080/api/docs/`.

#### Extra 

If you don't want to use the remote container. you should install all the dependencies manually.
Execute the following command in both projects. Also, you need to have mongo db installed on your computer. I recommend you to use remote dev containers in order to avoid all this installation steps. 
- `$ yarn && yarn install:dep`

## Technical details for BE

- For the Backedn I use `MongoDB` local database (installed in the dev container)
- NodeJs last version ` VARIANT: 16` set in dev container.
- I installed `inversify` and `inversify-express-utils` to have dependency injection on the backend
- I also created backend documentation using swagger. This is useful to test and read APIs documentation.
- I installed `axios` for the http request to Rick and Morty endpoints.
- For the authentication process I developed a middleware to check if the json is valid using `jwt` for create and validate the token.
- I also store in the DB the user information, as I'm saving the password I use `bcryptjs` for saving the password hash into the Data Base. 

## Technical Details For FE
- I used `React` as requested on the technical test
- I created a reducer for the authorization process
- I added to the project `Redux` to manage a global state for the authorization of the user
- I also install `axios` here for calling the BE APIs. 
- I Installed `hero-icons` for the icons on the app. 
- I used `saas` for the styling part of the application
- You should login or sign up before seeing the list of characters. 
- There is a check on private routes to validate if the token is still valid and if the user have a session.
- The user login is stored on the local storage to ensure that if the user reload the page the session is still valid. 


## Test
I did't have the chance to finish the tests but i have made some for the api. 
- For testing i use mocha and chai in convination with hai-http
- For running the test (only backend) execute `yarn test` 