import { differenceInDays, format } from "date-fns";
import differenceInCalendarDays from "date-fns/fp/differenceInCalendarDays/index.js";
import { ru } from "date-fns/locale";
import Swal from "sweetalert2/dist/sweetalert2.js";

const Swal = require("sweetalert2");
let favorite = [] // массив для избранного
let currentID

async function loadTours() {
  const response = await fetch(
    "https://www.bit-by-bit.ru/api/student-projects/tours"
  );
  const date = await response.json();
  console.log(date);
  return date;
}

function renderTours(tours) {
  document.getElementById("container").innerHTML = "";

  tours.forEach((tour) => {
    const city = checkCity(tour);
    const duration = differenceInDays(
      new Date(tour.endTime),
      new Date(tour.startTime)
    );
    const pattern = "dd MMMM";
    const option = {
      locale: ru,
    };
   
  
    let favoriteId = []
    favorite.forEach(t => favoriteId.push(t.id))
    const isFavorite = favoriteId.includes(tour.id)
    
    console.log(isFavorite)
    document.getElementById("container").innerHTML += `
        
        <div class="bg-white shadow-lg rounded-lg overflow-hidden relative m-5 h-[42rem] grid lg:h-60 md:h-72 md:grid-cols-2 sm:grid-cols-1"> 
    
        <img class="h-full bg-cover bg-center" src="${tour.image}"</>
        <span class="m-5">
        <div class="flex font-medium text-xl">${
          tour.hotelName
        }<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-600 ml-2 mr-1">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg> ${tour.rating}</div>
          <p class="text-yellow-600 font-medium text-base hover:underline">${
            tour.country
          }, ${city}</p>
          <br> 
          <div class="flex">${format(
            new Date(tour.startTime),
            pattern,
            option
          )} - ${format(new Date(tour.endTime), pattern, option)},
          ${duration} дн.</div>
          <br> 
          <p class="flex justify-end gap-4 text-yellow-600 font-medium text-xl">${
            tour.price
          } руб.</p>

          <div class="absolute bottom-0">

        ${
          isFavorite ? 
          `<button class="btn m-2 center" id='deleteFavorite-${tour.id}'>Удалить из избранного</button>`
          : 
        `<button class="btn m-2 center" id='addFavorite-${tour.id}'>Добавить в избранное</button>`
        }

          <button class="btn m-2 center" id='booking-${tour.id}'>Забронировать</button>
          </div>
  

       </span>
       `;
  });

  tours.forEach((tour) => {
    const deleteFavorite = document.getElementById(`deleteFavorite-${tour.id}`)
    if (deleteFavorite)
    document.getElementById(`deleteFavorite-${tour.id}`)
      .addEventListener("click", () => deleteFavorite(id));
  });

/*   tours.forEach((tour) => {
  getFavorites(tour.id)
}); */

    tours.forEach((tour) => {
    const addFavorite = document.getElementById(`addFavorite-${tour.id}`)
    if (addFavorite)
    document.getElementById(`addFavorite-${tour.id}`)
      .addEventListener("click", () => getFavorites(tour.id));
  }); 

  tours.forEach((tour) => {
  document.getElementById(`favoriteButton`)
  .addEventListener("click", () => seeFavorites(tours))
});


  tours.forEach((tour) => {
    document
      .getElementById(`booking-${tour.id}`)
      .addEventListener("click", () => openModal(tour));
  });

  function deleteFavorite(id) {
    let favorite = []
    let currentTour = favoritourste.find(t => t.id === id)
    let tourIndex = favorite.indexOf(currentTour)
    favorite.splice(tourIndex, 1)
    renderTours(favorite)
    saveLocalStorage()
  } 
}



const ModalBoooking = document.getElementById("modal-booking");

function closeModal() {
  ModalBoooking.style.display = "none";
}

function openModal(tour) {
  let currentID = tour.id
  ModalBoooking.style.display = "flex";

  document.getElementById("container").innerHTML = "";

  const city = checkCity(tour);
  const duration = differenceInDays(
    new Date(tour.endTime),
    new Date(tour.startTime)
  );
  const pattern = "dd MMMM";
  const option = {
    locale: ru,
  };

  const ModalContent = document.getElementById("modal-content");
  ModalContent.innerHTML = `
      <p><div class="bg-white overflow-hidden m-5 relative h-[42rem] grid lg:h-60 md:h-72 md:grid-cols-2 sm:grid-cols-1"> 
    
      <img class="h-full bg-cover bg-center rounded-lg" src="${tour.image}"</>
      <span class="m-5">
      <div class="flex font-medium text-xl">${
        tour.hotelName
      }<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-yellow-600 ml-2 mr-1">
        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg> ${tour.rating}</div>
        <p class="text-yellow-600 font-medium text-base hover:underline">${
          tour.country
        }, ${city}</p>
        <br> 
        <div class="flex">${format(
          new Date(tour.startTime),
          pattern,
          option
        )} - ${format(new Date(tour.endTime), pattern, option)},
        ${duration} дн.</div>
        <br> 
        <p class="flex justify-end gap-4 text-yellow-600 font-medium text-xl">${
          tour.price
        } руб.</p>
        </span>
     </div>
     <div class="m-0 m-auto">
    <p class="m-4 text-center font-medium text-xl">Заполните необходимую информацию для бронирования тура</p>
    <input id="name" class="form" placeholder="Фамилия Имя Отчество"/>
    <div class="">
    <input id="phone" class="form" placeholder="Телефон"/>
    <input id="email" class="form" placeholder="E-mail"/>
    </div>
    <input id="comment" class="form" placeholder="Комментарий"/>

    <button class="btn m-3" id="send-modal-button-${tour.id}">Отправить</button>
    <button class="btn m-3" id="close-modal-button">Закрыть</button> 

  </div>
     
     `;

  
  document
    .getElementById(`close-modal-button`)
    .addEventListener("click", closeModal, init());

  
  document
    .getElementById(`send-modal-button-${tour.id}`)
    .addEventListener("click", () => {
      bookingTour()
    });
  
}



