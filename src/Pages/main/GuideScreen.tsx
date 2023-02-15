import { useStore } from "../../store";

export const GuideScreen: React.FC = () => {
  const username = useStore((state) => state.username);

  return (
    <div>
      <h1>Hey guide {username}</h1>
    </div>
  );
};
