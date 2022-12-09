import {siteController} from "./siteHandler.js";
const cache = {};
function importAll(r) {
  r.keys().forEach((key) => (cache[key] = r(key)));
}
const images = importAll(require.context('./assets', false, /\.(gif|png|jpe?g|svg)$/));



const displayHandler = (() => {
    const tasks = document.querySelector("#tasks");
    const starred = document.querySelector(".starred")
    const addProject = document.querySelector(".addProject")
    //query task article div, project div
    const startup = () => {
        currentTab.updatePage("taskNav");
        startupNavBar();
        //add event listeners to tasks, starred, add Project button (flex order -1)
    }
    const startupNavBar = () => {
        const taskImg = document.querySelector(".taskImg").setAttribute("src",cache["./file-document-check.png"])
        const starImg = document.querySelector(".starImg").setAttribute("src",cache["./star-face.png"])
        const projectImg = document.querySelector(".projectImg").setAttribute("src",cache["./plus.png"])
        tasks.addEventListener("click",(event)=>{
            changeTab(event.target)            
            event.stopPropagation();
        })
    }
    const update = () => {
        //can be called by an event listener
    }
    const drawTask = ()=>{
        //universal createTask module
    }
    const changeTab = (target) => {
        if (target.classList.contains(currentTab.getTab())) {
            console.log("do nothing");   
        }
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