import ReactDom from "react-dom/client";
import { App } from "./App";
import "./sass/index.scss"
const root = ReactDom.createRoot(document.querySelector(`#root`))

root.render(<App></App>)