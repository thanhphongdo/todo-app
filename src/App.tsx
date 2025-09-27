import "./App.css";
import { Layout } from "./components/layouts/Layout";
import { MainApp } from "./components/MainApp";

function App() {
  return (
    <div className="relative">
      <Layout>
        <MainApp />
      </Layout>
    </div>
  );
}

export default App;
