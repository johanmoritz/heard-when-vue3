<template>
  <MusicPlayerView>
    <template v-slot:status>
      <span>{{ msg }}</span>
    </template>
    <button :disabled="!canPlay" @click="play">
      Play
    </button>
    <button :disabled="!canPause" @click="pause">
      Pause
    </button>
    <button :disabled="!canConnect" @click="connect">
      Connect
    </button>
  </MusicPlayerView>
</template>

<script lang="ts">
import { defineComponent, computed, toRefs, onBeforeUnmount } from "vue";
import music from "@/store/music";
import MusicPlayerView from "./MusicPlayerView.vue";

export default defineComponent({
  components: { MusicPlayerView },
  props: {
    songId: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { songId } = toRefs(props);
    const api = music();

    const msg = computed(() => {
      const current = api.value;
      return current.kind === "loading"
        ? "Loading..."
        : current.kind === "connected"
        ? "Ready."
        : current.kind === "error"
        ? current.message
        : "Please connect to Spotify.";
    });

    const canPlay = computed(
      () => api.value.kind === "connected" && !api.value.playing
    );
    const canPause = computed(
      () => api.value.kind === "connected" && api.value.playing
    );

    const canConnect = computed(() => api.value.kind !== "loading");

    const play = () => {
      if (api.value.kind === "connected") {
        api.value.playTrack(songId.value);
      }
    };

    const pause = () => {
      if (api.value.kind === "connected") {
        api.value.pause();
      }
    };

    const connect = () => {
      if (api.value.kind !== "connected" && api.value.kind !== "loading") {
        api.value.connect();
      }
    };

    onBeforeUnmount(() => {
      pause();
    });

    return {
      play,
      pause,
      connect,
      msg,
      canPlay,
      canPause,
      canConnect
    };
  }
});
</script>
