import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaTrash,
  FaPenNib,
  FaPlus,
  FaAlignJustify,
  FaSort,
} from "react-icons/fa";

const BASEURL = "https://todoassignmentcrud-production.up.railway.app";

function TodoList() {
  const [todosData, setTodosData] = useState("");
  const [taskData, setTaskData] = useState("");
  const [taskId, setTaskId] = useState("");

  //Sort
  const [order, setOrder] = useState("ASC");

  const fetchUserData = async () => {
    const response = await axios.get(`${BASEURL}/getAllTodos`);
    setTodosData(response.data.allTodos);
  };

  const fetchTaskData = async (user) => {
    const taskResponse = await axios.get(
      `${BASEURL}/getATaskInTodo/${user._id}`
    );
    console.log(taskResponse.data);
    setTaskData(taskResponse.data);
    setTaskId(user._id);
  };

  useEffect(() => {
    fetchUserData();
  }, [todosData, taskData]);

  //Handle Edit
  const handleEdit = async (user) => {
    const Title = prompt("Enter your New Title", user.title);

    if (!Title.length > 0) {
      alert("Enter all Fields");
    } else {
      const response = await axios.put(`${BASEURL}/editATodo/${user._id}`, {
        title: Title,
      });
      console.log(response);
      toast.info("Todo Edited Succesfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Handle Delete
  const handleDelete = async (userId) => {
    const response = await axios.delete(`${BASEURL}/deleteATodo/${userId}`);
    if (response) {
      toast.error("Deleted the Todo!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  //Handle Add Task to Todo
  const addTaskToTodo = async (user) => {
    const task = prompt("Enter your Task");

    if (!task) {
      alert("Enter all Fields");
    } else {
      const response = await axios.post(
        `${BASEURL}/createTaskTodo/${user._id}`,
        {
          tasks: task,
        }
      );
      toast.success("Task Added!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(response);
    }
  };

  //Handle Edit Specific Tasks of Todo
  const handleEditTask = async (task, key) => {
    console.log(task);
    console.log(taskId);
    console.log(key);

    const editedTask = prompt("Enter your New Title", task);

    if (!editedTask.length > 0) {
      alert("Task Cannot be Empty");
    } else {
      const taskResponse = await axios.put(
        `${BASEURL}/editATaskInTodo/${taskId}`,
        {
          index: key,
          tasks: editedTask,
        }
      );
      console.log(taskResponse);
      toast.info("Task Edited Succesfully!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDeleteTask = async (task) => {
    console.log(task);
    const response = await axios.delete(
      `${BASEURL}/deleteATaskInTodo/${taskId}`,
      {
        data: {
          tasks: task,
        },
      }
    );
    if (response) {
      toast.error("Deleted the Task in Todo!", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log(response);
  };

  const sorting = (a, b) => {
    if (order === "ASC") {
      const sorted = [...todosData].sort((a, b) => {
        a = new Date(a).getTime();
        b = new Date(b).getTime();

        return b > a ? 1 : -1;
      });
      console.log(sorted);
      setTodosData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...todosData].sort((a, b) => {
        a = new Date(a).getTime();
        b = new Date(b).getTime();
        console.log(a);
        return b < a ? 1 : -1;
      });
      setTodosData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <section className="m-auto p-1 text-grey-darkest">
      <div className="container px-5 py-1 mx-auto grid grid-cols-2">
        <div className="lg:w-2/2 w-full overflow-auto">
          <h1 className="sm:text-3xl lg:w-3/4 text-2xl text-left font-medium title-font text-gray-900 mb-5 mt-5">
            All Todos
          </h1>
          <table className="table-auto text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th
                  onClick={() => sorting("createdAt")}
                  className="px-4 py-3 title-font tracking-wider font-medium text-gray-900  bg-gray-100 rounded-tl rounded-bl cursor-pointer"
                >
                  Created At
                  <FaSort className="flex flex-auto text-center" />
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium  text-gray-900  bg-gray-100 rounded-tl rounded-bl">
                  Title
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900  text-sm bg-gray-100">
                  Add Task
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  View Task
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Edit
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {todosData &&
                todosData.map((todo) => (
                  <tr>
                    <td className="px-4 py-3 text-black font-bold text-md">
                      {moment(todo.createdAt).format("MMM Do YYYY,h:mm:ss a")}
                    </td>
                    <td className="px-4 py-3 text-black font-bold text-md">
                      {todo.title}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => addTaskToTodo(todo)}
                        className="text-blue-500 font-semibold"
                      >
                        Add
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => fetchTaskData(todo)}
                        className=" text-blue-500 font-semibold"
                      >
                        View
                      </button>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="text-green-700 font-semibold "
                      >
                        <FaPenNib />
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-center text-gray-900">
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="text-red-500 font-semibold"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        <div className="lg:w-1/2 container ml-14">
          <h1 className="sm:text-3xl lg:w-3/4 text-2xl font-medium title-font text-gray-900 mb-5 mt-5">
            Tasks
          </h1>

          <div className="relative">
            <table className="table-auto text-left whitespace-no-wrap">
              <thead>
                <tr>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Sl No
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                    Tasks
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Edit
                  </th>
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody>
                {taskData &&
                  taskData.Tasks.map((task, key) => (
                    <tr>
                      <td className="px-4 py-3">
                        <button className="text-green-700 font-semibold">
                          {key}
                        </button>
                      </td>
                      <td className="px-4 py-3 text-black font-bold text-md">
                        {task}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleEditTask(task, key)}
                          className="text-green-700 font-semibold"
                        >
                          <FaPenNib />
                        </button>
                      </td>
                      <td className="px-4 py-3 text-lg text-gray-900 text-center">
                        <button
                          onClick={() => handleDeleteTask(task)}
                          className="text-red-500 font-semibold"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default TodoList;
