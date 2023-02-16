import create from "zustand";

interface AppState {
  username: string | null;
  setUsername: (username: string | null) => void;
  usertype: string | null;
  setUsertype: (usertype: string | null) => void;
  userid: number | null;
  setUserid: (userid: number | null) => void;
  isLoggedIn: boolean;
  today: string | null;
  setToday: (today: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  username: null,
  setUsername: (username: string | null) => set({ username }),
  usertype: null,
  setUsertype: (usertype: string | null) => set({ usertype }),
  userid: null,
  setUserid: (userid: number | null) => set({ userid }),
  isLoggedIn: false,
  today: null,
  setToday: (today: string | null) => set({ today }),
}));

interface ParentState {
  screentype: string;
  setScreentype: (screentype: string) => void;
}

export const useParentStore = create<ParentState>((set) => ({
  screentype: "ongoing",
  setScreentype: (screentype: string) => set({ screentype }),
}));
