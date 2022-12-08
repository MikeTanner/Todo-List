import "./styles/main.css"
console.log("test");

const Project= (name) => {
    let taskList =[];
    const changeName=(newName) => {
        name = newName;
    }
    const getName = () => {
        return name;
    }
    const getTasks = () => {
        return taskList;
    }
    const addTask = (task) => {
        taskList.push(task);
    }
    const removeTask = (index) => {
        taskList.splice(index,1);
    }
    return {
        changeName,
        getName,
        getTasks,
        addTask,
        removeTask
    }
}

const Task = (title,dueDate, description="") => {
    let completed = false;
    const changeTitle = (newTitle) => {
        title =newTitle; 
    }
    const changeDueDate = (newDate) => {
        dueDate = newDate;
    }
    const changeDescription = (newD) => {
        description = newD;
    }
    const changeStatus = () => {
        if (completed) {
            completed = false;
        }
        else {
            completed = true;
        }
    }
    const getTitle = () => {
        return title;
    }
    const getDueDate = () => {
        return dueDate
    }
    const getDescription = () => {
        return description
    }
    const getCompleted = () => {
        return completed;
    }
    return {
        changeDescription,
        changeDueDate,
        changeStatus,
        changeTitle,
        getCompleted,
        getDescription,
        getDueDate,
        getTitle
    }
    }

