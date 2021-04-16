https://heard-when-237e7.firebaseapp.com/firebase

# Heard When: A board game for nostalgic music lovers
**Game**

This project is a music trivia game, inspired by the Swedish board game "När då då?". Songs from decade playlists fetched from Spotify's API are played and the player in turn guess in what order the current song came relative to previously collected song cards, by clicking between the cards that are ordered based on year. The goal is to reach a specific number of song cards at the end of the game. By guessing correctly you are given the option to "lock" your cards and pass over to the next player or "draw" another card to listen and guess on another song. An incorrect guess results in losing all the cards gained that round and the next player gets a chance to guess on that song. The game is simple and intuitive and difficulty increases as more cards are collected.  

The game part of the app is divided into two phases:
- "choice": when the player in turn is prompted with the choice between locking cards or continuing to guess.
- "listen": when the song is playing and player in turn can guess on the position of the new card. 

**Joining game and data handling**

The game is multiplayer and meant to support players attending on seperate devices/browsers. For this, Firebase is used to setup shared data handling and login. There is initially a Login-view which is handled by Firebase/Google. Once logged in there is a Setup-view for creating a new game or joining an already existing game, which then leads to a waiting room where stats from previous games and the start option is. The creator of the game starts the game when the players have joined and the gameboard (described above) appears.

**Spotify** 

The Spotify music player can be a bit wonky. It's currently very sensitive to state changes, for example if you pause the music in the Spotify app it won't understand that. To make a good connection, ensure that your Spotify app is opened (preferably on your computer) and start to play (and pause) a song on it before you click "Connect" in the UI. Otherwise Spotify might not understand that you have an active device, and the connection will fail. 

**Prototype layout:** https://www.figma.com/file/wm9hhtZjF8UUN3JPo1QwNv/Heard-When?node-id=0%3A1

## What we have done

At this point we have a demo where the game logic and current data is visible through text and buttons as the player interacts with it. It is deployed on Firebase and includes login, setting up a game playable by multiple players and the fundamental game logic. The app consists of three statuses (so far) that determine what is to be shown: 
- "initialized": when the game has been created and players are joining.  
- "started": when the creator of the game starts the game and no more players can join.
- "finished": when one of the players has reached the goal of collecting X cards. 


## What we still plan to do
- Improve the MVP structure and connect more Views to the game logic. 
- Move the model of the game logic to its own Vuex store.
- Add more options for users, such as "How to play" and "Statistics".
- Improve the UI
- Get store and routing between paths in place
- Squash some logic bugs 
- Add loading and error states where needed
- CSS styling

## Our project file structure 
We only include description/purpose of the files in /src as the rest of them are only to do with configuration and running of the app.
/firebase includes backend code which can be ignored in the scope of the course.

**Ignore following files:** /assets, components/HelloWorld.vue, pages/About.vue, pages/Home.vue

**/auth/index.ts**
- this is where the OAuth integration needed for connecting to Spotify API is set up.

**/config/...**
- functionality for validating the .env file of users 

firebaseConfig.ts
- firebase and firestore is configured and setup.

index.ts
- makes sure the environment is correct for integrated APIs.

**/domain/actions.ts**
- creates custom action for all user actions in the game; guessAction, drawAction, passAction (aka. lock cards)

**/router/index.ts**
- this is where the routing is created for navigating between different pages. The routing to FirebaseDemo is: localhost:8080/firebase

**/pages/FirebaseDemo.vue**
-  this is where the GameDemo is mounted. It is also where the mock data (songs) comes from right now, when the model is not in place.

**/service/...**
- Both files in this directory has to do with setup of authorization for Spotify

**/store/music/...**
- These files represent a store/model for managing the connection and state of music playback

**/store/index.ts**
- Not used currently


**/components/...**

Card.vue
- a card component which makes up the layout for Card instances. Takes in the Card arguments id, title, artist, year and displays the necessary information in the card.

GameDemo.vue
- this is where the firebase app runs, by writing localhost:8080/firebase in the browser.

Login.vue
- view for login screen, contains css for layout

DashBoardView.vue
- view for setting up game and logging out, contains css for layout

GameDetails.vue
- view for game details including turn, phase, player(s), deck, contains css for layout

**/components/Game/...**

GamePresenter.vue
- presenter for the core game functionalities. The GamePresenter displays and passes on data to GameView and ChoiceView and contains methods such as guess, draw and lock. The guess method is triggered onClick in guee-buttons between the cards while draw and lock gives the player an option to keep playing or lock their cards.

GameView.vue
- view for the game board when playing, it takes in a message to display as well as the cards and guess-buttons passed from the presenter. It also contains css styling.  

ChoiceView.vue
- view for the choice box where the player can choose to lock their loose cards or continue guessing. It takes in the functions draw and lock as props.

**/components/MusicPlayer/...**

MusicPlayerPresenter.vue
- presenter for music player which uses Spotify API to play the song/currentHiddenCard. Passes on buttons to play, pause and connect to MusicPlayerView as well as a status message.

MusicPlayerView.vue
- view for music player that takes buttons from the presenter and displays them with styling.

# Instructions
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
