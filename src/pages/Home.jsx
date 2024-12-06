import { useEffect, useState } from "react";
import { getNotes } from "../utils/api";
import { Link, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import LocaleContext from "../context/LocaleContext";

function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [data, setData] = useState([]);
  const [theme, toggleTheme] = useContext(ThemeContext);
  const [locale, toggleLocale] = useContext(LocaleContext);
  const [keyword, handleKeywordChange] = useInput(
    searchParams.get("keyword") || ""
  );

  useEffect(() => {
    const fetchAllNotes = async () => {
      const response = await getNotes();
      setData(response.data);
      setNotes(response.data);
    };

    fetchAllNotes();
  }, []);

  useEffect(() => {
    setSearchParams({ keyword });
    if (searchParams) {
      setNotes(
        data.filter((value) =>
          value.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    } else {
      setNotes(data);
    }
  }, [keyword, data]);

  return (
    <>
      <div className="my-10 w-1/2 mx-auto">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            value={keyword}
            onChange={handleKeywordChange}
            type="search"
            className={`block w-full p-4 ps-10 text-sm  border  rounded-lg  focus:ring-blue-500 focus:border-blue-500  ${
              theme === "light"
                ? "text-gray-900 border-gray-300 bg-gray-50"
                : "bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
            }`}
            placeholder={`${
              locale === "en"
                ? "Search with title ..."
                : "Cari berdasarkan judul ..."
            }`}
            required
          />
        </div>
      </div>
      <div className="w-1/2 mx-auto">
        <Button
          className="from-green-500 via-green-600 to-green-700 focus:ring-green-300 w-full"
          value={`${locale === "en" ? "Create note" : "Buat catatan"}`}
          trigerButton={() => navigate("/create")}
        />
      </div>
      <div className="w-3/4 mx-auto mt-10">
        {notes.length === 0 ? (
          <h3 className="text-xl font-semibold text-center">
            {`${locale === "en" ? "Don't have notes" : "Tidak ada catatan"}`}
          </h3>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {notes.map((note) => (
              <Link key={note.id} to={`/detail/${note.id}`}>
                <Card data={note} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
