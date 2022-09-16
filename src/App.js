import "./index.css";
import BeautifulDnd from "./components/react-beautiful-dnd/BeautifulDnd";

function App() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <h1>BeautifulDnd Demo</h1>
      <BeautifulDnd />
    </div>
  );
}

export default App;
