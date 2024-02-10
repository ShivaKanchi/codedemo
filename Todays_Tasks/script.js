const time = new Date();
const todaysDayEle = document.querySelector(".task__todaysDate");
todaysDayEle.textContent = time.toDateString();

const hourlytasksWrapper = document.getElementById("taskList");

const totalHours = 24;
const startHour = 7;
const endHour = 23;
const allTodaysTask = [];

function addHours() {
  // Append Hours to Task List
  for (let i = startHour; i <= endHour; i++) {
    const hourTask = document.createElement("div");
    hourTask.classList.add("task__hour");
    hourTask.dataset.hour = i;
    const hour = document.createElement("span");
    hour.textContent = (i > 12 ? i : i) + (i >= 13 ? "pm" : "am");
    hourTask.appendChild(hour);
    allTodaysTask.push(hourTask);
    hourlytasksWrapper.appendChild(hourTask);
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

const editCursor = document.querySelector(".time__editCursor");
const nowCursor = document.querySelector(".time__nowCursor");

function addEditCursor() {
  const currentHour = document.querySelector(
    `[data-hour="${time.getHours()}"]`
  );
  const editCursor = document.createElement("div");
  editCursor.classList.add("time__editCursor");
  currentHour.appendChild(editCursor);
}

nowCursor.addEventListener("click", () => {
  console.log("Clicked, ready to add draggable edit cursor");
  // addEditCursor();
});
