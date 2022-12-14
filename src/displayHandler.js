import {siteController} from "./siteHandler.js";
const cache = {};
function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
const images = importAll(require.context('./assets', false, /\.(gif|png|jpe?g|svg)$/));



const displayHandler = (() => {
    const content = document.querySelector("#listContainer")
    const forms = document.querySelector("#formContainer")
    const tasks = document.querySelector("#tasks");
    const starred = document.querySelector("#starred")
    const addProject = document.querySelector(".addProject")
    const showBtn = document.querySelector(".showButton")
    const form = document.querySelector(".taskForm")
    const addTask = document.querySelector("#submitNewTask")
    //query task article div, project div
    const startup = () => {
        currentTab.updatePage("");
        startupNavBar();
        startupFormContainer();
        //add event listeners to tasks, starred, add Project button (flex order -1)
    }
    const startupNavBar = () => {
        const navArray = [tasks, starred]
        const taskImg = document.querySelector(".taskImg").setAttribute("src",cache["./file-document-check.png"])
        const starImg = document.querySelector(".starImg").setAttribute("src",cache["./star-face.png"])
        const projectImg = document.querySelector(".projectImg").setAttribute("src",cache["./plus.png"])
        navArray.forEach((element) => {
            element.addEventListener("click",(event)=>{
                changeTab(event.target)            
                event.stopPropagation();
            })
        })
/*         tasks.addEventListener("click",(event)=>{
            changeTab(event.target)            
            event.stopPropagation();
        }) */
    }
    const startupFormContainer = () => {        
        showBtn.addEventListener("click", ()=> {
        if (showBtn.textContent =="New Task") {
            form.classList.remove("formHide")
            showBtn.textContent = "Cancel"
        }
        else if (showBtn.textContent =="Cancel") {
            form.classList.add("formHide")
            showBtn.textContent = "New Task"
        }})
        addTask.addEventListener("click", (event)=> {
            let taskId = "";
            let formArray = []
            event.preventDefault();
            if (validateFormData()) {
                formArray = [document.getElementById("inputTaskName").value, document.getElementById("inputProject").value, document.getElementById("inputDueDate").value, document.getElementById("inputDescription").value]
                //call siteHandler.add
                taskId = siteController.add(formArray);
                console.log(siteController.getTaskList());
                
                drawTask(taskId)
                console.log("test");
                
                event.stopPropagation()
            }
        })
    }
    
    const validateFormData = () => {
        return true;
    }
    const update = (type) => {
        //if type = task, called tab whatever
        //if type = project, reload project div
        //can be called by an event listener
    }
    const drawTask = (taskId)=>{
        const taskList = siteController.getTaskList();
        const taskDiv = document.createElement("div")
        const hellDiv = document.createElement("div")
        taskDiv.classList.add("taskDiv")
        taskDiv.id = taskId;
        hellDiv.classList.add("hellDiv")
        //left div contents
        const leftDiv = document.createElement("div")
        leftDiv.classList.add("leftTaskDiv") 
        const checkDiv = document.createElement("div")
        checkDiv.classList.add("checkDiv") 
        checkDiv.classList.add("unchecked")
        checkDiv.addEventListener("click", (event)=> {
            const checkBox = event.target
            if (checkBox.classList.contains("unchecked")) {
                checkBox.classList.remove("unchecked")
                checkBox.classList.add("checked")
            }
            else {
                checkBox.classList.remove("checked")
                checkBox.classList.add("unchecked")
            }
            siteController.changeStatus(event.target.parentNode.parentNode.parentNode.id);
            event.stopPropagation();
        })
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("taskTitleDiv")        
        titleDiv.innerHTML = taskList[taskId].getTitle();

        //right div contents
        const rightDiv = document.createElement("div")
        rightDiv.classList.add("rightTaskDiv") 
        const starBtn = document.createElement("img")
        starBtn.classList.add("starTaskBtn")
        if (taskList[taskId].getStar()) {
            starBtn.classList.add("starredTask")
        }
        starBtn.setAttribute("src", cache["./star-face.png"])
        starBtn.addEventListener("click", (event)=> {
            if (starBtn.classList.contains("starredTask")) {
                starBtn.classList.remove("starredTask")
            }
            else {
                starBtn.classList.add("starredTask")
            }
            siteController.changeStar(event.target.parentNode.parentNode.parentNode.id);

            
        })

        const detailsBtn = document.createElement("button")
        detailsBtn.classList.add("detailsButton")
        detailsBtn.innerHTML="Show More"
        detailsBtn.addEventListener("click", event => expandDetails(event))
        const deleteBtn = document.createElement("button") 
        deleteBtn.innerHTML="X"
        deleteBtn.classList.add("deleteTaskBtn")
        deleteBtn.addEventListener("click", (event)=> deleteTask(event))
        leftDiv.append(checkDiv,titleDiv);
        rightDiv.append(starBtn,detailsBtn, deleteBtn)
        hellDiv.append(leftDiv,rightDiv)
        taskDiv.append(hellDiv)
        content.append(taskDiv)

        //universal createTask module
    }
    const deleteTask =(event)=> {
        const taskTarget = event.target.parentNode.parentNode.parentNode;
        const targetId = taskTarget.id
        siteController.remove("task", targetId);
        taskTarget.remove();

    } 
    const expandDetails =(event)=> {
        const taskTarget = event.target.parentNode.parentNode.parentNode;
        const targetId = taskTarget.id
        const buttonType = event.target.innerHTML;

        if (buttonType =="Show More") {
            const description = document.createElement("div")
            const projectName = document.createElement("div")
            description.classList.add("moreInfo")
            projectName.classList.add("projectDescription")
            description.innerHTML = siteController.getTaskList()[targetId].getDescription()
            projectName.innerHTML = siteController.getTaskList()[targetId].getProject()
            event.target.innerHTML = "Show Less"
            taskTarget.append(projectName,description)   
        }
        else if (buttonType == "Show Less") {
            taskTarget.removeChild(taskTarget.querySelector(".moreInfo"));
            taskTarget.removeChild(taskTarget.querySelector(".projectDescription"))
            event.target.innerHTML = "Show More"
        }



        console.log(targetId);
        event.stopPropagation;
    }
    const drawTab = (classList) => {
        //draw one of three titles
        let newPage =""
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title")
        if (classList.contains("taskNav")) {
            titleDiv.innerText = ""
            changeForm();
            taskTab.display();
            newPage = "taskNav";
        }
        else if (classList.contains("starNav")) {
            titleDiv.innerText = ""
            changeForm();
            starredTab.display();
            newPage = "starNav"
        }
        content.appendChild(titleDiv)
        return newPage;
    }
    const changeForm = () => {
        if (showBtn.classList.contains("formHide")) {
            showBtn.classList.remove("formHide")
        }
        else {
            showBtn.classList.add("formHide")
        }
        if (!form.classList.contains("formHide")) {
            form.classList.add("formHide")
        }

    }
    const changeTab = (target) => {
        if (target.classList.contains(currentTab.getTab())) {
            console.log("do nothing");
            return;
        }
        content.innerHTML = ""
        currentTab.updatePage(drawTab(target.classList));
        //call one of three tabs, check event.id to see which to call
    }
    return {
        startup,
        update,
        drawTask,
    }

})()



const projectTab = (() => {
    //recipe to draw projectTab
})()
const taskTab = (() => {
    //recipe to draw taskTab
    //display entire taskList
    //button to add new t

    const display = () => {
        const keys = Object.keys(siteController.getTaskList())
        console.log(keys);
        
        keys.forEach((key) => {
            displayHandler.drawTask(key)
        })
    }
    return {
        display
    }
})()

const starredTab = (() => {

    const display = () => {
        const taskList = siteController.getTaskList();
        for (const key in taskList) {
            if (taskList[key].getStar()) {
                displayHandler.drawTask(taskList[key].getId())
            }
        }
    }
    return {
        display
    }
})()
const currentTab = (() => {
    //tabs: tasks, starred, a projectview
    let page = "";
    const updatePage = (newPage) => {
        page = newPage;
    }
    return {
        getTab() {
            return page;
        },
        updatePage
    }
})()


export {displayHandler}