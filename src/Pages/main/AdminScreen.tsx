import { useStore, useDateStore, useAdminState } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
import { Box, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { AdminException } from "../../Components/AdminException";
import kidsBackground2 from "../../Assests/Pictures/kidsBackground2.png";
import "./mainscreen.css";

export const AdminScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const screentypeAdmin = useAdminState((state) => state.screentypeAdmin);
  const setScreentypeAdmin = useAdminState((state) => state.setScreentypeAdmin);
  const language = useStore((state) => state.language);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newPreferenceType: string
  ) => {
    if (newPreferenceType !== null) {
      setScreentypeAdmin(newPreferenceType);
    }
  };

  function convertToHebrewDayOfWeek(day: string) {
    switch (day.toLowerCase()) {
      case "sunday":
        return "יום ראשון";
      case "monday":
        return "יום שני";
      case "tuesday":
        return "יום שלישי";
      case "wednesday":
        return "יום רביעי";
      case "thursday":
        return "יום חמישי";
      case "friday":
        return "יום שישי";
      case "saturday":
        return "יום שבת";
    }
  }

  return (
    <Box>
      <h1 className="heading">
        {language === "eng"
          ? `Welcome Back ${user.english_name} !`
          : `ברוכ/ה הבא/ה ${user.first_name}`}
      </h1>
      <div className="toggle">
        <ToggleButtonGroup
          color="primary"
          value={screentypeAdmin}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="main">
            {language === "eng" ? `Main Screen` : `מסך ראשי`}
          </ToggleButton>
          <ToggleButton value="else">
            {language === "eng"
              ? `Enter a manual pickup time`
              : `הזנת זמן איסוף מיוחד`}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {screentypeAdmin === "main" ? (
        <>
          <h3 className="heading">
            {language === "eng"
              ? ` Here is your Schedule for ${dayOfWeek}, ${today.toDateString()}`
              : ` ${today.toDateString()} ,לוח הזמנים שלך ל${convertToHebrewDayOfWeek(
                  dayOfWeek
                )}`}
          </h3>
          <div className="boxes">
            <BoxOfChildrenEachHour hour={"00:00"} />
            <BoxOfChildrenEachHour hour={"15:00"} />
            <BoxOfChildrenEachHour hour={"15:30"} />
            <BoxOfChildrenEachHour hour={"else"} />
          </div>
        </>
      ) : screentypeAdmin === "else" ? (
        <>
          <h3 className="heading">
            {language === "eng"
              ? `Want to enter an manual pickup time for &nbsp;
            ${today.toDateString()} ?`
              : `${today.toDateString()}רוצה להזין זמן איסוף מיוחד ל`}
          </h3>
          <AdminException />
        </>
      ) : null}
      <div className="group">
        <img src={kidsBackground2} alt="" className="threeKidsRight" />
        <img src={kidsBackground2} alt="" className="threeKidsLeft" />
      </div>
    </Box>
  );
};
