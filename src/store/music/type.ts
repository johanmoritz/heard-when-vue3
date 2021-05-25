interface NotConnected {
  kind: "not_connected";
}

interface Error {
  kind: "error";
  message: string;
}

interface Connected {
  kind: "connected";
  authId: string;
  deviceId: string;
  playing: boolean;
}

interface Loading {
  kind: "loading";
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string; // "Smartphone" | etc.,
  volume_percent: number; // 0-100
}

type VoidAction = () => Promise<void>;

export type State = NotConnected | Error | Connected | Loading;

export type Api =
  | Loading
  | (NotConnected & { connect: VoidAction })
  | (Error & { connect: VoidAction })
  | (Connected & {
      play: VoidAction;
      pause: VoidAction;
      playTrack: (uid: string) => Promise<void>;
      connect: VoidAction;
    });

export interface DevicesResponse {
  devices: Array<Device>;
}
