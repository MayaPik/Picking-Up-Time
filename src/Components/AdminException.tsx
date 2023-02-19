import { FunctionComponent, useState, useEffect } from "react";
import { Autocomplete, Box, TextField, Button } from "@mui/material";
import { useStore, useDateStore } from "../store";

interface Child {
  childid: number;
  first_name: string;
  last_name: string;
  class: number;
  time?: string;
}

export const AdminException: FunctionComponent = () => {
  const [ListOfChildren, setListOfChildren] = useState<Array<Child>>([]);
  const [childChosen, setchildChosen] = useState<Child | null>(null);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const [timeValue, setTimeValue] = useState("");
  const [message, setMessage] = useState("");

  const backend = useStore((state) => state.backend);

  useEffect(() => {
    const getChildrenList = async () => {
      try {
        let url = `${backend}/api/getAllChildren`;
        const response = await fetch(url);
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
  }, [backend]);

  const handleTimeChange = (event: any) => {
    const inputTime = event.currentTarget.value;
    setTimeValue(inputTime);
  };
  const handleSubmit = async () => {
    if (/^1[2-5]:[0-5]\d$/.test(timeValue)) {
      try {
        const response = await fetch(
          `https://mayo-final-project.herokuapp.com/api/updateongoingtimes`,
          {
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
          }
        );
        if (response.ok) {
          setMessage("Data updated successfully.");
        } else {
          setMessage("not a valid time, please write - HH:MM");
        }
      } catch (err) {
        setMessage("not a valid time, please write - HH:MM");
      }
    }
  };
  return (
    <Box>
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
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Choose a child" />
          )}
        />
      )}
      {childChosen !== null && (
        <>
          <TextField
            required
            label="Required"
            value={timeValue}
            onChange={handleTimeChange}
            inputProps={{
              inputMode: "numeric",
              pattern: "^1[2-5]:[0-5]\\d$",
              maxLength: 5,
            }}
          />
          <Button onClick={handleSubmit}>Submit</Button>
          {message && <p>{message}</p>}
        </>
      )}
    </Box>
  );
};
