/* eslint-disable react/prop-types */
import { useContext, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import RegularBtn from "./RegularBtn";
import { makeRequest } from "../axios";
import { AuthContext } from "../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProfileEditor = ({ data }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    username: currentUser.username,
    name: data.name || "",
    number: data.number || "",
    email: data.email || "",
    subtitle: data.subtitle || "",
    image: data.image || "",
  });

  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(formValues.image);
    }
  }, [file, formValues.image]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const validate = () => {
    const { username, name, number, subtitle } = formValues;
    if (!username) return toast.error("Username cannot be empty!");
    if (!name) return toast.error("Name cannot be empty!");
    if (!number) return toast.error("Number cannot be empty!");
    if (!subtitle) return toast.error("Subtitle cannot be empty!");
    return true;
  };

  const uploadImage = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload/ProfileImage", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: async (newData) =>
      await makeRequest.post("/auth/updateUser", newData),
    onSuccess: () => {
      let user = JSON.parse(localStorage.getItem("user"));
      user.image = formValues.image;
      localStorage.setItem("user", JSON.stringify(user));
      queryClient.invalidateQueries("userProfile");
      toast.success("Profile Updated!");
    },
    onError: () => {
      toast.error("Update Failed!");
    },
  });

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;

      let updatedData = { ...formValues };
      if (file) {
        updatedData.image = await uploadImage();
      }

      mutation.mutate(updatedData);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [formValues, file],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="border-slate-400 dark:border-neutral-600 dark:bg-slate-700 border shadow-lg px-2 py-4 rounded-xl"
    >
      <div className="space-y-3">
        <div>
          <h2 className="text-3xl text-green-500 font-bold pb-3">
            Profile Editor
          </h2>
          <hr className="dark:border-slate-500 border-slate-300" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label
              htmlFor="name"
              className="block px-1 text-sm font-medium dark:text-slate-300 text-neutral-500"
            >
              Author Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Shiran Chaminda"
              className="py-2 border-b dark:border-blue-200 border-slate-500 dark:bg-slate-500 dark:text-slate-100 bg-slate-200 px-4 outline-none rounded-lg focus:border-blue-600 w-full"
              maxLength={100}
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="number"
              className="block px-1 text-sm font-medium dark:text-slate-300 text-neutral-500"
            >
              Number
            </label>
            <input
              type="text"
              id="number"
              name="number"
              placeholder="0760957080"
              className="py-2 border-b dark:border-blue-200 border-slate-500 dark:bg-slate-500 dark:text-slate-100 bg-slate-200 px-4 outline-none rounded-lg focus:border-blue-600 w-full"
              maxLength={10}
              value={formValues.number}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block px-1 text-sm font-medium dark:text-slate-300 text-neutral-500"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="shirannew@gmail.com"
              className="py-2 border-b dark:border-blue-200 border-slate-500 dark:bg-slate-500 dark:text-slate-100 bg-slate-200 px-4 outline-none rounded-lg focus:border-blue-600 w-full"
              maxLength={100}
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="subtitle"
              className="block px-1 text-sm font-medium dark:text-slate-300 text-neutral-500"
            >
              Subtitle
            </label>
            <input
              type="text"
              id="subtitle"
              name="subtitle"
              placeholder="Software Engineer"
              className="py-2 border-b dark:border-blue-200 border-slate-500 dark:bg-slate-500 dark:text-slate-100 bg-slate-200 px-4 outline-none rounded-lg focus:border-blue-600 w-full"
              maxLength={100}
              value={formValues.subtitle}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block px-1 text-sm font-medium dark:text-slate-300 text-neutral-500"
            >
              Image
            </label>
            <input
              type="file"
              id="image"
              className="py-2 border-b dark:border-blue-200 border-slate-500 dark:bg-slate-500 dark:text-slate-100 bg-slate-200 px-4 outline-none rounded-lg focus:border-blue-600 md:py-[5px] w-full"
              name="image"
              onChange={handleImageUpload}
            />
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 h-20 w-20 rounded-full object-cover"
            />
          )}
        </div>
        <div className="space-y-3">
          <hr className="dark:border-slate-500 border-slate-300" />
          <h6 className="text-red-500">
            *Please Login Back To See Changes After Update !*
          </h6>
          <div onClick={handleSubmit}>
            <RegularBtn label={"Update"} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default ProfileEditor;
