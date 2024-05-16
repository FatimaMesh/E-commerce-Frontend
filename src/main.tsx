import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"

import App from "./App"
import "./index.css"
import { store } from "./services/store"
import { ToastContainer } from "react-toastify"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
)
