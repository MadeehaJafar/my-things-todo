import { useState } from "react";
import { GoPlus, GoSearch } from "react-icons/go";
import './App.css';



function App() {
    const [toDo, setToDo] = useState('');
    const [taskList, setTaskList] = useState([]);
    const [filterArr, setFilterArr] = useState([]);
    const [showSearch, setShowSearch] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [inComplete, setInComplete] = useState(0);


    function handleSearchChange(e) {
        setSearchInput(e.target.value);
        const newSearch = taskList.filter((list) => {
            if (list.label.includes(e.target.value)) {
                return list;
            }
        });
        setFilterArr(newSearch);

    }

    function onClickSearch() {
        setShowSearch(true);
    }

    function onClickAdd() {
        setShowSearch(false);
    }


    function handleKeyDown(event) {
        // console.log(event);
        if (event.key === 'Enter') {

            const newArr = [...taskList]
            newArr.push({
                label: toDo,
                checkBoxState: false
            });
            setTaskList(newArr);
            setFilterArr(newArr);
            setToDo('');

            const newItems = newArr.filter((list) => {
                if (list.checkBoxState === false) {
                    return list;
                }

            })

            setInComplete(newItems.length);
        }

    }




    function onCompleteClick() {
        const newFilter = taskList.filter((list) => {
            if (list.checkBoxState === true) {
                return list;
            }
        });
        setFilterArr(newFilter);
    }

    function onAllClick() {
        setFilterArr(taskList)
        console.log('this is', taskList);
    }


    function onActiveClick() {
        const newTask = taskList.filter((list) => {
            if (list.checkBoxState === false) {
                return list;
            }
        });
        setFilterArr(newTask);
    }


    function handleChange(e) {
        setToDo(e.target.value);


    }

    function handleCheckBox(e, index) {
        const newArr = [...taskList]
        // console.log("check box", e.target.value);
        newArr[index].checkBoxState = !newArr[index].checkBoxState;
        setTaskList(newArr);

        const newInComplete = newArr.filter((list) => {
            if (list.checkBoxState === false) {
                return list;
            }
        });
        setInComplete(newInComplete.length);

    }

    return (
        <div className="container ">
            <div className="main-box">
                <div >
                    <h1>THINGS TO DO</h1>
                </div>

                <div className="main-checkbox">

                    {!showSearch ?
                        < input value={toDo}
                            className="main-input"
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Add New" /> : null
                    }
                    <div>
                        {
                            showSearch ? <input value={searchInput}
                                className="search-input"
                                onChange={handleSearchChange}

                                placeholder="Search"
                            /> : null
                        }
                    </div>








                    {filterArr.map((list, index) => {
                        return (
                            <div className={list.checkBoxState ? " decoration div-checkbox" : "div-checkbox"}>
                                <input type="checkbox"
                                    checked={list.checkBoxState}
                                    onChange={(event) => { handleCheckBox(event, index) }} />
                                <label>{list.label}</label>
                            </div>
                        )
                    })}







                </div>



                <div className="footer">
                    <div className="main-footer">
                        <div className="add-icon">
                            <GoPlus onClick={onClickAdd} />
                        </div>


                        <div className="search-icon">
                            <GoSearch onClick={onClickSearch} />
                        </div>


                        <div>

                            <p className="para">{inComplete} items left</p>
                        </div>
                    </div>

                    <div className="btn-div">


                        <span className="btn-1" onClick={onAllClick}>All</span>


                        <span className="btn-2" onClick={onActiveClick}>Active</span>


                        <span className="btn-3" onClick={onCompleteClick}>Completed</span>

                    </div>
                </div>
            </div>
        </div >

    )
};

export default App;