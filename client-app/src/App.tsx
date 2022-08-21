import "./App.css";
import DefaultLayout from "./components/layout/DefaultLayout";
import Router from "./router";

function App() {
  return (
    <DefaultLayout>
        <Router />
    </DefaultLayout>
  );
}

export default App;
