// const obj = {
//   name: "Jason",
//   age: 25,
// };
// if (obj.name === "Peter" || obj.name === "Jason") {
//   console.log("안녕, " + obj.name);
// } else {
//   console.log("you are not a member!");
// }

const messageContainer = document.querySelector("#d-day-message");
const container = document.querySelector("#d-day-container");
const savedDate = localStorage.getItem("saved-date");

localStorage.removeItem("saved-date");

messageContainer.textContent = "D-Day를 입력해 주세요.";

const intervalIdArr = [];

container.style.display = "none";

const dataFormMaker = function () {
  const inputYear = document.querySelector("#target-year-input").value;
  const inputMonth = document.querySelector("#target-month-input").value;
  const inputDate = document.querySelector("#target-date-input").value;

  // const dataFormat = inputYear + '-' + inputMonth + '-' + inputDate;

  const dataFormat = `${inputYear}-${inputMonth}-${inputDate}`;
  // 템플릿 리터럴
  return dataFormat;
};

const counterMaker = function (data) {
  if (data !== savedDate) {
    localStorage.setItem("saved-date", data);
  }

  const nowDate = new Date();
  const targetDate = new Date(data);
  const remaining = (targetDate - nowDate) / 1000;

  if (remaining <= 0) {
    //만약, remaining이 0이라면, 타이머가 종료되었습니다. 출력
    //이렇게 사람 말로 적는 것을 수도코드라고 함.
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>타이머가 종료되었습니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  } else if (isNaN(targetDate)) {
    //만약, 잘못된 날짜가 들어왔다면, 유효한 시간대가 아닙니다.
    container.style.display = "none";
    messageContainer.innerHTML = "<h3>유효한 시간대가 아닙니다.</h3>";
    messageContainer.style.display = "flex";
    setClearInterval();
    return;
  }

  const remainingObj = {
    remainingDate: Math.floor(remaining / 3600 / 24),
    remainingHours: Math.floor((remaining / 3600) % 24),
    remainingMin: Math.floor(remaining / 60) % 60,
    remainingSec: Math.floor(remaining) % 60,
  };

  const documentArr = ["days", "hours", "min", "sec"];

  const timeKeys = Object.keys(remainingObj);

  const format = function (time) {
    if (time < 10) {
      return "0" + time;
    } else {
      return time;
    }
  };

  let i = 0;
  for (let tag of documentArr) {
    const remainingTime = format(remainingObj[timeKeys[i]]);
    document.getElementById(tag).textContent = remainingTime;
    i++;
  }

  // const documentObj = {
  //   days: document.getElementById("days"),
  //   hours: document.getElementById("hours"),
  //   min: document.getElementById("min"),
  //   sec: document.getElementById("sec"),
  // };
  // let i = 0;
  // for (let key in documentObj) {
  //   documentObj[key].textContent = remainingObj[timeKeys[i]];
  //   // i = i + 1
  //   i++;
  // }

  // documentObj["days"].textContent = remainingObj["remainingDate"];
  // documentObj["hours"].textContent = remainingObj["remainingHours"];
  // documentObj["min"].textContent = remainingObj["remainingMin"];
  // documentObj["sec"].textContent = remainingObj["remainingSec"];
};

const starter = function (targetDateInput) {
  console.log(targetDateInput);
  if (!targetDateInput) {
    targetDateInput = dataFormMaker();
  }
  container.style.display = "flex";
  messageContainer.style.display = "none";
  setClearInterval();
  counterMaker(targetDateInput);
  const intervalId = setInterval(() => counterMaker(targetDateInput), 1000);
  intervalIdArr.push(intervalId);

  // for (let i = 0; i < 100; i++) {
  //   setTimeout(counterMaker, 1000 * i);
  // }
};

const setClearInterval = function () {
  localStorage.removeItem("saved-date");
  for (let i = 0; i < intervalIdArr.length; i++) {
    clearInterval(intervalIdArr[i]);
  }
};

const resetTimer = function () {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
  messageContainer.style.display = "flex";
  setClearInterval();
};

if (savedDate) {
  starter(savedDate);
} else {
  container.style.display = "none";
  messageContainer.innerHTML = "<h3>D-Day를 입력해 주세요.</h3>";
}
