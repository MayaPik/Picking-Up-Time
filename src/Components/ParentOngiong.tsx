import { PickingUpComponent } from "./PickingUpComponent";
import { useStore } from "../store";

export const ParentOngoing: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Hello Parent of {user.first_name}</h1>
      <h3>Welcome Back! When do you want to pick up {user.first_name}?</h3>
      <PickingUpComponent />
    </div>
  );
};
