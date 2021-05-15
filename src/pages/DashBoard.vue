<template>
  <DashBoardPresenter :deck="deck" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Card } from "firebase/functions/src/types";
import DashBoardPresenter from "@/components/DashBoard/DashBoardPresenter.vue";

function randomReal(args: { min: number; max: number }): number {
  const { min, max } = args;
  return Math.random() * (max - min) + min;
}

function randomInt(args: { min: number; max: number }): number {
  return Math.floor(randomReal(args));
}

function randomOrder<T>(arr: Array<T>): Array<T> {
  let cp = arr.concat([]);
  const result = [];
  while (cp.length !== 0) {
    const iToMove = randomInt({ min: 0, max: cp.length });
    const v = cp[iToMove];
    result.push(v);
    cp = cp.filter((_, i) => i !== iToMove);
  }
  return result;
}

export default defineComponent({
  components: { DashBoardPresenter },
  setup() {
    const deck: Array<Card> = [
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
        uri: "spotify:album:6dpsjlCCaRJe4uVq1WJiXb"
      },
      {
        id: 5,
        title: "Right Here Right Now",
        artist: "Agnes",
        year: 2005,
        uri: "spotify:track:5mKLRZYKn8eT8uefTdmy8A"
      },
      {
        id: 6,
        title: "Who's Da Man",
        artist: "Elias Feat Frans",
        year: 2006,
        uri: "spotify:track:3LYpxjR3e1wlVwuqTKuWHp"
      },
      {
        id: 7,
        title: "The Worrying Kind",
        artist: "The Ark",
        year: 2007,
        uri: "spotify:track:5zIxRPGxiOBNRDBu2Upk4i"
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
        uri: "spotify:track:2knr7ikPt4l7bk92qS4ZXW"
      },
      {
        id: 13,
        title: "Wake Me Up!",
        artist: "Avicii",
        year: 2013,
        uri: "spotify:track:0nrRP2bk19rLc0orkWPQk2"
      },
      {
        id: 14,
        title: "Das Model",
        artist: "Kraftwerk",
        year: 1978,
        uri: "spotify:track:3VwLD5o1r0YBLkjUfgSEYg"
      },
      {
        id: 15,
        title: "September",
        artist: "Earth, Wind & Fire",
        year: 1978,
        uri: "spotify:track:3wpLkju0bJy89kjgdRys0j"
      },
      {
        id: 16,
        title: "Ring Ring",
        artist: "ABBA",
        year: 1973,
        uri: "spotify:track:5anrNIgDuSFsP2DJgAIRxU"
      },
      {
        id: 17,
        title: "Jolene",
        artist: "Dolly Parton",
        year: 1973,
        uri: "spotify:track:5fdhThPDe6jQQDqCyWrdAn"
      },
      {
        id: 18,
        title: "Stuck In The Middle With You",
        artist: "Stealers Wheel",
        year: 1973,
        uri: "spotify:track:4090PyjhaukeGh0c93jh1Y"
      },
      {
        id: 19,
        title: "Start Me Up",
        artist: "The Rolling Stones",
        year: 1981,
        uri: "spotify:track:7HKez549fwJQDzx3zLjHKC"
      },
      {
        id: 20,
        title: "You Can't Hurry Love",
        artist: "Phil Collins",
        year: 1982,
        uri: "spotify:track:4YwbSZaYeYja8Umyt222Qf"
      },
      {
        id: 21,
        title: "Holding Out For A Hero",
        artist: "Bonnie Tyler",
        year: 1984,
        uri: "spotify:track:5Hyr47BBGpvOfcykSCcaw9"
      },
      {
        id: 22,
        title: "Careless Whisper",
        artist: "George Michael (Wham!)",
        year: 1984,
        uri: "spotify:track:2R7858bg0GHuBBxjTyOL7N"
      },
      {
        id: 23,
        title: "Children's Story",
        artist: "Slick Rick",
        year: 1988,
        uri: "spotify:track:7fZvt74249k2rH03itW8um"
      },
      {
        id: 24,
        title: "Still D.R.E.",
        artist: "Dr. Dre ft. Snoop Dogg",
        year: 1999,
        uri: "spotify:track:6ltPEsP4edATzvinHOzvk2"
      },
      {
        id: 25,
        title: "Whiskey in the Jar",
        artist: "The Pogues & The Dubliners",
        year: 1990,
        uri: "spotify:track:1rJCuds0vDMAjF5RdZU7bq"
      },
      {
        id: 26,
        title: "Insane In the Brain",
        artist: "Cypress Hill",
        year: 1993,
        uri: "spotify:track:1oTHteQbmJw15rPxPVXUTv"
      },
      {
        id: 27,
        title: "Enjoy the Silence",
        artist: "Depeche Mode",
        year: 1990,
        uri: "spotify:track:6WK9dVrRABMkUXFLNlgWFh"
      },
      {
        id: 28,
        title: "Ray of Light",
        artist: "Madonna",
        year: 1998,
        uri: "spotify:track:4Fpsa3pYc3gozrxHRRPvR6"
      },
      {
        id: 29,
        title: "Champagne Supernova",
        artist: "Oasis",
        year: 1996,
        uri: "spotify:track:4pl3KL59qGPUUeNeYwPrOn"
      },
      {
        id: 30,
        title: "Regulate",
        artist: "Warren G & Nate Dogg",
        year: 1994,
        uri: "spotify:track:68pWLkspLFIfIPPtzyTkQy"
      },
      {
        id: 31,
        title: "Omen",
        artist: "The Prodigy",
        year: 2009,
        uri: "spotify:track:144adL7pGHEWRwute2wxzZ"
      },
      {
        id: 32,
        title: "Feel Good Inc.",
        artist: "Gorillaz",
        year: 2005,
        uri: "spotify:track:0d28khcov6AiegSCpG5TuT"
      },
      {
        id: 33,
        title: "Pon de Replay",
        artist: "Rihanna",
        year: 2005,
        uri: "spotify:track:4TsmezEQVSZNNPv5RJ65Ov"
      },
      {
        id: 34,
        title: "Harder, Better, Faster, Stronger",
        artist: "Daft Punk",
        year: 2001,
        uri: "spotify:track:5W3cjX2J3tjhG8zb6u0qHn"
      },
      {
        id: 35,
        title: "Frontier Psychiatrist",
        artist: "The Avalanches",
        year: 2000,
        uri: "spotify:track:46Xfa8fSQQlq9WZWqVtowP"
      },
      {
        id: 36,
        title: "Fredrik Snortare och Cecilia Synd",
        artist: "Petter",
        year: 2004,
        uri: "spotify:track:0I7B4cDM2Rqh6uxn00BU7m"
      },
      {
        id: 37,
        title: "Midnight City",
        artist: "M83",
        year: 2011,
        uri: "spotify:track:6M9DkAAuh4ibDchrc8GBAn"
      },
      {
        id: 38,
        title: "The Edge Of Glory",
        artist: "Lady Gaga",
        year: 2011,
        uri: "spotify:track:57F80059mWaWFvWG3tBTbO"
      },
      {
        id: 39,
        title: "Negotiation's Over",
        artist: "OGRE Sound",
        year: 2014,
        uri: "spotify:track:19Oy2pBYfpz7OhraQQgUn8"
      },
      {
        id: 40,
        title: "Rats",
        artist: "Ghost",
        year: 2018,
        uri: "spotify:track:0g49s0Nl5LTXLKATAZ7Vfx"
      },
      {
        id: 41,
        title: "This Is America",
        artist: "Childish Gambino",
        year: 2018,
        uri: "spotify:track:0b9oOr2ZgvyQu88wzixux9"
      },
      {
        id: 42,
        title: "August",
        artist: "Taylor Swift",
        year: 2020,
        uri: "spotify:track:6nK2pIKFcRc5frrZKHgsiT"
      },
      {
        id: 43,
        title: "Make It Bun Dem",
        artist: "Skrillex & Damian Marley",
        year: 2012,
        uri: "spotify:track:6AbVJjzv7thIvmMCuhZrmK"
      },
      {
        id: 44,
        title: "Radioactive",
        artist: "Imagine Dragons",
        year: 2012,
        uri: "spotify:track:62yJjFtgkhUrXktIoSjgP2"
      },
      {
        id: 45,
        title: "Pompeii",
        artist: "Bastille",
        year: 2013,
        uri: "spotify:track:4Ub8UsjWuewQrPhuepfVpd"
      },
      {
        id: 46,
        title: "Thinking Out Loud",
        artist: "Ed Sheeran",
        year: 2014,
        uri: "spotify:track:34gCuhDGsG4bRPIf9bb02f"
      },
      {
        id: 47,
        title: "Booty Swing",
        artist: "Parov Stelar",
        year: 2012,
        uri: "spotify:track:3sMleqdCDalZ6xsAQe8xuY"
      },
      {
        id: 48,
        title: "La Foule",
        artist: "Édith Piaf",
        year: 1957,
        uri: "spotify:track:2xZfPZxInlDXDKc6NDts8Z"
      },
      {
        id: 49,
        title: "Johnny B. Goode",
        artist: "Chuck Berry",
        year: 1958,
        uri: "spotify:track:3BUQFs6aFWh7EFNmI8bfL7"
      },
      {
        id: 50,
        title: "My Way",
        artist: "Frank Sinatra",
        year: 1969,
        uri: "spotify:track:3spdoTYpuCpmq19tuD0bOe"
      },
      {
        id: 51,
        title: "I Wanna Be Your Dog",
        artist: "The Stooges",
        year: 1969,
        uri: "spotify:track:672N8DGGTOLCOgWe0koX5g"
      },
      {
        id: 52,
        title: "Apache",
        artist: "The Shadows",
        year: 1960,
        uri: "spotify:track:0sZy1HE2aGBQABHfVRQ4jB"
      },
      {
        id: 53,
        title: "Fire",
        artist: "Arthur Brown",
        year: 1968,
        uri: "spotify:track:6cVdoWiwNGbmE6tcpZ2GSc"
      },
      {
        id: 54,
        title: "Stand By Me",
        artist: "Ben E. King",
        year: 1961,
        uri: "spotify:track:2KQM3kDM0zMBC9iynePBbS"
      },
      {
        id: 55,
        title: "Hush",
        artist: "Deep Purple",
        year: 1968,
        uri: "spotify:track:2Vim06YsRb4uJRpbeq6NR6"
      },
      {
        id: 56,
        title: "Où Vont Les Fleurs",
        artist: "Marlene Dietrich",
        year: 1962,
        uri: "spotify:track:48WCF9E4567maRpSiU9iAg"
      },
      {
        id: 57,
        title: "Hole in the Sky",
        artist: "Black Sabbath",
        year: 1975,
        uri: "spotify:track:3tBpWEYYV6TK3PdkY8GLer"
      },
      {
        id: 58,
        title: "London Calling",
        artist: "The Clash",
        year: 1979,
        uri: "spotify:track:5jzma6gCzYtKB1DbEwFZKH"
      },
      {
        id: 59,
        title: "Mr. Blue Sky",
        artist: "Electric Light Orchestra",
        year: 1977,
        uri: "spotify:track:2RlgNHKcydI9sayD2Df2xp"
      },
      {
        id: 60,
        title: "Blame it on the Boogie",
        artist: "The Jacksons",
        year: 1978,
        uri: "spotify:track:3qI94hINNNeb4S7xQi18lS"
      },
      {
        id: 61,
        title: "Sing, Sing, Sing",
        artist: "Benny Goodman",
        year: 1937,
        uri: "spotify:track:5L8ta4ECl5zeA6bGqY7G38"
      }
    ];

    return {
      deck: randomOrder(deck)
    };
  }
});
</script>
