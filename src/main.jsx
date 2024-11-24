import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import store  from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter  future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
      </Provider>
    </React.StrictMode>
)

// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import "./index.css";
// import App from "./App";
// import { Provider } from "react-redux";
// import store from "./redux/store";

// const router = createBrowserRouter(
//   [
//     {
//       path: "/*",
//       element: <App />,
//     },
//   ],
//   {
//     future: {
//       v7_relativeSplatPath: true,
//       v7_startTransition: true,
//       v7_fetcherPersist: true,
//       v7_normalizeFormMethod: true,
//       v7_partialHydration: true,
//       v7_skipActionErrorRevalidation: true,
//     },
//   }
// );

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <Provider store={store}>
//       <RouterProvider router={router} />
//     </Provider>
//   </StrictMode>
// );
