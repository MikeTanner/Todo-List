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
        }
        addTask.addEventListener("click", (event)=> {
            let taskId = "";
            let formArray = []
            event.preventDefault();
            if (validateFormData()) {
                formArray = [document.getElementById("inputTaskName").value, document.getElementById("inputProject").value, document.getElementById("inputDueDate").value, document.getElementById("inputDescription").value]
                //call siteHandler.add
                taskId = siteController.add(formArray);
                
            }
        })
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
    const drawTask = (classList)=>{

        //universal createTask module
    }
    const drawTab = (classList) => {
        //draw one of three titles
        let newPage =""
        const titleDiv = document.createElement("div")
        titleDiv.classList.add("title")
        if (classList.contains("taskNav")) {
            titleDiv.innerText = "All Tasks"
            changeForm();
            newPage = "taskNav";
        }
        else if (classList.contains("starNav")) {
            titleDiv.innerText = "Starred Tasks"
            changeForm();
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
    //button to add new task

    const display = () => {

    }
    return {
        display
    }
})()
const starredTab = (() => {
    //recipe to draw starredTab
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