# Heard When: A board game for nostalgic music lovers
**Game**

This project is a music trivia game, inspired by the Swedish board game "När då då?". Songs from decade playlists fetched from Spotify's API are played and the player in turn guess in what order the current song came relative to previously collected song cards, by clicking between the cards that are ordered based on year. The goal is to reach a specific number of song cards at the end of the game. By guessing correctly you are given the option to "lock" your cards and pass over to the next player or "draw" another card to listen and guess on another song. An incorrect guess results in losing all the cards gained that round and the next player gets a chance to guess on that song. The game is simple and intuitive and difficulty increases as more cards are collected.  

The game part of the app is divided into two phases:
- "choice": when the player in turn is prompted with the choice between locking cards or continuing to guess.
- "listen": when the song is playing and player in turn can guess on the position of the new card. 

**Joining game and data handling**

The game is multiplayer and meant to support players attending on seperate devices/browsers. For this, Firebase is used to setup shared data handling and login. There is initially a Login-view which is handled by Firebase/Google. Once logged in there is a Setup-view for creating a new game or joining an already existing game, which then leads to a waiting room where stats from previous games and the start option is. The creator of the game starts the game when the players have joined and the gameboard (described above) appears.

**Prototype layout:** https://www.figma.com/file/wm9hhtZjF8UUN3JPo1QwNv/Heard-When?node-id=0%3A1

## What we have done

At this point we have a demo where the game logic and current data is visible through text and buttons as the player interacts with it. It is deployed on Firebase and includes login, setting up a game playable by multiple players and the fundamental game logic. The app consists of three statuses (so far) that determine what is to be shown: 
- "initialized": when the game has been created and players are joining.  
- "started": when the creator of the game starts the game and no more players can join.
- "finished": when one of the players has reached the goal of collecting X cards. 

Aside from the demo, we have also done some of the views with layouts, although they currently only provide print statements when interacting with. The BoardView include the collected cards with guess-buttons on both side of each card to guess "before song card X", "between song cards X and Y" or "after song card Y". BoardView uses a Board-component which displays the Card-components. ...ChoiceView...MusicPlayerView...JoinView...LoginView... In addition views have been added for login screen, dashboard and game details with basic layouts for the game.


## What we still plan to do
- Improve the MVP structure and connect the Views to the game logic. 
- Make a model for the data taken from the API.
- Add more options for users, such as "How to play" and "Statistics".
- Improve the UI 

## Our project file structure

(short description/purpose of each file)

**/auth/index.ts**
- this is where the OAuth integration needed for connecting to Spotify API is set up.

**/config/...**

**firebaseConfig.ts**
- firebase and firestore is configured and setup.

**index.ts**
- makes sure the environment is correct for integrated APIs.

**/domain/actions.ts**
- creates custom action for all user actions in the game; guessAction, drawAction, passAction (aka. lock cards)

**/router/index.ts**
- this is where the routing is created for navigating between different pages. The routing to FirebaseDemo is: localhost:8080/firebase

**/pages/FirebaseDemo.vue**
-  this is where the GameDemo is mounted. It is also where the mock data (songs) comes from right now, when the model is not in place.

**/service/...**
- Both files in this directory has to do with setup of authorization for Spotify

**/store/...**
- TODO!

**/components/...**

**Card.vue**
- a card component which makes up the layout for Card instances. Takes in the Card arguments id, title, artist, year and displays the necessary information in the card.

**GameDemo.vue**
- this is where the firebase app runs, by writing localhost:8080/firebase in the browser.

**Login.vue**
- view for login screen, contains css for layout

**DashBoardView.vue**
- view for setting up game and logging out, contains css for layout

**GameDetails.vue**
- view for game details including turn, phase, player(s), deck, contains css for layout

**/components/Game/...**

**GamePresenter.vue**
- presenter for the core game functionalities. The GamePresenter displays and passes on data to GameView and ChoiceView and contains methods such as guess, draw and lock. The guess method is triggered onClick in guee-buttons between the cards while draw and lock gives the player an option to keep playing or lock their cards.

**GameView.vue**
- view for the game board when playing, it takes in a message to display as well as the cards and guess-buttons passed from the presenter. It also contains css styling.  

**ChoiceView.vue**
- view for the choice box where the player can choose to lock their loose cards or continue guessing. It takes in the functions draw and lock as props.



# Instructions
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Part 1: Layouts
```
localhost:8080
```

### Part 2: Demo deployed on Firebase 
```
In browser https://heard-when-237e7.firebaseapp.com/firebase
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
