import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { ParentFixed } from "../../Components/ParentFixed";
import { ParentOngoing } from "../../Components/ParentOngiong";
import { useParentStore } from "../../store";

export const ParentScreen: React.FC = () => {
  const screentype = useParentStore((state: any) => state.screentype);
  const setScreentype = useParentStore((state: any) => state.setScreentype);

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

      {screentype === "fixed" && <ParentFixed />}
      {screentype === "ongoing" && <ParentOngoing />}
    </div>
  );
};
