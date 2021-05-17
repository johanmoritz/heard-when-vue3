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

The Spotify music player can be a bit wonky. It's sensitive to state changes, for example if you pause the music in the Spotify app it won't understand that. To make a good connection, ensure that your Spotify app is opened (preferably on your computer) and start to play (and pause) a song on it before you click "Connect" in the UI. Otherwise Spotify might not understand that you have an active device, and the connection will fail. 

**Prototype layout:** https://www.figma.com/file/wm9hhtZjF8UUN3JPo1QwNv/Heard-When?node-id=0%3A1

# Instructions
## Project setup

This project uses Vue 3 and relies on the vue cli which can be installed by

```
yarn global add @vue/cli
```

after which the project can be installed with

```
yarn install
```

### .env
You need to supply a .env file in the root folder of the project with the following structure (see the submission on canvas).

```
VUE_APP_PIZZLY_HOST=XXX
VUE_APP_PIZZLY_PUBLIC_KEY=XXX
VUE_APP_FIREBASE_API_KEY=XXX
VUE_APP_FIREBASE_AUTH_DOMAIN=XXX
VUE_APP_FIREBASE_PROJECT_ID=XXX
VUE_APP_FIREBASE_STORAGE_BUCKET=XXX
VUE_APP_FIREBASE_MESSAGING_SENDER_ID=XXX
VUE_APP_FIREBASE_APP_ID=XXX
```


### Compiles and hot-reloads for development
```
yarn serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
