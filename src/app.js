import { differenceInDays, format } from "date-fns";
import differenceInCalendarDays from "date-fns/fp/differenceInCalendarDays/index.js";
import { el, ru } from "date-fns/locale";
import { Container } from "postcss";
import Swal from "sweetalert2/dist/sweetalert2.js";

let currentID
const Swal = require("sweetalert2");
let favorite = [] // массив для избранного


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

  if (tours.length === 0) {
    document.getElementById("container").innerHTML += `<div class="text-gray-500 text-2xl mt-6 text-center">К сожалению ничего не найдено</div>`
    return
  }

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

       
          <button class="btn m-2" id='deleteFavorite-${tour.id}'>Удалить из избранного</button>
        <button class="btn m-2" id='addFavorite-${tour.id}'>Добавить в избранное</button>
          <button class="btn m-2" id='booking-${tour.id}'>Забронировать</button>
          </div>
  

       </span>
       `;
       
       if (favorite.includes(tour.id))  {
        deleteBtn(tour)
       } else {
        addBtn(tour)
       }
  });



  tours.forEach((tour) => {
    document
      .getElementById(`booking-${tour.id}`)
      .addEventListener("click", () => openModal(tour));
  });


  function addBtn(tour) {
    document.getElementById(`addFavorite-${tour.id}`).style.display = "flex"
    document.getElementById(`deleteFavorite-${tour.id}`).style.display = "none"
  }

  function deleteBtn(tour) {
    document.getElementById(`addFavorite-${tour.id}`).style.display = "none"
    document.getElementById(`deleteFavorite-${tour.id}`).style.display = "flex"
  }


function deleteFavorite(tour) {
  const index = favorite.indexOf(tour.id)
  favorite.splice(index, 1)
  saveLocalStorage()
}

  document.getElementById(`favoriteButton`).addEventListener("click", () => {
    const favoriteTours = tours.filter((t) => {
      return favorite.includes(t.id)
    })
    renderTours(favoriteTours)
});


tours.forEach((tour) => {
  if (favorite.includes(tour.id)) {
  document.getElementById(`deleteFavorite-${tour.id}`)
    .addEventListener("click", () => {
      deleteFavorite(tour)
      renderTours(tours)
      saveLocalStorage()
      
    })
} else {
  document.getElementById(`addFavorite-${tour.id}`)
  .addEventListener("click", () => {
    favorite.push(tour.id)
    renderTours(tours)
    saveLocalStorage()

})
}
})
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
    <div id="name-error" class="error"></div>
    <input id="name" class="form" placeholder="Фамилия Имя Отчество"/>

    <div id="phone-error" class="error"></div>
    <input id="phone" class="form" placeholder="Телефон"/>
    <div id="email-error" class="error"></div>
    <input id="email" class="form" placeholder="E-mail"/>
    
  
    <input id="comment" class="form" placeholder="Комментарий"/>
<div class="text-center">
    <button class="btn m-3" id="send-modal-button-${tour.id}">Отправить</button>
    <button class="btn m-3" id="close-modal-button">Закрыть</button> 
    </div>
  </div>
     
     `;

     function validateEmail() {
      let с = document.getElementById("email").value;
      if (с == "") {
        document.getElementById("phone-error").innerHTML = `Укажите ваш email`
        return false;
      } else {
        document.getElementById("phone-error").innerHTML = ``
      }}
      
      function validatePhone() {
        let b = document.getElementById(`phone`).value;
        if (b == "") {
          document.getElementById("email-error").innerHTML = `Укажите ваш телефон`
          return false;
        } else {
          document.getElementById("email-error").innerHTML = ``
        }}

      function validateName() {
        let a = document.getElementById(`name`).value;
        if (a == "") {
          document.getElementById("name-error").innerHTML = `Укажите ваше ФИО`
          return false;
        } else {
          document.getElementById("name-error").innerHTML = ``
        }
      }
    
  
  document
    .getElementById(`close-modal-button`)
    .addEventListener("click", closeModal, init());

  
  document
    .getElementById(`send-modal-button-${tour.id}`)
    .addEventListener("click", () => {
      validatePhone()
      validateEmail()
      validateName()
      bookingTour()
    });

    


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
          }, closeModal());
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


}




// Избранное




// // страница с избранными турами, попытка сделать
// async function seeFavorites(id) {
//   let favorite = JSON.parse(localStorage.getItem("favorite"))
//   const response = await fetch("https://www.bit-by-bit.ru/api/student-projects/tours");
//   const tours = await response.json();

//   if (id) {
//      if (favorite.length >= 1) {
//      const favorited = tours.filter(tour => favorite.includes(tour.id))
//      renderTours(favorited)
//      console.log(favorited)
//      saveLocalStorage()
//      } else {
//       document.getElementById("container").innerHTML = `<div class="text-center font-medium text-5xl m-16 text-gray-500">Туры не найдены</div>`;
//       saveLocalStorage()
//      }

//      document
//     .getElementById("all")
//     .addEventListener("click", () => init()); 

//     // почему-то с третьего нажатия на кнопку все туры перерисовывает
// }
// saveLocalStorage()
// }

// function getFavorites(id) {
//   let favorite = JSON.parse(localStorage.getItem("favorite"))
//   if(id) {
//     if (favorite.includes(id)) {
//       favorite.push(id)

//     }
    
//   }
//   saveLocalStorage()
// }






    function saveLocalStorage() {
    const toursJson = JSON.stringify(favorite)
    localStorage.setItem('favorite', toursJson)
 }
  
 const toursJson = localStorage.getItem("favorite")
if (toursJson) {
  favorite = JSON.parse(toursJson)
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
