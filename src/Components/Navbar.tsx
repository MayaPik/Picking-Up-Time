import { useStore } from "../store";
import { Box, InputLabel, Select, MenuItem } from "@mui/material";

export const Navbar: React.FC = () => {
  const language = useStore((state) => state.language);
  const setLanguage = useStore((state) => state.setLanguage);

  function handleChangeLanguage(event: any) {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
  }

  return (
    <Box
      sx={{
        width: 120,
        paddingTop: 2,
        paddingLeft: 2,
      }}
    >
      <InputLabel id="demo-simple-select-label">Language שפה</InputLabel>
      <Select value={language} label="Age" onChange={handleChangeLanguage}>
        <MenuItem value={"eng"}>English</MenuItem>
        <MenuItem value={"heb"}>Herbrew</MenuItem>
      </Select>
    </Box>
  );
};
