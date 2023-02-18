import { useStore } from "../../store";
import { BoxOfChildrenEachHour } from "../../Components/BoxOfChildrenEachHour";
export const GuideScreen: React.FC = () => {
  const user = useStore((state) => state.user);
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const currentDay = new Date().getDay();
  const today = days[currentDay];

  return (
    <div>
      <h1>
        Hey guide {user.first_name} guide id {user.guideid}
      </h1>
      <h3>Scedule for {today}</h3>
      <BoxOfChildrenEachHour hour={"00:00"} />
      <BoxOfChildrenEachHour hour={"15:00"} />
      <BoxOfChildrenEachHour hour={"15:30"} />
    </div>
  );
};
