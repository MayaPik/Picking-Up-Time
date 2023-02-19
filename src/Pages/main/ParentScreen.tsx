import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
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
      <h1>Hello Parent of {user?.first_name}</h1>

      {screentype === "fixed" ? (
        <h3>
          Are there any days you want to pick {user?.first_name} in the same
          hour?
        </h3>
      ) : (
        <h3>Welcome Back! When do you want to pick up {user?.first_name}? </h3>
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
