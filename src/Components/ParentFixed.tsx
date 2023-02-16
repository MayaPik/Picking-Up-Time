import { PickingUpComponent } from "./PickingUpComponent";
import { useStore } from "../store";

export const ParentFixed: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Hello Parent of {user.first_name}</h1>
      <h3>
        Are there any days you want to pick {user.first_name} in the same hour?
      </h3>
      <PickingUpComponent />
    </div>
  );
};
