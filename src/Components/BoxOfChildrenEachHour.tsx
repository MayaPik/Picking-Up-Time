import { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import { useStore, useDateStore } from "../store";
import "./components.css";

interface TimeProps {
  hour: string;
}
interface Child {
  childid: number;
  first_name: string;
  last_name: string;
  class: number;
  time?: string;
}

interface HourData {
  message: string;
  data: [];
  error_message: string;
}

const hours = [
  { time: "00:00", string: "Not Staying" },
  { time: "15:00", string: "15:00" },
  { time: "15:30", string: "15:30" },
  { time: "else", string: "Exceptions" },
];

export const BoxOfChildrenEachHour: React.FC<TimeProps> = ({ hour }) => {
  const server = useStore((state) => state.server);
  const user = useStore((state) => state.user);
  const usertype = useStore((state) => state.usertype);
  const dayOfWeek = useDateStore((state) => state.dayOfWeek);
  const today = useDateStore((state) => state.today);

  const [classNames, setClassNames] = useState<{ [key: number]: string }>({});
  const [message, setMessage] = useState("");
  const [childrenOfHour, setChildrenOfHour] = useState<Array<Child>>([]);

  const todayDate: string = `${today.getFullYear()}-${Number(
    today.getMonth() + 1
  )}-${today.getDate()}`;

  useEffect(() => {
    const getChildrenList = async () => {
      try {
        let url = `${server}/api/getAllChildrenOfHour?day=${dayOfWeek}&time=${hour}&date=${todayDate}`;
        if (usertype === "guide") {
          url += `&guideid=${user.guideid}`;
        }
        let data: HourData = { message: "", data: [], error_message: "" };
        if (user.adminid || user.guideid) {
          const response = await fetch(url, {
            credentials: "include",
          });
          data = await response.json();
        }
        if (data.message) {
          setChildrenOfHour(data.data);
          setMessage("");
        } else {
          setMessage(data.error_message);
        }
      } catch (err) {
        console.error(err);
        setMessage("Could not load");
      }
    };

    getChildrenList();
  }, [hour, user, todayDate, dayOfWeek, server, usertype]);

  useEffect(() => {
    const classIdToName = async (id: number): Promise<string> => {
      try {
        const response = await fetch(
          `${server}/api/getClassName?classid=${id}`,
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        if (data.message) {
          setClassNames((prevClassNames) => ({
            ...prevClassNames,
            [id]: data.class_name,
          }));
          return data.class_name;
        }
      } catch (err) {
        console.error(`Error in classIdToName function: ${err}`);
        setMessage("Could not load the class name");
      }
      return "";
    };

    const fetchClassNames = async () => {
      const ids = childrenOfHour.map((child) => child.class);
      const classNamesPromises = ids.map((id) => classIdToName(id));
      await Promise.all(classNamesPromises);
    };
    fetchClassNames();
  }, [childrenOfHour, server]);

  return (
    <Card>
      <Box className="each">
        <h1 className="head">
          {hours
            .filter((each) => each.time === hour)
            .map((hour) => hour.string)}{" "}
        </h1>
        {childrenOfHour.length === 0 ? (
          <p>{message}</p>
        ) : (
          <ul>
            {childrenOfHour.map((child: Child) => (
              <li key={child.childid}>
                <span>
                  {child.first_name} {child.last_name} {child?.time}
                </span>
                &nbsp;
                <span>{user.adminid ? classNames[child.class] || "" : ""}</span>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Card>
  );
};