async function bookingTour() {

  let name = document.getElementById("name").value;
  let phone = document.getElementById("phone").value;
  let email = document.getElementById("email").value;
  let comment = document.getElementById("comment").value;

  const params = {
    customerName: name,
    phone: phone,
    email: email,
    description: comment,
  };




  const url = `https://www.bit-by-bit.ru/api/student-projects/tours/${currentID}`;

  let response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(params)
  })

  try {
    let data = await response.json();
    if (parseInt(data.id) === currentID) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Тур забронирован",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  } catch {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Что-то пошло не так...",
      showConfirmButton: false,
      timer: 2000,
    });
  }
  
}

// Избранное


function saveLocalStorage() {
  const toursJson = JSON.stringify(favorite)
  localStorage.setItem('favorite', toursJson)
}

// страница с избранными турами, попытка сделать
async function seeFavorites(id) {
  let favorite = JSON.parse(localStorage.getItem("favorite"))
  const response = await fetch("https://www.bit-by-bit.ru/api/student-projects/tours");
  const tours = await response.json();

  if (id) {
     if (favorite.length >= 1) {
     const favorited = tours.filter(tour => favorite.includes(tour.id))
     renderTours(favorited)
     console.log(favorited)
     saveLocalStorage()
     } else {
      document.getElementById("container").innerHTML = `<div class="text-center font-medium text-5xl m-16 text-gray-500">Туры не найдены</div>`;
      saveLocalStorage()
     }

     document
    .getElementById("all")
    .addEventListener("click", () => init()); 

    // почему-то с третьего нажатия на кнопку все туры перерисовывает
}
saveLocalStorage()
}

function getFavorites(id) {
  let favorite = JSON.parse(localStorage.getItem("favorite"))
  if(id) {
    if (favorite.includes(id)) {
      favorite.push(id)

    }
    
  }
  saveLocalStorage()
}







  



// фильтры

function checkCity(tour) {
  if (tour.city === null || tour.city === undefined) {
    return "";
  } else {
    return tour.city;
  }
}

function filterByCountry(tours, country) {
  if (country) {
    const filtredTours = tours.filter((tour) => {
      return tour.country === country;
    });
    renderTours(filtredTours);
  } else {
    renderTours(tours);
  }
}

function filterByPrice(tours) {
  let price = document.getElementById("price").value;
  document.getElementById("toPrice").innerHTML = "";
  document.getElementById("toPrice").innerHTML += `
  <div class="">Выбранная цена: ${price} руб.</div>
  `;
  const filtredTours = tours.filter((tour) => {
    return tour.price <= price;
  });
  renderTours(filtredTours);
}

function filterByRating(tours, rating) {
  if (rating > 8) {
    const filtredRating1 = tours.filter((tour) => {
      return tour.rating >= 8;
    });
    renderTours(filtredRating1);
  } else if (rating < 8) {
    const filtredRating2 = tours.filter((tour) => {
      return tour.rating <= 8;
    });
    renderTours(filtredRating2);
  } else {
    renderTours(tours);
  }
}


const toursJson = localStorage.getItem("favorite")
if (toursJson) {
  favorite = JSON.parse(toursJson)
}  

async function init() {
  const tours = await loadTours();
  renderTours(tours);

  document
    .getElementById("indonesia")
    .addEventListener("click", () => filterByCountry(tours, "Индонезия"));
  document
    .getElementById("thailand")
    .addEventListener("click", () => filterByCountry(tours, "Тайланд"));
  document
    .getElementById("maldives")
    .addEventListener("click", () => filterByCountry(tours, "Мальдивы"));
  document
    .getElementById("egypt")
    .addEventListener("click", () => filterByCountry(tours, "Египет"));
  document
    .getElementById("cyprus")
    .addEventListener("click", () => filterByCountry(tours, "Кипр"));
  document
    .getElementById("mexico")
    .addEventListener("click", () => filterByCountry(tours, "Мексика"));
  document
    .getElementById("tanzania")
    .addEventListener("click", () => filterByCountry(tours, "Танзания"));
  document
    .getElementById("all")
    .addEventListener("click", () => filterByCountry(tours));
  document
    .getElementById("less")
    .addEventListener("input", () => filterByRating(tours, 7));
  document
    .getElementById("more")
    .addEventListener("input", () => filterByRating(tours, 9));
  document
    .getElementById("allRatings")
    .addEventListener("input", () => filterByRating(tours));
  document.getElementById("price").addEventListener("change", function () {
    filterByPrice(tours);
  });
}

init();
