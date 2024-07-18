import { useRoutes } from "react-router-dom";
import routes from "./Routes/routes";

export default function App() {
  const element = useRoutes(routes);
  return (
  <div className="container">
    {element}
    </div>
  );
}
