/* eslint-disable @typescript-eslint/camelcase */
import { computed, ComputedRef, ref } from "vue";
import { spotify } from "@/services/spotify";
import { Api, DevicesResponse, State } from "./type";

// This file uses the Composition API
// to build a stateful api. State is shared globally.

const _authId = ref<string | undefined>(undefined);
const _deviceId = ref<string | undefined>(undefined);
const _errorMsg = ref<string | undefined>(undefined);
const _playing = ref<boolean>(false);
const _loading = ref<Promise<any> | undefined>(undefined);
const _currentTrackUri = ref<string | undefined>(undefined);

// Reactive copy of the current state.
const publicState = computed<State>(() => {
  if (_loading.value !== undefined) {
    return { kind: "loading" };
  } else if (_errorMsg.value !== undefined) {
    return { kind: "error", message: _errorMsg.value };
  } else if (_authId.value !== undefined && _deviceId.value !== undefined) {
    return {
      kind: "connected",
      authId: _authId.value,
      deviceId: _deviceId.value,
      playing: _playing.value
    };
  } else {
    return { kind: "not_connected" };
  }
});

function httpErrorGuard<T extends { status: number }>(
  callback: (res: T) => void
) {
  return (res: T) => {
    if (200 <= res.status && res.status <= 299) {
      callback(res);
    }
  };
}

function asyncAction<T>(action: Promise<T>) {
  if (_loading.value !== undefined) {
    return Promise.reject("Already processing");
  }
  _loading.value = action;
  return action.finally(() => {
    _loading.value = undefined;
  });
}

function resolveJson<T>(): (resp: Response) => Promise<T> {
  return resp => resp.json();
}

async function handleAsyncError({ msg }: any) {
  _errorMsg.value = msg;
}

async function connectRaw() {
  const id = await spotify.connect().then(({ authId }) => authId);

  _authId.value = id;

  const { devices } = await spotify
    .auth(_authId.value)
    .get("/me/player/devices")
    .then(resolveJson<DevicesResponse>());

  const activeDevice = devices.find(({ is_active }) => is_active) ?? devices[0];

  if (activeDevice === undefined) {
    return Promise.reject(
      new Error("Please open spotify on one of your devices.")
    );
  }

  _deviceId.value = activeDevice.id;
  _errorMsg.value = undefined;
  return Promise.resolve();
}

async function connect() {
  return asyncAction(connectRaw()).catch(e => {
    handleAsyncError({ msg: e.message });
  });
}

async function play() {
  if (publicState.value.kind === "connected") {
    const { authId } = publicState.value;
    await asyncAction(spotify.auth(authId).put("/me/player/play")).then(
      httpErrorGuard(() => {
        _playing.value = true;
      })
    );
  }
}

async function playTrack(trackUri: string) {
  if (publicState.value.kind === "connected") {
    const { authId } = publicState.value;
    if (trackUri === _currentTrackUri.value) {
      return play();
    }

    return asyncAction(
      spotify.auth(authId).put("/me/player/play", {
        body: JSON.stringify({ uris: [trackUri] })
      })
    )
      .then(
        httpErrorGuard(() => {
          _playing.value = true;
          _currentTrackUri.value = trackUri;
        })
      )
      .catch(handleAsyncError);
  }
}

async function pause() {
  if (publicState.value.kind === "connected") {
    const { authId } = publicState.value;
    await asyncAction(spotify.auth(authId).put("/me/player/pause")).then(
      httpErrorGuard(() => {
        _playing.value = false;
      })
    );
  }
}

export default function api(): ComputedRef<Api> {
  return computed(() => {
    switch (publicState.value.kind) {
      case "loading":
        return { kind: publicState.value.kind };
      case "not_connected":
        return {
          kind: publicState.value.kind,
          connect
        };
      case "error":
        return {
          kind: publicState.value.kind,
          message: publicState.value.message,
          connect
        };
      case "connected":
        return {
          kind: publicState.value.kind,
          playing: publicState.value.playing,
          authId: publicState.value.authId,
          deviceId: publicState.value.deviceId,
          play,
          playTrack,
          pause
        };
      default: {
        throw "Should never happen...";
      }
    }
  });
}
