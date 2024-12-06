import { useNavigate, useParams } from "react-router-dom";
import { deleteNote, getNote } from "../utils/api";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import { useContext } from "react";
import LocaleContext from "../context/LocaleContext";

function NoteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [locale, toggleLocale] = useContext(LocaleContext);

  useEffect(() => {
    const getDetailNote = async () => {
      const response = await getNote(id);
      setData(response.data);
    };

    getDetailNote();
  }, []);

  const triggerDeleteNote = async (id) => {
    await deleteNote(id);
    navigate("/");
  };

  return (
    <>
      <div className="w-1/2 mx-auto">
        <div className="border-b-2 py-5 mb-5">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            {data.title}
          </h1>
          <p className="text-slate-400 mb-5">{data.createdAt}</p>
          <h4 className="text-gray-700">{data.body}</h4>
        </div>
        <div className=" w-1/2 mx-auto">
          <Button
            className={
              "green from-red-500 via-red-600 to-red-700 focus:ring-red-300 w-full"
            }
            value={`${locale === "en" ? "Delete" : "Hapus"}`}
            trigerButton={() => {
              triggerDeleteNote(data.id);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default NoteDetail;
