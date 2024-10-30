/* eslint-disable react/prop-types */
import Default from "../assets/images/defaultprofile.png";
import StackColors from "../constants/colors";

const AuthorCard = ({ data }) => {
  const randomColorClass =
    StackColors[Math.floor(Math.random() * StackColors.length)];
  const randomColorClass2 =
    StackColors[Math.floor(Math.random() * StackColors.length + 6)];

  return (
    <div className="flex flex-col h-full rounded-lg overflow-hidden bg-white shadow-md">
      <div className="aspect-square">
        <img
          src={data.image ? `/upload/profile/${data.image}` : Default}
          alt="Author Image"
          className="w-full h-full object-cover object-center rounded-lg"
        />
      </div>
      <div className=" p-2 flex flex-col items-center space-y-1">
        <div className="flex flex-col items-center">
          <h1 className=" text-lg font-bold text-orange-500">
            {data.name ? data.name : "Author Name"}
          </h1>
          <span className=" text-sm font-light">
            {data.subtitle ? data.subtitle : "Author Subtitle"}
          </span>
        </div>
        <div className="flex gap-2 py-1">
          <span
            className={`px-2 py-[2px] rounded-lg  ${randomColorClass ? randomColorClass : `bg-green-400`}`}
          >
            {data.blogcount ? `${data.blogcount} Blogs` : `Unknown`}
          </span>
          <span
            className={`px-2 py-[2px] rounded-lg  ${randomColorClass2 ? randomColorClass2 : `bg-orange-300`}`}
          >
            {data.badge ? data.badge : `Unknown`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
