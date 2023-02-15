import create from "zustand";

interface AppState {
  username: string | null;
  setUsername: (username: string | null) => void;
  usertype: string | null;
  setUsertype: (usertype: string | null) => void;
  userid: number | null;
  setUsedid: (userid: number | null) => void;
  isLoggedIn: boolean;
}

export const useStore = create<AppState>((set) => ({
  username: null,
  setUsername: (username: string | null) => set({ username }),
  usertype: null,
  setUsertype: (usertype: string | null) => set({ usertype }),
  userid: null,
  setUsedid: (userid: number | null) => set({ userid }),
  isLoggedIn: false,
}));

interface ParentState {
  screentype: string;
  setScreentype: (screentype: string) => void;
}

export const useParentStore = create<ParentState>((set) => ({
  screentype: "ongoing",
  setScreentype: (screentype: string) => set({ screentype }),
}));
