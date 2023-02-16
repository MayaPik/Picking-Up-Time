import { useStore } from "../../store";

export const AdminScreen: React.FC = () => {
  const user = useStore((state) => state.user);

  return (
    <div>
      <h1>Hey admin {user.first_name}</h1>
    </div>
  );
};
