import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";
import AuthenticationContext from "./context/AuthenticationContext";
import LocaleContext from "./context/LocaleContext";
import ThemeContext from "./context/ThemeContext";
import { useState, useMemo, useEffect } from "react";
import { getUserLoggedIn } from "./utils/api";

function App() {
  const [authentication, setAuthentication] = useState(null);
  const [locale, setLocale] = useState(localStorage.getItem("locale") || "en");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(true);

  const toggleLocale = () => {
    // const checkLocale = localStorage.getItem("locale");
    localStorage.setItem("locale", locale === "en" ? "id" : "en");
    setLocale((prev) => (prev === "en" ? "id" : "en"));
  };

  const toggleTheme = () => {
    // const checkTheme = localStorage.getItem("theme");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const response = await getUserLoggedIn();
        setAuthentication(response.data);
      } catch (error) {
        console.log("failed to fetch user:", error);
        setAuthentication(null);
      } finally {
        setLoading(false);
      }
    };

    getDataUser();
  }, []);

  const authenticationContextValue = useMemo(() => {
    return [authentication, setAuthentication];
  }, [authentication]);

  const localeContextValue = useMemo(() => {
    return [locale, toggleLocale];
  }, [locale]);

  const themeContextValue = useMemo(() => {
    return [theme, toggleTheme];
  }, [theme]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <AuthenticationContext.Provider value={authenticationContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <ThemeContext.Provider value={themeContextValue}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={authentication ? <Home /> : <Navigate to="/login" />}
              />
              <Route
                path="/detail/:id"
                element={
                  authentication ? <NoteDetail /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/create"
                element={
                  authentication ? <CreateNote /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/login"
                element={authentication ? <Navigate to="/" /> : <Login />}
              />
              <Route
                path="/register"
                element={authentication ? <Navigate to="/" /> : <Register />}
              />
              <Route path="/*" element={<p>Nyari apa sih bro..</p>} />
            </Routes>
          </ThemeContext.Provider>
        </LocaleContext.Provider>
      </AuthenticationContext.Provider>
    </>
  );

  // if (!authentication) {
  //   return (
  //     <>
  //       <AuthenticationContext.Provider value={authenticationContextValue}>
  //         <LocaleContext.Provider value={localeContextValue}>
  //           <ThemeContext.Provider value={themeContextValue}>
  //             <Navbar />
  //             <Routes>
  //               <Route path="/login" element={<Login />} />
  //               <Route path="/register" element={<Register />} />
  //               <Route path="/*" element={<p>Nyari apa sih bro ...</p>} />
  //             </Routes>
  //           </ThemeContext.Provider>
  //         </LocaleContext.Provider>
  //       </AuthenticationContext.Provider>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <AuthenticationContext.Provider value={authenticationContextValue}>
  //       <LocaleContext.Provider value={localeContextValue}>
  //         <ThemeContext.Provider value={themeContextValue}>
  //           <Navbar />
  //           <Routes>
  //             <Route path="/" element={<Home />} />
  //             <Route path="/detail/:id" element={<NoteDetail />} />
  //             <Route path="/create" element={<CreateNote />} />
  //             <Route path="/login" element={<Home />} />
  //             <Route path="/*" element={<p>Nyari apa sih bro ...</p>} />
  //           </Routes>
  //         </ThemeContext.Provider>
  //       </LocaleContext.Provider>
  //     </AuthenticationContext.Provider>
  //   </>
  // );
}

export default App;
