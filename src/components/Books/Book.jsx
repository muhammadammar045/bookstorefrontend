import {
  deleteBookThunk,
  fetchBookThunk,
  selectBook,
  selectIsLoading,
} from "../../store/book/bookSlice";
import {
  openModal,
  closeModal,
  selectModalContext,
} from "../../store/modal/modalSlice";
import { faCamera, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import showToast from "../../utils/toastAlert/toaster";
import Modal from "../../utils/modal/Modal";
import { selectUserPermissions } from "../../store/user/userAuthSlice";

function Book() {
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const book = useSelector(selectBook);
  const modalContext = useSelector(selectModalContext);
  const permissions = useSelector(selectUserPermissions);
  const { bookId } = useParams();

  const onDeleteClick = () => {
    dispatch(openModal("delete"));
  };

  const onEditClick = () => {
    dispatch(openModal("edit"));
  };

  const handleEditThumbnail = () => {
    dispatch(openModal("editThumbnail"));
  };

  const handleThumbnail = () => {
    navigate(`/edit-book-thumbnail/${bookId}`);
    dispatch(closeModal());
  };

  const handleEdit = () => {
    navigate(`/edit-book/${bookId}`);
    dispatch(closeModal());
  };

  console.log(book)
  const onDelete = async () => {
    try {
      const res = await dispatch(deleteBookThunk(book._id)).unwrap();
      showToast("success", `${res.message}`);
      navigate("/books");
      dispatch(closeModal());
    } catch (error) {
      showToast("error", `${error.message}`);
    }
  };

  useEffect(() => {
    dispatch(fetchBookThunk(bookId));
  }, [dispatch, bookId]);

  return (
    <>
      {loading ? (
        <div
          role="status"
          className="my-10 w-full animate-pulse rounded border border-gray-200 p-4 shadow dark:border-gray-700 md:p-6"
        >
          <div className="mb-4 flex h-80 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
            <svg
              className="h-10 w-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="mb-2.5 h-2 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700" />

          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="my-10 rounded-lg border-2 border-gray-900 bg-gray-100 p-4 dark:border-gray-200 dark:bg-gray-900">
          <div className="relative">
            <div>
              <img
                className="max-h-[500px] w-full rounded-lg border-2 border-gray-900 bg-cover dark:border-gray-200"
                src={book?.thumbnail}
                alt={book?.title || "Book Thumbnail"}
              />
            </div>
            {permissions.includes("update") && (
              <div className="absolute right-6 top-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gray-800 bg-gray-400 duration-700 hover:scale-125 dark:border-gray-200 dark:bg-gray-900">
                <button onClick={handleEditThumbnail}>
                  <FontAwesomeIcon
                    icon={faCamera}
                    size="2x"
                    color="lightgreen"
                  />
                </button>
              </div>
            )}
          </div>
          <div>
            <div className="mt-10 flex items-center justify-between">
              <h5 className="text-xl text-gray-900 duration-700 hover:text-red-600 dark:text-gray-200 dark:hover:text-red-300">
                {book?.category}
              </h5>
              <span className="">
                {permissions.includes("delete") && (
                  <button
                    className="duration-700 hover:scale-150"
                    onClick={onDeleteClick}
                  >
                    <span className="px-4">
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="2x"
                        color="red"
                      />
                    </span>
                  </button>
                )}
                {permissions.includes("update") && (
                  <button
                    onClick={onEditClick}
                    className="duration-700 hover:scale-150"
                  >
                    <span className="px-4">
                      <FontAwesomeIcon
                        icon={faEdit}
                        size="2x"
                        color="green"
                      />
                    </span>
                  </button>
                )}
              </span>
            </div>
            <h1 className="pt-4 text-4xl font-bold text-gray-900 dark:text-gray-200">
              {book?.title}
            </h1>
            <p className="pt-5 text-lg text-gray-900 dark:text-gray-200">
              {book?.description}
            </p>
          </div>
        </div>
      )}
      {modalContext === "delete" && (
        <Modal
          onConfirmFunction={onDelete}
          message={"Are you sure you want to delete this Book?"}
        />
      )}
      {modalContext === "edit" && (
        <Modal
          onConfirmFunction={handleEdit}
          message={"Are you sure you want to edit this Book?"}
        />
      )}
      {modalContext === "editThumbnail" && (
        <Modal
          onConfirmFunction={handleThumbnail}
          message={"Are you sure you want to update the Thumbnail?"}
        />
      )}
    </>
  );
}

export default Book;
