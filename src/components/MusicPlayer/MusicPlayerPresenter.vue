<template>
  <MusicPlayerView>
    <template v-slot:guide>
      <div class="guide-box">
        <GuideText v-if="!(isConnected || isLoading)" v-show="guideVisible">
          <p>
            Try playing in your external Spotify app and then press play. You
            can read more in the manual to the right.
          </p>
        </GuideText>
      </div>
    </template>
    <template v-slot:spotify>
      <img src="@/assets/spotify.png" class="large-icon" />
    </template>
    <template v-slot:status>
      <span>{{ msg }}</span>
    </template>
    <div class="control-container">
      <button class="control" :disabled="!isConnected" @click="togglePlayPause">
        <img :src="controlSrc" class="small-icon" />
      </button>
      <Btn class="btn btn-connect">
        <button :disabled="!canConnect" @click="connect">
          Connect
        </button>
      </Btn>
    </div>
  </MusicPlayerView>
</template>

<script lang="ts">
import {
  defineComponent,
  computed,
  toRefs,
  onBeforeUnmount,
  onMounted
} from "vue";
import music from "@/store/music";
import MusicPlayerView from "./MusicPlayerView.vue";
import Btn from "@/components/Btn.vue";
import GuideText from "@/components/GuideText.vue";

export default defineComponent({
  components: { MusicPlayerView, Btn, GuideText },
  props: {
    songId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      guideVisible: false
    };
  },
  created() {
    setTimeout(() => (this.guideVisible = true), 10000);
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

    const isPlaying = computed(
      () => api.value.kind === "connected" && api.value.playing
    );

    const isConnected = computed(() => api.value.kind === "connected");
    const isLoading = computed(() => api.value.kind === "loading");

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

    onMounted(() => {
      play();
    });

    onBeforeUnmount(() => {
      pause();
    });

    const togglePlayPause = () => {
      isPlaying.value ? pause() : play();
    };

    const controlSrc = computed(() => {
      return isPlaying.value
        ? require("@/assets/pause.png")
        : require("@/assets/play.png");
    });

    return {
      play,
      pause,
      connect,
      msg,
      isPlaying,
      isConnected,
      isLoading,
      canConnect,
      togglePlayPause,
      controlSrc
    };
  }
});
</script>

<style>
.small-icon {
  width: 3em;
}
.large-icon {
  width: 3.5em;
}
</style>
