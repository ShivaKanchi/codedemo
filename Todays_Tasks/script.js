const time = new Date();
const container = document.querySelector(".container");
const modal = document.querySelector(".modal");
const modalTitle = modal.querySelector(".modal__Heading");

const taskHeading = document.querySelector(".task__heading");
const todaysDayEle = document.querySelector(".task__todaysDate");
todaysDayEle.textContent = time.toDateString();

const hourlytasksWrapper = document.getElementById("taskList");

const totalHours = 24;
const startHour = 0;
const endHour = 23;
const allTodaysTask = [];

function openModal(e, operation) {
  let selectedHour = parseInt(e.target.parentNode.dataset.hour);
  container.classList.add("--hide");
  modal.classList.add("--show");
  modalTitle.textContent = `Add Task for ${selectedHour} to ${
    selectedHour + 1
  }`;
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
    hourTaskList.addEventListener("click", (e) => {
      openModal(e, "add");
    });

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
