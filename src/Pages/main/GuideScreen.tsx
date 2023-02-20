import { useStore, useDateStore } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
import { Box } from "@mui/material";
import kidsBackground2 from "../../Assests/Pictures/kidsBackground2.png";
import "./mainscreen.css";
export const GuideScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);

  return (
    <Box>
      <h1 className="heading">Welcome Back {user.first_name}!</h1>
      <h3 className="heading">
        Here is your Scedule for {dayOfWeek}, {today.toDateString()}
      </h3>
      <div className="boxes">
        <BoxOfChildrenEachHour hour={"00:00"} />
        <BoxOfChildrenEachHour hour={"15:00"} />
        <BoxOfChildrenEachHour hour={"15:30"} />
        <BoxOfChildrenEachHour hour={"else"} />
        <img src={kidsBackground2} alt="" className="threeKidsRight" />
        <img src={kidsBackground2} alt="" className="threeKidsLeft" />
      </div>
    </Box>
  );
};
