import { formatDate } from "../utils/formatDate";
import PropTypes from "prop-types";

const Card = ({ data }) => {
  return (
    <>
      <div className="p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 flex flex-col justify-between hover:cursor-pointer">
        <h3 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 truncate">
          {data.title}
        </h3>
        <p className="text-slate-400">{formatDate(data.createdAt)}</p>
        <p className="text-gray-700">{data.body}</p>
      </div>
    </>
  );
};

Card.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Card;
