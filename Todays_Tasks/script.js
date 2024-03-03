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

const taskTabs = document.querySelector(".task__tabsList");

const totalHours = 24;
const startHour = 10;
const endHour = 23;
const allTodaysTask = [];

let activeTaskTab = 0;
function toggleNavbar() {
  taskHeading.classList.toggle("bottom-nav");
}
todaysDayEle.addEventListener("click", () => toggleNavbar());
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
  // if (time.getHours() > endHour) {
  const currentHour = document.querySelector(
    `[data-hour="${time.getHours()}"]`
  );
  const currentCursor = document.createElement("div");
  currentCursor.classList.add("time__nowCursor");
  currentHour.appendChild(currentCursor);
  return [currentHour, currentCursor];
  // }
}

function updateCursor(cursorEle) {
  cursorEle.style.top = (time.getMinutes() * 100) / 60 + "%";
  return cursorEle;
}

addHours();
let currentActiveTask = getCurrentHour();
updateCursor(currentActiveTask[1]);

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
var tasksList = new Array();
var listOfTasks = [
  {
    date: todaysDate,
    totalNumberOfTasks: 2,
    tasks: [
      // {
      //   taskName: "leisure",
      //   taskColor: "none",
      //   time: [
      //     {
      //       start: "2024-03-02T06:00:11.658Z",
      //       end: "2024-03-02T07:00:11.658Z",
      //     },
      //   ],
      //   taskEfforts: 1,
      // },
      {
        taskName: "Breakfast",
        taskColor: "azure",
        time: [
          {
            start: "2024-03-02T06:00:11.658Z",
            end: "2024-03-02T07:00:11.658Z",
          },
        ],
        taskEfforts: 1,
      },
      // {
      //   taskName: "Jv",
      //   taskColor: "orange",
      //   time: [
      //     {
      //       start: "2024-03-02T11:00:11.658Z",
      //       end: "2024-03-02T12:00:11.658Z",
      //     },
      //     {
      //       start: "2024-03-02T13:00:11.658Z",
      //       end: "2024-03-02T13:30:11.658Z",
      //     },
      //   ],
      //   taskEfforts: 1.5,
      // },
    ],
  },
];

const todaysTaskData = getTodaysTask(todaysDate);

function storeTasks(tasks) {
  // console.log("DATA to store", tasks);
  const dataToStore = JSON.stringify(tasks);
  localStorage.removeItem("TodaysTaskManager");
  localStorage.setItem("TodaysTaskManager", dataToStore);
  getTodaysTask(todaysDate);
  addTasksToTabs(todaysTaskData);
}
addTasksToTabs(todaysTaskData);
// storeTasks(listOfTasks);

