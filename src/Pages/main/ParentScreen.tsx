import { Box, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { PickingUpComponent } from "../../Components/PickingUpComponent";
import { useParentStore, useStore } from "../../store";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import kidsBackground2 from "../../Assests/Pictures/kidsBackground2.png";

export const ParentScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const screentype = useParentStore((state) => state.screentype);
  const setScreentype = useParentStore((state) => state.setScreentype);
  const language = useStore((state) => state.language);

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
        {language === "eng"
          ? `Welcome Back, Parent of ${user?.english_name}`
          : `ברוכים הבאים, ההורים של ${user?.first_name}`}
        &nbsp;
        <span className="show">
          <Diversity1Icon fontSize="large" />
        </span>
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
            {language === "eng"
              ? "Update One-Time Pickup hours"
              : " עדכון שעת איסוף חד פעמית"}
          </ToggleButton>
          <ToggleButton value="fixed">
            {language === "eng"
              ? " Update Constant Pickup Hours"
              : " עדכון שעת איסוף קבועה"}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      <br />
      {screentype === "fixed" ? (
        <h3 className="heading">
          {language === "eng"
            ? `  Are there any days you want to pick ${user?.english_name} in the same
            hour?`
            : `האם יש ימים קבועים שאתם רוצים לאסוף את ${user?.first_name}`}
        </h3>
      ) : (
        <h3 className="heading">
          {language === "eng"
            ? `When do you want to pick up ${user?.english_name}`
            : `מתי אתם רוצים לאסוף את ${user?.first_name} ?`}
        </h3>
      )}

      <PickingUpComponent />
      <div className="group">
        <img src={kidsBackground2} alt="" className="threeKidsRight" />
        <img src={kidsBackground2} alt="" className="threeKidsLeft" />
      </div>
    </Box>
  );
};
