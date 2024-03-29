import { FunctionComponent, useState, useEffect } from "react";
import { Autocomplete, Box, TextField, Button, Alert } from "@mui/material";
import { useStore, useDateStore } from "../store";
import "./components.css";
interface Child {
  childid: number;
  first_name: string;
  last_name: string;
  class: number;
  time?: string;
}

export const AdminException: FunctionComponent = () => {
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const server = useStore((state) => state.server);
  const language = useStore((state) => state.language);

  const [ListOfChildren, setListOfChildren] = useState<Array<Child>>([]);
  const [childChosen, setchildChosen] = useState<Child | null>(null);
  const [timeValue, setTimeValue] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const getChildrenList = async () => {
      try {
        let url = `${server}/api/getAllChildren`;
        const response = await fetch(url, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.message) {
          setListOfChildren(data.data);
        } else {
          console.log(data.error_message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getChildrenList();
  }, [server]);

  const handleTimeChange = (event: any) => {
    let value = event.target.value.replace(/\D/g, "");
    if (value.length >= 2) {
      value = value.substring(0, 2) + ":" + value.substring(2);
    }

    setTimeValue(value);
  };

  const handleSubmit = async () => {
    if (/^1[2-5]:[0-5]\d$/.test(timeValue)) {
      try {
        const response = await fetch(`${server}/api/updateongoingtimes`, {
          credentials: "include",
          method: "POST",
          body: JSON.stringify({
            childid: childChosen?.childid,
            day: dayOfWeek,
            time: timeValue,
            date: today.toDateString(),
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          setMessage("Data updated successfully.");
        } else {
          setError("not a valid time, please write - HH:MM");
        }
      } catch (err) {
        setError("not a valid time, please write - HH:MM");
      }
    }
  };
  return (
    <Box>
      <div className="childlist">
        {ListOfChildren && (
          <Autocomplete
            disablePortal
            value={childChosen}
            onChange={(event: any, newValue: Child | null) => {
              setchildChosen(newValue);
            }}
            id="autocomplete"
            options={ListOfChildren}
            getOptionLabel={(child) => child.first_name + " " + child.last_name}
            isOptionEqualToValue={(option, value) =>
              option.childid === value.childid
            }
            sx={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={language === "eng" ? "Choose a child" : "בחר/י ילד"}
              />
            )}
          />
        )}

        {childChosen !== null && (
          <>
            <TextField
              sx={{ width: 200 }}
              required
              label={
                language === "eng" ? "Required Pickup Time" : "זמן איסוף מבוקש"
              }
              placeholder="HH:MM"
              value={timeValue}
              onChange={handleTimeChange}
              inputProps={{
                inputMode: "numeric",
                pattern: "^1[2-5]:[0-5]\\d$",
              }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              {language === "eng" ? "Submit" : "עדכון"}
            </Button>
          </>
        )}
      </div>

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
