import { PickingUpComponent } from "./PickingUpComponent";
import { useStore } from "../store";

export const ParentOngoing: React.FC = () => {
  const username = useStore((state) => state.username);

  return (
    <div>
      <h1>Hello Parent of {username}</h1>
      <h3>Welcome Back! When do you want to pick up {username}?</h3>
      <PickingUpComponent />
    </div>
  );
};
