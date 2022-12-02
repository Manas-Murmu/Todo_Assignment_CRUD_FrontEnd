import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["title"]);
  const [filterParam, setFilterParam] = useState(["All"]);

  useEffect(() => {
    axios
      .get("https://todoassignmentcrud-production.up.railway.app/getAllTodos")
      .then((response) => {
        console.log(response.data.allTodos);
        setProducts(response.data.allTodos);
      })
      .catch((err) => console.log(err));
  }, []);

  function search(items) {
    return items.filter((item) => {
      return searchParam.some((newItem) => {
        if (item.name == filterParam) {
          return searchParam.some((newItem) => {
            return (
              item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1
            );
          });
        } else if (filterParam == "All") {
          return searchParam.some((newItem) => {
            return (
              item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1
            );
          });
        }
        // return (
        //   item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        // );
      });
    });
  }

  return (
    <div>
      <form style={{ magin: "auto" }}>
        <input
          className="form-control"
          placeholder="Search Name.."
          onChange={(e) => setQ(e.target.value)}
          value={q}
        />
      </form>
      <table id="products">
        <tr>
          <th>
            <b>_id</b>
          </th>
          <th>
            <b>name</b>
          </th>
          <th>
            <b>email</b>
          </th>
          <th>
            <b>createdAt</b>
          </th>
          <th>
            <b>updatedAt</b>
          </th>
        </tr>
        {search(products).map((item) => (
          <tr>
            <td>{item._id}</td>
            <td>{item.title}</td>
            <td>{item.email}</td>
            <td>{moment(item.updatedAt).format("DD-MM-YYYY")}</td>
            <td>{moment(item.updatedAt).toString("DD-MM-YYYY")}</td>
          </tr>
        ))}
      </table>
      <div className="select">
        <select
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
          className="custom-select"
          aria-label="Filter Product Data By Category"
        >
          <option value="All">Filter By Category</option>
          <option value="">Filter By Category</option>
          <option value="updatedAt">createdAt</option>
          <option value="title">Title</option>
        </select>
        <span className="focus"></span>
      </div>
    </div>
  );
};

export default Home;
