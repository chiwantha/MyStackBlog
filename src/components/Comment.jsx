/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import RegularBtn from "./RegularBtn";
import { IoIosSend } from "react-icons/io";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import moment from "moment";
import { Spinner } from "flowbite-react";

const Comment = ({ blogId }) => {
  const queryClient = useQueryClient();
  const { currentUser } = useContext(AuthContext);
  const [values, setValues] = useState({
    userId: currentUser ? currentUser.id : "",
    blogId: blogId ? blogId : "",
    comment: "",
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", blogId],
    queryFn: async () => {
      const res = await makeRequest.get(`/comment/load?blogId=${blogId}`);
      return res.data;
    },
    enabled: !!blogId,
  });

  const newMutation = useMutation({
    mutationKey: ["newcomment"],
    mutationFn: async (NewComment) => {
      return await makeRequest.post("/comment/new", NewComment);
    },
    onSuccess: (response) => {
      toast.success(response.data ? response.data : "Comment Add !");
      queryClient.invalidateQueries("comments");
    },
    onError: (error) => {
      toast.error(
        error.response?.data
          ? error.response?.data
          : "Err : Comment Not Added !",
      );
    },
  });

  const deleteMutation = useMutation({
    mutationKey: ["deletecomment"],
    mutationFn: async (DelComment) => {
      return await makeRequest.post("/comment/delete", DelComment);
    },
    onSuccess: (response) => {
      toast.success(response.data ? response.data : "Comment Removed !");
      queryClient.invalidateQueries("comments");
    },
    onError: (error) => {
      toast.error(
        error.response?.data
          ? error.response?.data
          : "Err : Comment Not Removed !",
      );
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const { comment, blogId, userId } = values;
    if (!comment) {
      toast.error("You can't add an empty comment!");
      return false;
    }
    if (!blogId || !userId) {
      toast.error("Something went wrong, try again later!");
      return false;
    }
    return true;
  };

  const handleAddClick = (e) => {
    e.preventDefault();
    if (validate()) {
      newMutation.mutate(values);
      setValues({
        ...values,
        comment: "", // Reset the comment
      });
    }
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    const commentId = e.currentTarget.getAttribute("data-comment-id");
    if (commentId) {
      deleteMutation.mutate({ commentId: commentId });
    } else {
      toast.error("Comment Id Not Found !");
    }
  };

  return (
    <div className="w-full">
      {isLoading ? (
        <div>Loading Comments ...</div>
      ) : (
        <>
          <div className="flex flex-col w-full">
            {currentUser ? (
              <div className="flex flex-col sm:flex-row gap-2 mb-2">
                <img
                  src={currentUser.image}
                  alt="profile"
                  className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
                />
                <textarea
                  name="comment"
                  rows={3}
                  maxLength={300}
                  className="w-full rounded-lg p-2 dark:bg-slate-600 dark:border-slate-500 border"
                  placeholder="Type Your Comment Here ...."
                  value={values.comment}
                  onChange={handleInputChange}
                ></textarea>

                <span className="" onClick={handleAddClick}>
                  <RegularBtn fill={1} label={<IoIosSend />} textSize={"3xl"} />
                </span>
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-2">
                <h3 className="dark:text-slate-300 text-neutral-700">
                  Login First to Make a Comment
                </h3>
                <span>
                  <Link to="/login">
                    <RegularBtn label={"Login"} />
                  </Link>
                </span>
              </div>
            )}
            {data && data.length > 0 ? (
              data.map((comment) => (
                <div
                  className="py-2 flex flex-col sm:flex-row gap-4"
                  key={comment.id}
                >
                  <img
                    src={comment.authorImg}
                    alt="comment-author"
                    className="h-[35px] w-[35px] rounded-full border-dashed border-orange-400 object-cover object-center hover:border-2"
                  />
                  <div className="flex flex-col w-full">
                    <span className="font-bold text-orange-600 dark:text-orange-400 text-lg hover:underline">
                      <Link to={`/profile/${comment.authorSlug}`}>
                        {comment.authorName}
                      </Link>
                    </span>
                    <p className="text-neutral-700 dark:text-neutral-200 text-[15px]">
                      {comment.comment}
                    </p>
                    <span className="text-blue-600 dark:text-blue-300 text-[15px]">
                      {moment(comment.createdAt).fromNow()}
                    </span>
                  </div>
                  {currentUser && currentUser.id === comment.authorId && (
                    <span
                      className=""
                      data-comment-id={comment.id}
                      onClick={handleDeleteClick}
                    >
                      <RegularBtn
                        fill={1}
                        label={<MdDelete />}
                        textSize={"3xl"}
                      />
                    </span>
                  )}
                </div>
              ))
            ) : (
              <div>No Comments , Be The First One ......</div>
            )}
          </div>
        </>
      )}
      <ToastContainer />
    </div>
  );
};

export default Comment;
