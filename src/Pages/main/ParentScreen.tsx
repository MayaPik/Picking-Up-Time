import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { PickingUpComponent } from "../../Components/PickingUpComponent";
import { useParentStore, useStore } from "../../store";

export const ParentScreen: React.FC = () => {
  const screentype = useParentStore((state) => state.screentype);
  const setScreentype = useParentStore((state) => state.setScreentype);
  const user = useStore((state) => state.user);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreferenceType: string
  ) => {
    if (newPreferenceType !== null) {
      setScreentype(newPreferenceType);
    }
  };

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Hello Parent of {user?.first_name}
      </Typography>

      {screentype === "fixed" ? (
        <Typography variant="h5" gutterBottom>
          Are there any days you want to pick {user?.first_name} in the same
          hour?
        </Typography>
      ) : (
        <Typography variant="h5" gutterBottom>
          Welcome Back! When do you want to pick up {user?.first_name}?{" "}
        </Typography>
      )}
      <ToggleButtonGroup
        color="primary"
        value={screentype}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="ongoing">Ongoing</ToggleButton>
        <ToggleButton value="fixed">Fixed</ToggleButton>
      </ToggleButtonGroup>
      <PickingUpComponent />
    </Box>
  );
};
