
const siteController = (() => {
    let taskList ={};
    const projectList =[]; //cache
    const clickHandler = (event) => {
        //if event.class = nav, go to displayHandler, send event
        
    }
    const remove = (objType,id) => {
        console.log(id);
        delete taskList[id];
        console.log(taskList);
        
    }
    const add = (formData) => {
        let genId=makeid(7);
        taskList[genId] = Task(formData[0],formData[1],formData[2],formData[3],genId);
        return genId
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
    const changeStar = (id) => {      
        const task = taskList[id]
        task.changeStar();
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
        changeStar,
        remove,
        add,
        modify
    }

})()

const Task = (title,project ="",dueDate, description="", id, star = false) => {

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
    const changeStar = () => {
        if (!star) {
            star = true
            console.log(star);
            
        }
        else {
            star = false
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
    const getStar = () => {
        return star
    }
    return {
        changeDescription,
        changeDueDate,
        changeStatus,
        changeTitle,
        changeProject,
        changeStar,
        getCompleted,
        getDescription,
        getDueDate,
        getTitle,
        getProject,
        getId,
        getStar,
    }
    }
export {siteController}