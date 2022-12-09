
const siteController = (() => {
    const taskList =[];
    const projectList =[]; //cache
    const clickHandler = (event) => {
        //if event.class = nav, go to displayHandler, send event
        
    }
    const remove = (objType,id) => {

    }
    const add = (formData) => {
        //return id to displayHandler
    }
    const makeid =(length) => {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    const modify = (objType, id, property, newContent) =>{

    }

    const loadStorage = () => {
    //check if task obj are saved in local storage and set them to that
    }
    const getTaskList = () => {
        return taskList;
    };
    const getProjectList =()=> {
        return projectList;
    };
    return {
        getTaskList,
        getProjectList,
        clickHandler,
        remove,
        add,
        modify
    }

})()

const Task = (title,dueDate, description="", project ="", id) => {

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
    const changeProject = (newP) => {
        project = newP;
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
    const getProject = () => {
        return project;
    }
    const getId = () => {
        return id;
    }
    return {
        changeDescription,
        changeDueDate,
        changeStatus,
        changeTitle,
        changeProject,
        getCompleted,
        getDescription,
        getDueDate,
        getTitle,
        getProject,
        getId,
    }
    }
export {siteController}