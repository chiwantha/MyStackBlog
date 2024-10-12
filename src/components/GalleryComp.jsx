import GalleryImage from "./GalleryImage";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../axios";

const GalleryComp = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const res = await makeRequest.get("gallery/load");
      return res.data;
    },
  });

  console.log(data);

  return (
    <div className="">
      {data &&
        data.map((item) => (
          <div key={item.id}>
            <GalleryImage data={item} />
          </div>
        ))}
    </div>
  );
};

export default GalleryComp;
