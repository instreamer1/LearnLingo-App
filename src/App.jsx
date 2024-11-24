import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage/HomePage";
import TeachersPage from "./pages/TeachersPage/TeachersPage";
import { Toaster } from "react-hot-toast";
import FileUpload from './components/FileUpload.jsx';
import FavoritesPage from "./pages/FavoritesPage/FavoritesPage.jsx";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route path="/favorites" element={<FavoritesPage/>}/>
          {/* <PrivateRoute path="/favorites" element={<FavoritesPage />} */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
       
      </Routes>
      <Toaster />
      {/* <FileUpload /> */}
    </>
  );
}

export default App;
