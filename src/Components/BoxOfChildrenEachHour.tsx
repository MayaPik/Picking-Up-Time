import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { useStore } from "../store";

interface TimeProps {
  hour: string;
}

export const BoxOfChildrenEachHour: React.FC<TimeProps> = ({ hour }) => {
  const user = useStore((state) => state.user);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const today = new Date();
  const todayDay = days[1];
  const todayDate =
    today.getFullYear() +
    "-0" +
    Number(today.getMonth() + 1) +
    "-" +
    today.getDate();

  const [message, setMessage] = useState("");
  const [childrenOfHour, setChildrenOfHour] = useState([]);

  useEffect(() => {
    const GetChildrenList = async () => {
      try {
        const response = await fetch(
          `https://mayo-final-project.herokuapp.com/api/getAllChildrenOfHour?day=${todayDay}&time=${hour}&guideid=${user.guideid}&date=${todayDate}`
        );
        const data = await response.json();
        if (data.message) {
          setMessage("");
          setChildrenOfHour(data.data);
        } else {
        }
      } catch (err) {
        console.error(err);
        setMessage("Could not load");
      }
    };

    GetChildrenList();
  }, [hour, user, todayDate, todayDay]);

  return (
    <Box>
      <Card>
        <h1>{hour}</h1>
        {childrenOfHour.length === 0 ? (
          <p>No children for this hour</p>
        ) : (
          <ul>
            {childrenOfHour.map((child: any) => (
              <li key={child.childid}>
                {child.first_name} {child.last_name}
              </li>
            ))}
          </ul>
        )}
      </Card>
      {message && <p>{message}</p>}
    </Box>
  );
};
