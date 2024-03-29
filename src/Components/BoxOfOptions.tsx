import { useState } from "react";
import { useStore } from "../store";
import {
  Box,
  Button,
  Card,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  SelectChangeEvent,
  Alert,
  TextField,
} from "@mui/material";
import "./components.css";
interface LoginScreenProps {
  chosenDay: string;
  chosenDate: Date;
  screentype: string;
}
interface Option {
  name: string;
  value: string;
}

export const BoxOfOptions: React.FC<LoginScreenProps> = ({
  chosenDay,
  screentype,
  chosenDate,
}) => {
  const user = useStore((state) => state.user);
  const server = useStore((state) => state.server);
  const language = useStore((state) => state.language);

  const [pickingUpTime, setPickingUpTime] = useState<string | null>("15:00");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [userMessage, setUserMessage] = useState<string>("");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const options: Option[] = [
    { name: "Not staying", value: "00:00" },
    { name: "15:00", value: "15:00" },
    { name: "15:30", value: "15:30" },
    { name: "After 15:45 (Defualt)", value: "after_hours" },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setPickingUpTime(event.target.value as string | null);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let timeValue: string | null = pickingUpTime;
    if (pickingUpTime === "after_hours") {
      timeValue = null;
    }
    let messageValue: string | null = userMessage;
    if (userMessage === " ") {
      messageValue = null;
    }
    try {
      const response = await fetch(`${server}/api/update${screentype}times`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          childid: user.childid,
          day: chosenDay,
          time: timeValue,
          date: chosenDate.toDateString(),
          message: messageValue,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setMessage(
          `Data updated successfully. for ${
            chosenDay +
            ", " +
            (screentype === "ongoing" ? chosenDate.toDateString() : "") +
            " time: " +
            options.find((option) => option.value === pickingUpTime)?.name +
            (userMessage ? " with the message " + userMessage : "")
          } `
        );
      } else {
        setError("Error updating data.");
      }
    } catch (err) {
      setError("Error updating data.");
    }
  };

  return (
    <Box>
      <Card className="card" sx={{ backgroundColor: "whitesmoke" }}>
        {screentype === "ongoing" ? (
          <p>
            {language === "eng"
              ? `Changes will be only saved for ${chosenDate?.toDateString()}`
              : `${chosenDate?.toDateString()} שינויים ישמרו רק לתאריך ה`}
            {}
          </p>
        ) : (
          <p></p>
        )}
        <FormControl fullWidth>
          <InputLabel id="pickpuptime">
            {language === "eng" ? "Pickup time" : "זמן איסוף"}
          </InputLabel>
          <Select
            value={pickingUpTime || ""}
            onChange={handleChange}
            type="time"
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {screentype === "fixed" ? (
          <p>
            <input
              type={"checkbox"}
              onChange={handleCheckboxChange}
              checked={isChecked}
              required
            />
            {language === "eng"
              ? "I understand that this will be saved for the next times"
              : "אני מאשר/ת שהשינויים ישמרו לפעמים הבאות"}
          </p>
        ) : (
          <TextField
            sx={{ mt: 1, width: "100%" }}
            id="outlined-basic"
            label={
              language === "eng" ? "message for the guide" : "הודעה למדריכ/ה"
            }
            variant="outlined"
            value={userMessage}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUserMessage(event.target.value);
            }}
          />
        )}
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={screentype === "fixed" ? !isChecked : false}
        >
          {language === "eng" ? "Submit" : "עדכון"}
        </Button>
      </Card>
      {message && (
        <Alert severity="success" className="alert">
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" className="alert">
          {error}
        </Alert>
      )}
    </Box>
  );
};
