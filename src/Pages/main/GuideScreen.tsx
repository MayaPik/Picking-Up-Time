import { useStore } from "../../store";

export const GuideScreen: React.FC = () => {
  const username = useStore((state) => state.username);
  const guideid = useStore((state) => state.userid);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const currentDay = new Date().getDay();

  return (
    <div>
      <h1>
        Hey guide {username} guide id:{guideid}
      </h1>
      <h3>Scedule for {days[currentDay]}</h3>
    </div>
  );
};
