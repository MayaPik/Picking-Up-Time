import { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BoxOfOptions } from "./BoxOfOptions";
import { useParentStore, useDateStore } from "../store";
import "./components.css";

export const PickingUpComponent: React.FC = () => {
  const screentype = useParentStore((state) => state.screentype);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);

  const [chosenDay, setChosenday] = useState(dayOfWeek);
  const [chosenDate, setChosendate] = useState(today);

  const getCurrentWeekDayDate = (weekday: string): Date => {
    const weekdayIndex = days.indexOf(weekday);
    const currentDay = today.getDay();
    const daysUntilWeekday = (weekdayIndex + 7 - currentDay) % 7;
    const targetDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilWeekday
    );
    return targetDay;
  };

  return (
    <Box className="middle">
      <BottomNavigation
        sx={{ backgroundColor: "whitesmoke" }}
        showLabels
        value={chosenDay}
        onChange={(event: any, newValue: string) => {
          setChosenday(newValue);
          setChosendate(getCurrentWeekDayDate(newValue));
        }}
      >
        {days.map((day, index) => {
          return <BottomNavigationAction key={index} label={day} value={day} />;
        })}
      </BottomNavigation>
      <BoxOfOptions
        chosenDay={chosenDay}
        chosenDate={chosenDate}
        screentype={screentype}
      />
    </Box>
  );
};
