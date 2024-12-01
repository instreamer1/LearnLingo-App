import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { lazy, Suspense } from "react";
const Layout = lazy(() => import("./components/Layout/Layout"));
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const TeachersPage = lazy(() => import("./pages/TeachersPage/TeachersPage"));
const FavoritesPage = lazy(() =>
  import("./pages/FavoritesPage/FavoritesPage.jsx")
);
const PrivateRoute = lazy(() => import("./pages/PrivateRoute.jsx"));
function App() {
  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="favorites"
            element={
              <PrivateRoute redirectTo="/teachers">
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Toaster />
    </Suspense>
  );
}

export default App;
