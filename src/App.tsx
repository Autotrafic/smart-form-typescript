import { createRoot } from "react-dom/client";
import SmartForm from "./SmartForm";

const rootElement = document.getElementById('root');

const root = createRoot(rootElement!);

root.render(<SmartForm />);