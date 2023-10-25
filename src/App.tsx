import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SellPage } from "./pages/SellPage";
import { Home } from "./pages/Home";
import { Provider } from 'react-redux';
import configureStore from './store';


function About() {
  return <h2>About</h2>;
}

function Error() {
  return <h2>404</h2>;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/sell-item",
    element: <SellPage />,
  },
  {
    path: "*",
    element: <Error />,
  },
]);
const App = () => {
  return (
    <div>
    <Provider store={configureStore}>
      <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
