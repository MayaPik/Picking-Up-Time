import create from "zustand";

interface AppState {
  server: string;
  user: { [key: string]: string };
  setUser: (user: {}) => void;
  usertype: string | null;
  setUsertype: (usertype: string | null) => void;
  isLoggedIn: boolean;
}

export const useStore = create<AppState>((set) => ({
  server: "https://mayo-final-project.herokuapp.com",
  user: {},
  setUser: (user: {}) => set({ user }),
  usertype: "guide",
  setUsertype: (usertype: string | null) => set({ usertype }),
  isLoggedIn: false,
}));

interface DateState {
  today: Date;
  dayOfWeek: string;
  setToday: (today: Date) => void;
  setDayOfWeek: (dayOfWeek: string) => void;
}
export const useDateStore = create<DateState>((set) => ({
  today: new Date(),
  dayOfWeek: new Date().toLocaleDateString("en-US", { weekday: "long" }),
  setToday: (date) => set({ today: date }),
  setDayOfWeek: (day) => set({ dayOfWeek: day }),
}));

interface ParentState {
  screentype: string;
  setScreentype: (screentype: string) => void;
}

export const useParentStore = create<ParentState>((set) => ({
  screentype: "ongoing",
  setScreentype: (screentype: string) => set({ screentype }),
}));

interface AdminState {
  screentypeAdmin: string;
  setScreentypeAdmin: (screentypeAdmin: string) => void;
}

export const useAdminState = create<AdminState>((set) => ({
  screentypeAdmin: "main",
  setScreentypeAdmin: (screentypeAdmin: string) => set({ screentypeAdmin }),
}));
