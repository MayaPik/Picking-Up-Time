import { useState } from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { BoxOfOptions } from "./BoxOfOptions";
import { useParentStore } from "../store";

export const PickingUpComponent: React.FC = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const currentDay = new Date().getDay();
  const [today, setToday] = useState(currentDay);
  const screentype = useParentStore((state: any) => state.screentype);

  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={screentype === "ongoing" ? today : today}
        onChange={(event: any, newValue: number) => {
          setToday(newValue);
        }}
      >
        {days.map((day, index) => {
          return (
            <BottomNavigationAction
              key={index}
              label={day}
              value={index}
              disabled={
                screentype === "ongoing" && days.indexOf(day) < currentDay
              }
            />
          );
        })}
      </BottomNavigation>
      <br></br>
      <BoxOfOptions day={today} />
    </Box>
  );
};
