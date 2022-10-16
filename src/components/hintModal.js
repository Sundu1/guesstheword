import { Fragment, useState } from "react";
import { HiOutlineLightBulb } from "react-icons/hi";
import "../index.css";

const HintModal = ({ correctWord, similarWords }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <Fragment>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded h-10 text-2xl group"
        type="button"
        data-modal-toggle="defaultModal"
        onClick={toggleModal}
      >
        <HiOutlineLightBulb />
        <span className="sider-toolkit group-hover:scale-100">Hint</span>
      </button>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`${`${
          modal ? "" : "hidden"
        }`} overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center`}
      >
        <div className="bg-black flex justify-center items-center h-full bg-opacity-75">
          <div className="relative p-4 w-full max-w-2xl h-full md:h-auto ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Terms of Service
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-toggle="defaultModal"
                  onClick={toggleModal}
                  onKeyDown={toggleModal}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-6 space-y-6">
                <h1 className="font-bold">about the word's structure</h1>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Total length is {correctWord.length}
                </p>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Initial letter is '{correctWord.charAt(0)}
                </p>
                <h1 className="font-bold">Similar words</h1>
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  {similarWords.map((word) => word + " ")}
                </p>
              </div>
              <div className="flex items-center p-3 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"></div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HintModal;
