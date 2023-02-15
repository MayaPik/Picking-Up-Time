import { PickingUpComponent } from "./PickingUpComponent";
import { useStore } from "../store";

export const ParentFixed: React.FC = () => {
  const username = useStore((state) => state.username);

  return (
    <div>
      <h1>Hello Parent of {username}</h1>
      <h3>Are there any days you want to pick {username} in the same hour?</h3>
      <PickingUpComponent />
    </div>
  );
};
