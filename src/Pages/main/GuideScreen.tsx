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
  const language = useStore((state) => state.language);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Array<EachChild>>([]);

  const todayDate: string = `${today.getFullYear()}-${Number(
    today.getMonth() + 1
  )}-${today.getDate()}`;

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
      <h1 className="heading">
        {language === "eng"
          ? `Welcome Back ${user.english_name}`
          : `${user.first_name} ברוכ/ה הבא/ה `}
        !
      </h1>
      <h3 className="heading">
        {language === "eng"
          ? ` Here is your Scedule for ${dayOfWeek}, ${today.toDateString()}`
          : ` ${today.toDateString()}, ${convertToHebrewDayOfWeek(
              dayOfWeek
            )}לוח הזמנים שלך ל`}
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
            language === "eng" ? (
              "There are no message for today right now"
            ) : (
              "אין הודעות חדשות כרגע"
            )
          ) : (
            <ul>
              {messages.map((each: EachChild) => (
                <li key={each.childid}>
                  {language === "eng" ? (
                    <span>
                      A message from {each.first_name} {each.last_name} parents:{" "}
                      {each?.message}
                    </span>
                  ) : (
                    <span>
                      :{each.last_name} {each.first_name} הודעה חדשה מההורים של
                      {each?.message}
                    </span>
                  )}
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
