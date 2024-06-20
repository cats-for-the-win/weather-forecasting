
import Topbuttons from "./components/Topbuttons";
import SearchInput from "./components/SearchInput";
function App() {
  return (
    <div className="mx-auto max-w-screen-lg mt-4 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 from-cyan-200 to-blue-800">
    <Topbuttons />
    <SearchInput/>
      </div>
  );
};

export default App;