import { useState, useEffect } from "react";
import { useStore, useDateStore } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
import { Box, Card } from "@mui/material";
import kidsBackground2 from "../../Assests/Pictures/kidsBackground2.png";
import "./mainscreen.css";

interface EachChild {
  childid: number;
  first_name: string;
  last_name: string;
  message: string;
}

export const GuideScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);
  const server = useStore((state) => state.server);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<EachChild>>([]);

  const todayDate: string = `${today.getFullYear()}-${Number(
    today.getMonth() + 1
  )}-${today.getDate()}`;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const url = `${server}/api/getOngoingMessages?day=${dayOfWeek}&date=${todayDate}&guideid=${user.guideid}`;
        const response = await fetch(url, { credentials: "include" });
        const data = await response.json();
        if (data.message === "Ongoing messages retrieved successfully.") {
          setMessages(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error(error);
        setMessage("Could not load ongoing messages");
      }
    };

    fetchMessages();
  }, [dayOfWeek, todayDate, user.guideid, server]);

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
      </div>
      <Card className="messages">
        <Box>
          {messages.length === 0 ? (
            "There are no message for today right now"
          ) : (
            <ul>
              {messages.map((each: EachChild) => (
                <li key={each.childid}>
                  <span>
                    A message from {each.first_name} {each.last_name} parents:{" "}
                    {each?.message}
                  </span>
                  &nbsp;
                  <span>{message && message}</span>
                </li>
              ))}
            </ul>
          )}
        </Box>
      </Card>
      <div className="group">
        <img src={kidsBackground2} alt="" className="threeKidsRight" />
        <img src={kidsBackground2} alt="" className="threeKidsLeft" />
      </div>
    </Box>
  );
};
