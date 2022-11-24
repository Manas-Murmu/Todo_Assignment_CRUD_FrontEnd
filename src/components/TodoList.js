import React, { useState, useEffect } from "react";
import axios from "axios";

function TodoList() {
  const [todosData, setTodosData] = useState(null);
  const [taskData, setTaskData] = useState("");

  const fetchUserData = async () => {
    const response = await axios.get("/getAllTodos");
    // console.log(response.data.allTodos);
    setTodosData(response.data.allTodos);
  };

  const fetchTaskData = async (user) => {
    const taskResponse = await axios.get(`/getATaskInTodo/${user._id}`);
    console.log(taskResponse.data);
    setTaskData(taskResponse.data);
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchTaskData, fetchUserData]);

  //Handle Edit
  const handleEdit = async (user) => {
    const Title = prompt("Enter your New Title");

    if (!Title) {
      alert("Enter all Fields");
    } else {
      const response = await axios.put(`/editATodo/${user._id}`, {
        title: Title,
      });
      console.log(response);
    }
  };

  //Handle Delete
  const handleDelete = async (userId) => {
    const response = await axios.delete(`/deleteATodo/${userId}`);
  };

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-col w-full mb-8">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
            All Todos
          </h1>
        </div>
        <div className="lg:w-2/3 w-full  overflow-auto">
          <table className="table-auto text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Title
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  View Details
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
                    <td className="px-4 py-3">{todo.title}</td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => fetchTaskData(todo)}
                        className="hover:text-green-500"
                      >
                        View Details
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(todo)}
                        className="hover:text-green-500"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      <button
                        onClick={() => handleDelete(todo._id)}
                        className="hover:text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div>
            <h1 className="sm:text-1xl mt-5 text-3xl font-medium title-font mb-2 text-gray-900 text-center">
              All Tasks
            </h1>
            {taskData &&
              taskData.Tasks.map((task) => (
                <div class="font-sans flex items-center justify-center bg-blue-darker w-full py-1">
                  <div class="overflow-hidden bg-white rounded max-w-xs w-full shadow-lg  leading-normal ">
                    <a
                      href="#"
                      class="block group hover:bg-blue p-4 mt-1 border-b bg-gray-100"
                    >
                      <p class="font-bold text-lg mb-1 text-black ">{task}</p>
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TodoList;

// <div>
//   <ol>{taskData && taskData.Tasks.map((task) => <li>{task}</li>)}</ol>
// </div>;