function getTodaysTask(dateForTask) {
  const dataGot =
    localStorage.getItem("TodaysTaskManager") == null ||
    localStorage.getItem("TodaysTaskManager").length < 0
      ? listOfTasks
      : JSON.parse(localStorage.getItem("TodaysTaskManager"));
  listOfTasks = dataGot;
  // console.log("Data local", dataGot);
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

function setTodaysTask(taskData) {
  // console.log(taskData);
  let dataUpdated = listOfTasks.forEach((dateData, i) => {
    if (listOfTasks[i].date.toString() == taskData.date.toString) {
      // console.log(listOfTasks[i], taskData);
      listOfTasks[i] = taskData;
    }
  });
  // console.log("Data sent", listOfTasks, dataUpdated);
  storeTasks(listOfTasks);
  return listOfTasks;
}
/*------ Add Todays Tasks tab ------*/
// console.log(todaysTaskData.tasks);

function addTasksToTabs(tasksData) {
  taskTabs.querySelectorAll(".task__tab").forEach((tab) => {
    if (!tab.classList.contains("--users-task")) tab.remove();
  });

  tasksData.tasks.forEach((task, i) => {
    tasksList.push(task);
    let tabElement = document.createElement("div");
    tabElement.classList.add("task__tab");
    tabElement.dataset.task = task.taskName;
    tabElement.dataset.color = task.taskColor;
    tabElement.dataset.taskId = i + 1;
    tabElement.textContent = task.taskName;
    taskTabs.appendChild(tabElement);
  });
  intializeTabs();
}

/*------ Tabs ------*/
function intializeTabs() {
  taskTabs.querySelectorAll(".task__tab").forEach((tab) => {
    if (tab.dataset.taskId == activeTaskTab) tab.classList.add("active");
    tab.addEventListener("click", (e) => {
      // activateTab(e);
      console.log(e.currentTarget);
      if (!e.currentTarget.classList.contains("active")) {
        let task = e.currentTarget;
        let taskId = task.dataset.taskId - 1;
        activeTaskTab = taskId + 1;
        activateTab(e);
        updateStartTime(e, taskId);
        updateEndTime();
        setTodaysTask(todaysTaskData);
        console.log(e.currentTarget);
      }
    });
  });
}

function activateTab(e) {
  let tab = e.currentTarget;
  taskTabs.querySelectorAll(".task__tab").forEach((tab) => {
    tab.classList.contains("active") && tab.classList.remove("active");
  });
  tab.classList.add("active");
}

function updateStartTime(e, taskId) {
  let startTime = new Date().toISOString();
  let newstartedTime = { start: startTime, end: "" };
  if (taskId != -1) {
    todaysTaskData.tasks[taskId].time.push(newstartedTime);
  }
}

function updateEndTime() {
  let endTime = new Date().toISOString();
  let newTime =
    todaysTaskData.tasks[activeTaskTab - 1].time[
      todaysTaskData.tasks[activeTaskTab - 1].time.length - 1
    ].end == ""
      ? endTime
      : todaysTaskData.tasks[activeTaskTab - 1].time[
          todaysTaskData.tasks[activeTaskTab - 1].time.length - 1
        ].end;
  // console.log(newTime);
}
/*------ Occupied Time ------*/
const onetaskHourEle = document.querySelector(".task__hour").offsetHeight;
tasksList.forEach((task) => {
  let totalHoursSpent = new Number();
  task.time.forEach((timeBreak) => {
    totalHoursSpent += addOccupiedTimeBar(
      timeBreak.start,
      timeBreak.end,
      task.taskColor
    );
  });
  task.taskEfforts = totalHoursSpent;
  // console.log(task.taskName, totalHoursSpent);
  // storeTasks(listOfTasks);
});

function addOccupiedTimeBar(start, end, color) {
  var occupiedTimeEle = document.createElement("div");
  occupiedTimeEle.className = "task__occupied";
  occupiedTimeEle.dataset.color = color;

  let startHour = new Date(start).getHours();
  let startMinutes = new Date(start).getMinutes();
  let endHour = new Date(end).getHours();
  let endMinutes = new Date(end).getMinutes();

  let startTotalMinutes = startHour * 60 + startMinutes;
  let endTotalMinutes = endHour * 60 + endMinutes;

  let top = ((startTotalMinutes - 10 * 60) * onetaskHourEle) / 60;
  let totalTime = (endTotalMinutes - startTotalMinutes) / 60;

  occupiedTimeEle.style.top = "calc(" + top + "px" + " - 3.7% )";
  occupiedTimeEle.style.height = totalTime * onetaskHourEle + "px";

  hourlytasksWrapper.appendChild(occupiedTimeEle);
  return totalTime;
}

/*------ Add new tasks ------*/
const addtaskForm = document.getElementById("addNewTask");
const formTextInput = document.getElementById("taskName");
const formColorInput = document.getElementById("taskColor");

addtaskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let name = formTextInput.value;
  let color = formColorInput.value;
  let newTask = {
    taskName: name,
    taskColor: color,
    time: [],
    taskEfforts: 0,
  };
  todaysTaskData.tasks.push(newTask);
  setTodaysTask(todaysTaskData);
  addtaskForm.reset();
  closeModal();
});
/*------ Loop ------*/
setInterval(() => {
  updateCursor(currentActiveTask[1]);
}, 60000);
