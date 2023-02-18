import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStore } from "../store";
interface LoginScreenProps {
  day: string;
  screentype: string;
}

interface Option {
  name: string;
  value: string;
  id: string;
}

export const BoxOfOptions: React.FC<LoginScreenProps> = ({
  day,
  screentype,
}) => {
  const [pickingUpTime, setPickingUpTime] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const user = useStore((state) => state.user);

  const options: Option[] = [
    { name: "not staying", value: "00:00", id: "not_staying" },
    { name: "15:00", value: "15:00", id: "15:00" },
    { name: "15:30", value: "15:30", id: "15:30" },
    { name: "after 15:45", value: "", id: "after_15:45" },
  ];

  const getCurrentWeekDayDate = (weekday: string): Date => {
    const weekdayIndex = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
    ].indexOf(weekday);
    const today = new Date();
    const currentDay = today.getDay();
    const daysUntilWeekday = (weekdayIndex + 7 - currentDay) % 7;
    const targetDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + daysUntilWeekday
    );
    return targetDay;
  };

  useEffect(() => {
    setDate(getCurrentWeekDayDate(day));
  }, [day]);

  const handleChange = (event: SelectChangeEvent) => {
    setPickingUpTime(event.target.value as string | null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://mayo-final-project.herokuapp.com/api/update${screentype}times`,
        {
          method: "POST",
          body: JSON.stringify({
            childid: user.childid,
            day: day,
            time: pickingUpTime,
            date: date,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Data updated successfully.");
        setMessage("Data updated successfully.");
      } else {
        console.error("Error updating data.");
        setMessage("Error updating data.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error updating data.");
    }
  };
  return (
    <Box>
      <Card>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pickup time</InputLabel>
          <Select
            value={pickingUpTime || ""}
            onChange={handleChange}
            type="time"
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {screentype === "fixed" ? (
          <p>
            <input type={"checkbox"} required></input>i understand that this
            will be saved
          </p>
        ) : (
          date?.toDateString()
        )}
        <br />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
      {message && <div>{message}</div>}
    </Box>
  );
};
