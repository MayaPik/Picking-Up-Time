import { useStore } from "../../store";

export const AdminScreen: React.FC = () => {
  const username = useStore((state) => state.username);

  return (
    <div>
      <h1>Hey admin {username}</h1>
    </div>
  );
};
