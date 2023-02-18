import { useStore, useDateStore } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
import { Box, Typography } from "@mui/material";

export const GuideScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Hey Guide {user.first_name}
      </Typography>{" "}
      <Typography variant="h5" gutterBottom>
        Scedule for {dayOfWeek}
      </Typography>
      <BoxOfChildrenEachHour hour={"00:00"} />
      <BoxOfChildrenEachHour hour={"15:00"} />
      <BoxOfChildrenEachHour hour={"15:30"} />
      <BoxOfChildrenEachHour hour={"else"} />
    </Box>
  );
};
