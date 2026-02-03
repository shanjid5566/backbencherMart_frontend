import { Route, Routes } from "react-router";
import HomeLayout from "./layouts/homeLayout/HomeLayout";
import HomePage from "./pages/HomePage";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
