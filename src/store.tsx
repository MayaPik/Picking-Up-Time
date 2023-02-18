import create from "zustand";

interface AppState {
  backend: string;
  user: { [key: string]: string };
  setUser: (user: {}) => void;
  //   username: string | null;
  //   setUsername: (username: string | null) => void;
  usertype: string | null;
  setUsertype: (usertype: string | null) => void;
  //   userid: number | null;
  //   setUserid: (userid: number | null) => void;
  isLoggedIn: boolean;
  today: string | null;
  setToday: (today: string | null) => void;
}

export const useStore = create<AppState>((set) => ({
  backend: "https://mayo-final-project.herokuapp.com",
  user: {},
  setUser: (user: {}) => set({ user }),
  //   username: null,
  //   setUsername: (username: string | null) => set({ username }),
  usertype: "child",
  setUsertype: (usertype: string | null) => set({ usertype }),
  //   userid: null,
  //   setUserid: (userid: number | null) => set({ userid }),
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
