import './App.css';
import { useHistory } from "react-router-dom";
// import Header from "./components/Header/Header.js";
// import Footer from "./components/Footer/Footer";
import React, { useState } from 'react';
import axios from "axios";

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editMode, setEditMode] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  let history = useHistory();
  let totalPercentage = 0;
  let totalMoney = 0;

  React.useEffect(
    () => {
      axios.get("https://income-divider.herokuapp.com/api/categories")
        .then(res => {
          setCategories(res.data)
        })
        .catch((err) => alert(err))
    }
    , [])

  const handleSubmit = (e) => {
    axios.put("https://income-divider.herokuapp.com/api/categories/assign", {
      income: e.target.incomeValue.value
    })
      .then(() => {
        history.go(0)
      })
      .catch((err) => alert(err))
  }
  const handleDeduct = (event) => {
    event.preventDefault();
    axios.put("https://income-divider.herokuapp.com/api/categories/deduct", {
      category: selectedCategory,
      deductionValue: event.target.deductionValue.value
    })
      .then(() => {
        history.go(0)
      })
      .catch((err) => alert(err))
  }

  const handleAdd = (event) => {
    event.preventDefault();
    axios.put("https://income-divider.herokuapp.com/api/categories/addValue", {
      category: selectedCategory,
      addedValue: event.target.addedValue.value
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }

  const handleReset = () => {
    axios.put("https://income-divider.herokuapp.com/api/categories/reset")
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    axios.put("https://income-divider.herokuapp.com/api/categories/edit", {
      id: editMode,
      name: e.target.name.value,
      value: e.target.value.value,
      amount: e.target.amount.value
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }

  const handleDelete = (categoryID) => {
    axios.delete("https://income-divider.herokuapp.com/api/categories/", {
      data: {
        id: categoryID,
      }
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }
  const handleAddCategory = (e) => {
    e.preventDefault();
    axios.post("https://income-divider.herokuapp.com/api/categories/add", {
      name: e.target.categoryName.value,
      value: e.target.categoryValue.value,
      amount: 0
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }

  return (
    <div>
      {/* <Header color="dark" fixed /> */}
      <div style={{ height: "100vh", justifyContent: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div>
          <form onSubmit={handleSubmit}>
            <input required type="number" id="incomeValue" placeholder="Income"></input>
            <button type="submit">Enter</button>
          </form>
        </div>
        <h1>Categories</h1>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "90%", flexWrap: "wrap" }}>
          {categories.map((category, index) => {
            totalPercentage += category.value
            totalMoney += category.amount
            return (
              category._id === editMode ?
                <form onSubmit={handleUpdate} key={index} style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <small style={{ textAlign: "center", margin: "3%" }}>Edit Mode</small>
                  <div style={{ margin: "3%", display: "flex", flexDirection: "column" }} >
                    <small >Name :</small>
                    <input required id="name" defaultValue={category.name} />
                  </div>
                  <div style={{ margin: "3%", display: "flex", flexDirection: "column" }} >
                    <small >Percentage :</small>
                    <input required id="value" defaultValue={category.value} />
                  </div>
                  <div style={{ margin: "3%", display: "flex", flexDirection: "column" }} >
                    <small >Amount :</small>
                    <input required id="amount" defaultValue={Math.round(category.amount)} />
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-evenly", margin: "3%" }}>
                    <button type="submit">
                      Update
                    </button>

                    <button type="button" onClick={() => { setEditMode("") }}>
                      Cancel
                    </button>
                  </div>
                </form>
                :
                <div key={index}>
                  <p>{category.name}</p>
                  <p>{category.value} %</p>
                  <p>{Math.round(category.amount)} EGP</p>
                  <form onSubmit={handleAdd}>
                    <input id="addedValue" type="number" required placeholder="Add Value"></input>
                    <button type="submit" onClick={() => { setSelectedCategory(category.name) }}>
                      Add
                    </button>
                  </form>
                  <form onSubmit={handleDeduct}>
                    <input id="deductionValue" type="number" required placeholder="Deduction"></input>
                    <button type="submit" onClick={() => { setSelectedCategory(category.name) }}>
                      Deduct
                    </button>
                  </form>
                  <button onClick={() => { setEditMode(category._id) }}>
                    Edit Category
                  </button>
                  <button type="button" onClick={() => {
                    handleDelete(category._id)
                  }}>
                    Delete Category
                  </button>
                </div>
            )
          })}
        </div>
        <div style={{ display: "flex", flexDirection: "column", textAlign: "center", justifyContent: "center", marginTop: "3%" }}>
          <small style={{ color: totalPercentage === 100 ? "green" : "red" }}>
            Total Percentage = {totalPercentage}
          </small>
          <small>
            Total Earnings = {totalMoney}
          </small>
          <div>
            {!addCategory ?
              <button onClick={() => {
                setAddCategory(true)
              }}>
                Add Category
              </button> :
              <form onSubmit={handleAddCategory} style={{ display: "flex", flexDirection: "column" }}>
                <input id="categoryName" required placeholder="Name" />
                <input id="categoryValue" required placeholder="Percentage" />
                <div>
                  <button type="submit">
                    Submit
                  </button>
                  <button onClick={() => { setAddCategory(false) }}>
                    Cancel
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
        <button style={{
          position: "absolute", bottom: 10, left: 10, backgroundColor: "red",
          border: "1px solid black", padding: 10, color: "white", cursor: "pointer"
        }}
          onClick={() => { handleReset() }}>
          Reset
        </button>
        <a style={{
          position: "absolute", bottom: 10, right: 10, backgroundColor: "transparent",
          border: "1px solid black", padding: 10, color: "black", cursor: "pointer",
          textDecoration: "none"
        }}
          rel="noreferrer"
          target="_blank"
          href="https://www.desmos.com/scientific">
          Calculator
        </a>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
