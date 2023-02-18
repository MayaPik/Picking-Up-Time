import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { PickingUpComponent } from "../../Components/PickingUpComponent";
import { useParentStore, useStore } from "../../store";

export const ParentScreen: React.FC = () => {
  const screentype = useParentStore((state: any) => state.screentype);
  const setScreentype = useParentStore((state: any) => state.setScreentype);
  const user = useStore((state: any) => state.user);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreferenceType: string
  ) => {
    if (newPreferenceType !== null) {
      setScreentype(newPreferenceType);
    }
  };

  return (
    <div>
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
      <h1>Hello Parent of {user?.first_name}</h1>

      {screentype === "fixed" ? (
        <h3>
          Are there any days you want to pick {user?.first_name} in the same
          hour?
        </h3>
      ) : (
        <h3>Welcome Back! When do you want to pick up {user?.first_name}?</h3>
      )}
      <PickingUpComponent />
    </div>
  );
};
