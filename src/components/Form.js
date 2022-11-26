import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Form() {
  //To Store the Value from FrontEnd
  const [title, setTitle] = useState("");
  console.log(title);

  const submitData = async () => {
    const data = {
      title: title,
    };
    const res = await axios.post("/createTodo", data);
    console.log(res);
    toast.success("Created Todo Succesfully !", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  //Handle Default
  const handleSubmit = (e) => {
    e.preventDefault();
    submitData();
    setTitle("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <section className="text-gray-600 body-font relative">
          <div className="container px-5 py-8 mx-auto">
            <div className="flex flex-col text-center justify-items-center mx-auto w-full mb-6">
              <h1 className="sm:text-3xl lg:w-3/4 text-2xl text-left font-medium title-font text-gray-900">
                Create Todos
              </h1>
            </div>
            <div className="lg:w-1/2 md:w-2/3 lg:w-3/5">
              <div className="flex flex-wrap -m-2">
                <div className="p-2 w-1/2">
                  <div className="relative">
                    <label
                      htmlFor="name"
                      className="leading-7 text-sm text-gray-600"
                    >
                      Title
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                      className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out "
                    />
                  </div>
                </div>
                <div className="p-2 w-full">
                  <button
                    type="submit"
                    className="flex  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer />
        </section>
      </form>
    </div>
  );
}

export default Form;
