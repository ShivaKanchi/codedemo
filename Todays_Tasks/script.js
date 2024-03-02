const time = new Date();
const todaysDate = time.toDateString();
const container = document.querySelector(".container");

const addTaskButton = document.querySelector(".task__addtask");

const modal = document.querySelector(".modal");
const modalTitle = modal.querySelector(".modal__Heading");

const taskHeading = document.querySelector(".task__heading");
const todaysDayEle = document.querySelector(".task__todaysDate");
todaysDayEle.textContent = todaysDate;

const hourlytasksWrapper = document.getElementById("taskList");

const totalHours = 24;
const startHour = 0;
const endHour = 23;
const allTodaysTask = [];

function openModal(e, operation) {
  // let selectedHour = parseInt(e.target.parentNode.dataset.hour);
  container.classList.add("--hide");
  modal.classList.add("--show");
  // modalTitle.textContent = `Add Task for ${selectedHour} to ${
  //   selectedHour + 1
  // }`;
}
function closeModal() {
  container.classList.remove("--hide");
  modal.classList.remove("--show");
}
modal.addEventListener("click", (e) => {
  e.target.classList.contains("modal") && closeModal();
});
// Append Hours to Task List
function addHours() {
  for (let i = startHour; i <= endHour; i++) {
    // Container of this hour
    const hourTask = document.createElement("div");
    hourTask.classList.add("task__hour");
    hourTask.dataset.hour = i;
    // Hour
    const hour = document.createElement("span");
    hour.textContent = (i > 12 ? i : i) + (i >= 13 ? "pm" : "am");
    hourTask.appendChild(hour);
    // TaskList of this hour
    const hourTaskList = document.createElement("div");
    hourTaskList.classList.add("task__hourtaskList");

    hourTask.appendChild(hourTaskList);
    hourlytasksWrapper.appendChild(hourTask);
    allTodaysTask.push(hourTask);
  }
}

function getCurrentHour() {
  const currentHour = document.querySelector(
    `[data-hour="${time.getHours()}"]`
  );
  const currentCursor = document.createElement("div");
  currentCursor.classList.add("time__nowCursor");
  currentHour.appendChild(currentCursor);

  return [currentHour, currentCursor];
}

function updateCursor(cursorEle) {
  cursorEle.style.top = (time.getMinutes() * 100) / 60 + "%";
  return cursorEle;
}

addHours();
let currentActiveTask = getCurrentHour();
updateCursor(currentActiveTask[1]);
setInterval(() => {
  updateCursor(currentActiveTask[1]);
}, 60000);

let currentY = 0;
window.addEventListener("scroll", () => {
  if (currentY > window.scrollY) {
    taskHeading.classList.remove("--hide");
    currentY = window.scrollY;
  } else {
    taskHeading.classList.add("--hide");
    currentY = window.scrollY;
  }
});

addTaskButton.addEventListener("click", (e) => {
  openModal(e, "add");
});

/*------ Storing data ------*/

const listOfTasks = [
  {
    date: "Sat Mar 01 2024",
    totalNumberOfTasks: 3,
    tasks: [
      { taskName: "Camel", taskColor: "red" },
      { taskName: "Jv", taskColor: "orange" },
      { taskName: "BDC", taskColor: "yellow" },
    ],
  },
  {
    date: todaysDate,
    totalNumberOfTasks: 2,
    tasks: [
      { taskName: "SPRE", taskColor: "blue" },
      { taskName: "Jv", taskColor: "orange" },
    ],
  },
];

function storeTasks(tasks) {
  const dataToStore = JSON.stringify(tasks);
  // console.log(dataToStore);
  localStorage.setItem("TodaysTaskManager", dataToStore);
}
storeTasks(listOfTasks);

function getTodaysTask(dateForTask) {
  const dataGot = JSON.parse(localStorage.getItem("TodaysTaskManager"));
  let dataToFind;
  dataGot.map((dateData, i) => {
    newFunction();

    function newFunction() {
      if (dataGot[i].date.toString() == dateForTask) {
        dataToFind = dateData;
      }
    }
  });
  return dataToFind;
}
const todaysTaskData = getTodaysTask(todaysDate);

/*------ Add Tasks tab ------*/
const taskTabs = document.querySelector(".task__tabsList");
console.log(todaysTaskData.tasks);

function addTasksToTabs(tasksData) {
  tasksData.tasks.forEach((task, i) => {
    console.log(task.taskName, i, task.taskColor);
    let tabElement = document.createElement("div");
    tabElement.classList.add("task__tab");
    tabElement.dataset.task = task.taskName;
    tabElement.dataset.color = task.taskColor;
    tabElement.dataset.taskId = i + 1;
    tabElement.textContent = task.taskName;
    taskTabs.appendChild(tabElement);
  });
}

addTasksToTabs(todaysTaskData);
/*------ Tabs ------*/
const tabs = document.querySelectorAll(".task__tab");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    ativateTab(e);
  });
});

function ativateTab(e) {
  if (!e.currentTarget.classList.contains("active")) {
    tabs.forEach((tab) => {
      tab.classList.contains("active") && tab.classList.remove("active");
    });
    e.currentTarget.classList.add("active");
  }
}
