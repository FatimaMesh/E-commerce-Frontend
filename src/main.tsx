import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"

import App from "./App"
import "./index.css"
import { store } from "./services/store"


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>
)
