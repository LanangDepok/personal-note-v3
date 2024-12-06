import Button from "../components/Button";
import { createNote } from "../utils/api";
import { useNavigate } from "react-router-dom";
import useInput from "../hooks/useInput";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function CreateNote() {
  const [title, handleTitleChange] = useInput("");
  const [body, handleBodyChange] = useInput("");
  const [locale, toggleLocale] = useContext(LocaleContext);
  const navigate = useNavigate();

  const handleCreateNote = async (title, body) => {
    const response = await createNote(title, body);

    if (response.status === "fail") {
      alert(response.message);
      return;
    }

    navigate("/");
  };

  return (
    <>
      <div className="w-3/4 lg:w-1/2 mx-auto mt-10 flex flex-col">
        <div className="mb-5">
          <h2 className="text-center text-2xl font-semibold">{`${
            locale === "en" ? "Create note" : "Buat catatan"
          }`}</h2>
        </div>
        <div className="mb-5">
          <input
            value={title}
            onChange={handleTitleChange}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder={`${locale === "en" ? "Title" : "Judul"}`}
            required
            maxLength="50"
          />
        </div>
        <div className="mb-5">
          <textarea
            value={body}
            onChange={handleBodyChange}
            rows="5"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder={`${locale === "en" ? "Body" : "Isi"}`}
            required
          ></textarea>
        </div>
        <div className="text-center">
          <Button
            className="from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300 w-full"
            value={`${locale === "en" ? "Create note" : "Buat catatan"}`}
            trigerButton={() => {
              handleCreateNote(title, body);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default CreateNote;
