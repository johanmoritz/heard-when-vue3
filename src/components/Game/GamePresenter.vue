<template>
  <div v-if="game.phase === 'listen' && game.currentHiddenCard !== undefined">
    <GameView :song="song" :cards="cards" :msg="msg" />
  </div>
  <div v-else-if="game.phase === 'choice'">
    <ChoiceView />
  </div>
</template>

<script lang="ts">
import GameView from "./GameView.vue";
import ChoiceView from "./ChoiceView.vue";
import { Game } from "../../../firebase/functions/src/types";
const game: Game = {
  deck: [
    {
      id: 0,
      title: "Mera Mål!",
      artist: "Markolio",
      year: 2000,
      uri: "spotify:track:08oSaHoJ7jrFv1kd74ZRT2"
    },
    {
      id: 1,
      title: "Daddy DJ",
      artist: "Daddy DJ",
      year: 2001,
      uri: "spotify:track:0l2c67gYvWLmYkz8l1gbdn"
    },
    {
      id: 2,
      title: "The Ketchup Song",
      artist: "Las Ketchup",
      year: 2002,
      uri: "spotify:track:6UEfyhyfhYQsyipxOd95Ie"
    },
    {
      id: 3,
      title: "Lose Yourself",
      artist: "Eminem",
      year: 2003,
      uri: "spotify:track:7MJQ9Nfxzh8LPZ9e9u68Fq"
    },
    {
      id: 4,
      title: "Coming True",
      artist: "Daniel Lindström",
      year: 2004,
      uri: "spotify:track:0ScrGnhCu5opMmZ9mLBSkO"
    },
    {
      id: 5,
      title: "Right Here Right Now",
      artist: "Agnes",
      year: 2005,
      uri: "spotify:track:0qnqsfFYgBo0sPHM2JmfTq"
    },
    {
      id: 6,
      title: "Who's Da Man",
      artist: "Elias Feat Frans",
      year: 2006,
      uri: "spotify:track:4w6cGuUx853Pk3KyVb6QO9"
    },
    {
      id: 7,
      title: "The Worrying Kind",
      artist: "The Ark",
      year: 2007,
      uri: "spotify:track:45DP2cidC1BdeIU0WmjIYY"
    },
    {
      id: 8,
      title: "I Kissed A Girl",
      artist: "Katy Perry",
      year: 2008,
      uri: "spotify:track:14iN3o8ptQ8cFVZTEmyQRV"
    },
    {
      id: 9,
      title: "Fairytale",
      artist: "Alexander Rybak",
      year: 2009,
      uri: "spotify:track:2rzWSywjwzbysCmdOzssFR"
    },
    {
      id: 10,
      title: "Waka Waka",
      artist: "Shakira",
      year: 2010,
      uri: "spotify:track:2Cd9iWfcOpGDHLz6tVA3G4"
    },
    {
      id: 11,
      title: "What Are Words",
      artist: "Chris Medina",
      year: 2011,
      uri: "spotify:track:50A1WCxKycJUHRr4Rz6WrD"
    },
    {
      id: 12,
      title: "Euphoria",
      artist: "Loreen",
      year: 2012,
      uri: "spotify:show:72daz879qRFZEg38LAH6Mh"
    },
    {
      id: 13,
      title: "Wake Me Up!",
      artist: "Avicii",
      year: 2013,
      uri: "spotify:track:0nrRP2bk19rLc0orkWPQk2"
    }
  ],
  goalNumberOfCards: 8,
  players: [
    {
      id: "player1",
      displayName: "Player 1",
      lockedCards: [
        {
          id: 14,
          title: '"Song 1"',
          artist: "Artist 1",
          year: 2001,
          uri: "spotify:track:blabla"
        },
        {
          id: 15,
          title: '"Song 2"',
          artist: "Artist 2",
          year: 2002,
          uri: "spotify:track:blabla"
        },
        {
          id: 16,
          title: '"Song 3"',
          artist: "Artist 3",
          year: 2003,
          uri: "spotify:track:blabla"
        }
      ]
    },
    {
      id: "player2",
      displayName: "Player 2",
      lockedCards: [
        {
          id: 19,
          title: '"Song 6"',
          artist: "Artist 6",
          year: 2000,
          uri: "spotify:track:blabla"
        },
        {
          id: 20,
          title: '"Song 7"',
          artist: "Artist 7",
          year: 1999,
          uri: "spotify:track:blabla"
        },
        {
          id: 21,
          title: '"Song 8"',
          artist: "Artist 8",
          year: 1998,
          uri: "spotify:track:blabla"
        }
      ]
    }
  ],
  currentPlayer: {
    id: "player1",
    displayName: "Player 1",
    lockedCards: [
      {
        id: 14,
        title: '"Song 1"',
        artist: "Artist 1",
        year: 2001,
        uri: "spotify:track:blabla"
      },
      {
        id: 15,
        title: '"Song 2"',
        artist: "Artist 2",
        year: 2002,
        uri: "spotify:track:blabla"
      },
      {
        id: 16,
        title: '"Song 3"',
        artist: "Artist 3",
        year: 2003,
        uri: "spotify:track:blabla"
      }
    ]
  },
  currentHiddenCard: {
    id: 0,
    title: "Mera Mål!",
    artist: "Markolio",
    year: 2000,
    uri: "spotify:track:08oSaHoJ7jrFv1kd74ZRT2"
  },
  temporaryCards: [
    {
      id: 14,
      title: '"Song 1"',
      artist: "Artist 1",
      year: 2001,
      uri: "spotify:track:blabla"
    },
    {
      id: 15,
      title: '"Song 2"',
      artist: "Artist 2",
      year: 2002,
      uri: "spotify:track:blabla"
    },
    {
      id: 16,
      title: '"Song 3"',
      artist: "Artist 3",
      year: 2003,
      uri: "spotify:track:blabla"
    },
    {
      id: 17,
      title: '"Song 4"',
      artist: "Artist 4",
      year: 2004,
      uri: "spotify:track:blabla"
    },
    {
      id: 18,
      title: '"Song 5"',
      artist: "Artist 5",
      year: 2005,
      uri: "spotify:track:blabla"
    }
  ],
  log: [],
  status: "started",
  phase: "choice"
};
// Change phase for different views
game.phase = "listen";

export default {
  name: "GamePresenter",
  components: { GameView, ChoiceView },
  data() {
    return {
      game: game,
      msg: game.currentPlayer.id + ", when is the song from?",
      cards: game.temporaryCards,
      song: game.currentHiddenCard
    };
  }
};
</script>
