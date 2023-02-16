import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useStore } from "../store";
import { StringLiteralType } from "typescript";
interface LoginScreenProps {
  day: string;
  screentype: string;
}

interface Option {
  name: string;
  value: string | undefined;
}

export const BoxOfOptions: React.FC<LoginScreenProps> = ({
  day,
  screentype,
}) => {
  const [pickingUpTime, setPickingUpTime] = useState<string | undefined>(
    undefined
  );
  const userid = useStore((state) => state.userid);

  const options: Option[] = [
    { name: "not staying", value: "not staying" },
    { name: "15:00", value: "15:00" },
    { name: "15:30", value: "15:30" },
    { name: "after 15:45", value: "" },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setPickingUpTime(event.target.value as string | undefined);
  };

  const handleSubmit = () => {
    console.log(
      `changes to make in user number ${userid}: 
      at day - ${day} picking up time is ${pickingUpTime}.
      type of change : ${screentype}`
    );
  };

  return (
    <Box>
      <Card>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Pickup time</InputLabel>

          <Select
            value={pickingUpTime}
            label="Pickup time"
            onChange={handleChange}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </Box>
  );
};
