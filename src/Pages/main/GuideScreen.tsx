import { useStore } from "../../store";

export const GuideScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const currentDay = new Date().getDay();

  return (
    <div>
      <h1>
        Hey guide {user.first_name} guide id {user.guideid}
      </h1>
      <h3>Scedule for {days[currentDay]}</h3>
      {/* <DisplayScreen class={class} day={days[currentDay]}/> */}
    </div>
  );
};
