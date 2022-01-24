import './App.css';
import { useHistory } from "react-router-dom";
import React, { useState } from 'react';
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

function App() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editMode, setEditMode] = useState("");
  const [addCategory, setAddCategory] = useState(false);
  const [rows, setRows] = useState([]);
  const [spentThisMonth, setSpentThisMonth] = useState(0);
  const [spentLastMonth, setSpentLastMonth] = useState(0);

  let history = useHistory();
  let totalPercentage = 0;
  let totalMoney = 0;
  let buyNow = 0;

  React.useEffect(
    () => {
      let url= ""
      let url2= ""
      let url3= ""
      process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories": url="https://income-divider.herokuapp.com/api/categories"
      process.env.NODE_ENV==="development"? url2="http://localhost:5000/api/items": url2="https://income-divider.herokuapp.com/api/items"
      process.env.NODE_ENV==="development"? url3="http://localhost:5000/api/users/": url3="https://income-divider.herokuapp.com/api/users/"
      axios.get(url)
        .then(res => {
          setCategories(res.data)
        })
        .catch((err) => alert(err))
      axios.get(url2)
        .then(res => {
          setRows(res.data.reverse())
        })
        .catch((err) => alert(err))
      axios.get(url3)
        .then(res => {
          setSpentThisMonth(res.data.spentThisMonth)
          setSpentLastMonth(res.data.spentLastMonth)
        })
        .catch((err) => alert(err))
    }
  , [])
  const handleSubmitSalary = (e) => {
    let url= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/assign": url="https://income-divider.herokuapp.com/api/categories/assign"
    let url2= ""
    process.env.NODE_ENV==="development"? url2="http://localhost:5000/api/users/": url2="https://income-divider.herokuapp.com/api/users/"
    axios.put(url, {
      income: e.target.incomeValue.value
    })
    .catch((err) => alert(err))

    axios.put(url2, {
      newSpent: spentThisMonth
    })
    .then(() => {
      history.go(0)
    })
    .catch((err) => alert(err))
      
  }

  const handleSubmitIncome = (e) => {
    let url= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/assign": url="https://income-divider.herokuapp.com/api/categories/assign"
    axios.put(url, {
      income: e.target.incomeValue.value
    })
      .then(() => {
        history.go(0)
      })
      .catch((err) => alert(err))
  }

  const handleDeduct = (event) => {
    event.preventDefault();
    let url= ""
    let url2= ""
    let url3= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/deduct": url="https://income-divider.herokuapp.com/api/categories/deduct"
    process.env.NODE_ENV==="development"? url2="http://localhost:5000/api/items/add": url2="https://income-divider.herokuapp.com/api/items/add"
    process.env.NODE_ENV==="development"? url3="http://localhost:5000/api/users/spentThisMonth": url3="https://income-divider.herokuapp.com/api/users/spentThisMonth"
    axios.put(url, {
      category: selectedCategory,
      deductionValue: event.target.deductionValue.value
    })
      .catch((err) => alert(err))
    axios.post(url2, {
      describtion: event.target.deductionValueDesc.value,
      value: event.target.deductionValue.value
    })
      .catch((err) => alert(err))
    axios.put(url3, {
      spent: event.target.deductionValue.value
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }
  const handleAdd = (event) => {
    event.preventDefault();
    let url= ""
    // let url2= ""
    // let url3= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/addValue": url="https://income-divider.herokuapp.com/api/categories/addValue"
    // process.env.NODE_ENV==="development"? url2="http://localhost:5000/api/items/add": url2="https://income-divider.herokuapp.com/api/items/add"
    // process.env.NODE_ENV==="development"? url3="http://localhost:5000/api/users/spentThisMonth": url3="https://income-divider.herokuapp.com/api/users/spentThisMonth"
    axios.put(url, {
      category: selectedCategory,
      addedValue: event.target.addedValue.value
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
    // axios.post(url2, {
    //   describtion: event.target.addedValueDesc.value,
    //   value: event.target.addedValue.value
    // })
    //   .catch((err) => alert(err))
    // axios.put(url3, {
    //   spent: event.target.addedValue.value * -1
    // })
    //   .then(() => {
    //     history.go(0);
    //   })
    //   .catch((err) => alert(err))
  }
  const handleUpdate = (e) => {
    e.preventDefault();
    let url= "";
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/edit": url="https://income-divider.herokuapp.com/api/categories/edit"
    axios.put(url, {
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
    let url= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/": url="https://income-divider.herokuapp.com/api/categories/"
    axios.delete(url, {
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
    let url= ""
    process.env.NODE_ENV==="development"? url="http://localhost:5000/api/categories/add": url="https://income-divider.herokuapp.com/api/categories/add"
    axios.post(url, {
      name: e.target.categoryName.value,
      value: e.target.categoryValue.value,
      amount: 0
    })
      .then(() => {
        history.go(0);
      })
      .catch((err) => alert(err))
  }
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: "#3f3b3b"
    },
    '&:nth-of-type(even)': {
      backgroundColor: "#575151"
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette.common.white
    },
  }));
  

  return (
      <div style={{ minHeight: "100vh", justifyContent: "center", display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div>
          <form onSubmit={handleSubmitSalary}>
            <input required type="number" id="incomeValue" placeholder="Salary"></input>
            <button type="submit">Enter</button>
          </form>
          <form onSubmit={handleSubmitIncome}>
            <input required type="number" id="incomeValue" placeholder="Income"></input>
            <button type="submit">Enter</button>
          </form>
        </div>
        <h1>Categories</h1>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly", width: "90%", flexWrap: "wrap" }}>
          {categories.map((category, index) => {
            totalPercentage += category.value
            totalMoney += category.amount
            buyNow= category.amount/2
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
                <div className='category' key={index} >
                  <p>Name: {category.name} || Percentage {category.value} % || Amount {Math.round(category.amount)} EGP</p>
                  <form onSubmit={handleAdd}>
                    <input id="addedValue" type="number" required placeholder="Add Value"/>
                    {/* <input id="addedValueDesc" required placeholder="Describtion"/> */}
                    <button type="submit" onClick={() => { setSelectedCategory(category.name) }}>
                      +
                    </button>
                  </form>
                  <form onSubmit={handleDeduct}>
                    <input id="deductionValue" type="number" required placeholder="Deduction"/>
                    <input id="deductionValueDesc" required placeholder="Describtion"/>
                    <button type="submit" onClick={() => { setSelectedCategory(category.name) }}>
                      -
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
          <small>
            Max Buy Now = {buyNow}
          </small>
          <small>
            Spent This Month = {spentThisMonth}
          </small>
          <small>
            Spent Last Month = {spentLastMonth}
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
        <div style={{marginTop: 20,width: "70%"}}>
          <Paper>
            <TableContainer sx={{maxHeight: 400}}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell >Describtion</StyledTableCell>
                    <StyledTableCell >Amount</StyledTableCell>
                    <StyledTableCell >Date</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <StyledTableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <StyledTableCell component="th" scope="row">
                        {row.describtion}
                      </StyledTableCell>
                      <StyledTableCell>{row.value}</StyledTableCell>
                      <StyledTableCell>{String(row.date).substring(0,10)}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </div>
  );
}

export default App;
