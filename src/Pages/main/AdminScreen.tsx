import { useStore, useDateStore, useAdminState } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { AdminException } from "../../Components/AdminException";

export const AdminScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const screentypeAdmin = useAdminState((state) => state.screentypeAdmin);
  const setScreentypeAdmin = useAdminState((state) => state.setScreentypeAdmin);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreferenceType: string
  ) => {
    if (newPreferenceType !== null) {
      setScreentypeAdmin(newPreferenceType);
    }
  };

  return (
    <Box>
      <ToggleButtonGroup
        color="primary"
        value={screentypeAdmin}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="main">Main</ToggleButton>
        <ToggleButton value="else">Exceptions</ToggleButton>
      </ToggleButtonGroup>

      <Typography variant="h3" gutterBottom>
        Hey Admin {user.first_name}
      </Typography>
      {screentypeAdmin === "main" ? (
        <>
          <Typography variant="h5" gutterBottom>
            Schedule for {dayOfWeek}
          </Typography>
          <BoxOfChildrenEachHour hour={"00:00"} />
          <BoxOfChildrenEachHour hour={"15:00"} />
          <BoxOfChildrenEachHour hour={"15:30"} />
          <BoxOfChildrenEachHour hour={"else"} />
        </>
      ) : screentypeAdmin === "else" ? (
        <>
          <Typography variant="h5" gutterBottom>
            Want to enter an Exception for &nbsp;
            {today.toDateString()} ?
          </Typography>
          <AdminException />
        </>
      ) : null}
    </Box>
  );
};
