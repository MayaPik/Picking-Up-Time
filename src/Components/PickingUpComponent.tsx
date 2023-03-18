import { useState } from "react";
import { Box, BottomNavigation, BottomNavigationAction } from "@mui/material";
import { BoxOfOptions } from "./BoxOfOptions";
import { useParentStore, useDateStore, useStore } from "../store";
import "./components.css";

export const PickingUpComponent: React.FC = () => {
  const screentype = useParentStore((state) => state.screentype);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const HebDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי"];
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const language = useStore((state) => state.language);
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
        {language === "eng"
          ? days.map((day, index) => {
              return (
                <BottomNavigationAction key={index} label={day} value={day} />
              );
            })
          : HebDays.map((day, index) => {
              return (
                <BottomNavigationAction
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                  }}
                  key={index}
                  label={day}
                  value={days[index]}
                />
              );
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
