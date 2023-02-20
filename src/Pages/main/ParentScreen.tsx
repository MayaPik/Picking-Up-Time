import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PickingUpComponent } from "../../Components/PickingUpComponent";
import { useParentStore, useStore } from "../../store";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import kidsBackground2 from "../../Assests/Pictures/kidsBackground2.png";

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
      <h1 className="heading">
        Welcome Back, Parent of {user?.first_name} &nbsp;{" "}
        <Diversity1Icon fontSize="large" />
      </h1>
      <div className="toggle">
        <ToggleButtonGroup
          color="primary"
          value={screentype}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="ongoing">
            Update One-Time Pickup hours
          </ToggleButton>
          <ToggleButton value="fixed">
            Update Constant Pickup Hours
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <br />
      {screentype === "fixed" ? (
        <h3 className="heading">
          Are there any days you want to pick {user?.first_name} in the same
          hour?
        </h3>
      ) : (
        <h3 className="heading">
          When do you want to pick up {user?.first_name}?{" "}
        </h3>
      )}

      <PickingUpComponent />
      <img src={kidsBackground2} alt="" className="threeKidsRight" />
      <img src={kidsBackground2} alt="" className="threeKidsLeft" />
    </Box>
  );
};
