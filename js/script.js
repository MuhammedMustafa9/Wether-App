let locationName = document.querySelector("#locationName");
let curentIcon = document.querySelector("#curentIcon");
let temp = document.querySelector("#temp");
let time = document.querySelector("#time");
let am_pm = document.querySelector("#am_pm");
let date = document.querySelector("#date");

setTimeout(() => {
  document.querySelector(".loading").classList.add("d-none");
}, 2000);

async function getForcast(query) {
  let res = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=85725acfc1704c94aa1143606231011&q=${query}&days=3`
  );
  if (res.status == 200 && res.ok) {
    let finalRes = await res.json();
    showForcast(finalRes);
  }
}
getForcast("cairo");

async function showForcast(finalRes) {
  let { forecast, location, current } = finalRes;
  let { forecastday } = forecast;
  console.log(forecastday);
  locationName.innerHTML = location.name;
  temp.innerHTML = current.temp_c + "&deg;";
  curentIcon.src = current.condition.icon;
  document.querySelector("#description").innerHTML = current.condition.text;
  document.querySelector(".percentage").innerHTML =
    forecastday[0].day.avghumidity + "%";
  document.querySelector(".wind").innerHTML =
    forecastday[0].day.maxwind_kph + "Km/h";
  document.querySelector(".compas").innerHTML = forecastday[0].hour[0].wind_dir;
  document.querySelectorAll("#forcastdate").forEach((item, index) => {
    item.innerHTML = getDayOfWeek(forecastday[index + 1].date);
  });
  document.querySelectorAll("#forcastimage").forEach((item, index) => {
    item.src = forecastday[index + 1].day.condition.icon;
  });
  document.querySelectorAll("#condtext").forEach((item, index) => {
    item.innerHTML = forecastday[index + 1].day.condition.text;
  });
  let date = new Date();
  document.querySelector("#date").innerHTML = date.toDateString();
  document.querySelector("#time").innerHTML = date.toLocaleTimeString();
}

function getDayOfWeek(dateStrign) {
  const date = new Date(dateStrign);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayIndex = date.getDay();
  return daysOfWeek[dayIndex];
}
