// ==========================================
// 1. Existing Code (Header & Sidebar)
// ==========================================
let header = document.querySelector('.header');
let menuB = document.querySelector('#menu-btn');
let closeB = document.querySelector('#close-btn');
let sideB = document.querySelector('.side-bar');
let navB = document.querySelector('.side-bar .navbar-mobile'); 

let searchform = document.querySelector('.header .search-form'); 
let searchTglr = document.querySelector('#search-toggler');

searchTglr.onclick = () => {
  searchform.classList.toggle('active');
}

window.onscroll = () => {
  searchform.classList.remove('active');

  if(window.scrollY > 0){
    header.classList.add('active');
  }else{
    header.classList.remove('active');
  }
  
  sideB.classList.remove('active');
}

menuB.onclick = () =>{
  sideB.classList.add('active');
}

closeB.onclick = () => {
  sideB.classList.remove('active');
}

window.onclick = (e) => {
  if(!navB.contains(e.target) && e.target !== menuB && !menuB.contains(e.target)){
      sideB.classList.remove('active');
  }
  
  if(!searchform.contains(e.target) && e.target !== searchTglr && !searchTglr.contains(e.target)){
      searchform.classList.remove('active');
  }
}

let list_items = document.querySelectorAll('.filter form .list-container .list .items .item');

list_items.forEach(items => {
  items.onclick = () => {
    let list = items.parentElement.parentElement;
    let output = list.querySelector('.output');
    
    if(output){
        output.value = items.innerHTML;
    }
  }
});

// ==========================================
// 2. Car Cards Slider Logic
// ==========================================

const carsData = [
    {
        name: "Tiggo 9",
        img: "img/Tiggo 9.png", 
        price: "2,100,000 EGP",
        date: "2026",
        tag: "New",
        transmission: "Automatic",
        fuel: "Hybrid",
        range: "800 km"
    },
    {
        name: "eQ7",
        img: "img/eQ7.png",
        price: "1,850,000 EGP",
        date: "2025",
        tag: "Electric",
        transmission: "Automatic",
        fuel: "Electric",
        range: "500 km"
    },
    {
        name: "Tiggo 8 Pro Max",
        img: "img/Tiggo 8 Pro Max.png",
        price: "1,650,000 EGP",
        date: "2025",
        tag: "",
        transmission: "Automatic",
        fuel: "Petrol",
        range: "700 km"
    },
    {
        name: "Tiggo 7 Pro Max",
        img: "img/Tiggo 7 Pro Max.png",
        price: "1,350,000 EGP",
        date: "2025",
        tag: "",
        transmission: "Automatic",
        fuel: "Petrol",
        range: "650 km"
    },
    {
        name: "Arrizo 8",
        img: "img/Arrizo 8.png",
        price: "1,150,000 EGP",
        date: "2025",
        tag: "",
        transmission: "Automatic",
        fuel: "Petrol",
        range: "600 km"
    },
    {
        name: "Tiggo 4 Pro",
        img: "img/Tiggo 4 Pro.png",
        price: "950,000 EGP",
        date: "2025",
        tag: "",
        transmission: "Automatic",
        fuel: "Petrol",
        range: "580 km"
    }
];

let swiperInstance = null;

function populateSwiper(data) {
    const wrapper = document.querySelector('.swiper-wrapper');
    wrapper.innerHTML = ''; 

    data.forEach(car => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        slide.innerHTML = `
            <div class="car-card">
                ${car.tag ? `<span class="tag-badge">${car.tag}</span>` : ''}
                <div class="image-wrapper">
                    <img src="${car.img}" alt="${car.name}">
                </div>
                <div class="car-info">
                    <h3>${car.name}</h3>
                    <p class="car-price">Price: ${car.price}</p>
                    <div class="car-meta">
                        <span>${car.date}</span>
                        <span>${car.transmission}</span>
                        <span>${car.fuel}</span>
                        <span>${car.range}</span>
                    </div>
                </div>
            </div>
        `;
        
        wrapper.appendChild(slide);
    });
}

function initSwiper() {
    if (swiperInstance) {
        swiperInstance.destroy(true, true);
    }

    swiperInstance = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 30,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        }
    });
}

populateSwiper(carsData);
initSwiper();


// ==========================================
// Dropdown
// ==========================================

const allCarsForSearch = [
    { name: "Tiggo 9",          spotIndex: 0 },
    { name: "eQ7",              spotIndex: 1 },
    { name: "Tiggo 8 Pro Max",  spotIndex: 2 },
    { name: "Tiggo 8",          spotIndex: 3 },
    { name: "Tiggo 7 Pro Max",  spotIndex: 4 },
    { name: "Tiggo 4 Pro",      spotIndex: 5 },
    { name: "Arrizo 8",         spotIndex: 6 },
    { name: "Arrizo 6 GT",      spotIndex: 7 },
    { name: "Arrizo 5",         spotIndex: 8 },
    { name: "Tiggo 4 Pro 2025", spotIndex: 9 }
];

const searchBox = document.getElementById('searchBox');
const searchDropdown = document.getElementById('search-dropdown');

searchBox.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    // لو مفيش كلام، اخبي الـ dropdown
    if (query === '') {
        searchDropdown.style.display = 'none';
        return;
    }

    // فلترة السيارات
    const filtered = allCarsForSearch.filter(car =>
        car.name.toLowerCase().includes(query)
    );

    // امسح الـ dropdown القديم
    searchDropdown.innerHTML = '';

    if (filtered.length === 0) {
        searchDropdown.innerHTML = '<div class="search-no-results">No cars found</div>';
        searchDropdown.style.display = 'block';
        return;
    }

    // اعمل item لكل عربية
    filtered.forEach(car => {
        const item = document.createElement('div');
        item.className = 'search-dropdown-item';
        item.innerHTML = `<i class="fas fa-car"></i> ${car.name}`;

        item.addEventListener('click', () => {
            // ضع اسم العربية في الـ input
            searchBox.value = car.name;
            // اخبي الـ dropdown
            searchDropdown.style.display = 'none';
            // روح للـ spotlight وافتح العربية دي
            if (typeof window.goToSpotlight === 'function') {
                window.goToSpotlight(car.spotIndex);
            }
        });

        searchDropdown.appendChild(item);
    });

    searchDropdown.style.display = 'block';
});

// اخبي الـ dropdown لو ضغط برا
document.addEventListener('click', function (e) {
    if (!searchform.contains(e.target)) {
        searchDropdown.style.display = 'none';
    }
});

// اخبي الـ dropdown لو ضغط Escape
searchBox.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        searchDropdown.style.display = 'none';
        this.value = '';
    }
});


// ==========================================
// 3. Client Review Logic
// ==========================================

const reviewsData = [
    { name: "John Deo", img: "img/avatar.jpg", text: "Absolutely fantastic experience! The website interface is so smooth and I found my dream Chery in minutes." },
    { name: "Sarah Smith", img: "img/avatar.jpg", text: "The customer service is top-notch. They answered all my questions about the Tiggo 8 before I even visited the showroom." },
    { name: "Michael Chen", img: "img/avatar.jpg", text: "Best car purchase I've ever made. The loan calculator tool on the site helped me plan my budget perfectly." },
    { name: "Emily Johnson", img: "img/avatar.jpg", text: "I love my new Arrizo 8! The booking process for the test drive through the website was incredibly easy and fast." },
    { name: "Ahmed Hassan", img: "img/avatar.jpg", text: "Very professional and modern approach. The website gave me all the technical specs I needed to compare models." },
    { name: "Jessica Williams", img: "img/avatar.jpg", text: "Highly recommended! The design of the site makes it so easy to navigate between different car categories." }
];

function populateReviewSwiper() {
    const wrapper = document.querySelector('.reviewSwiper .swiper-wrapper');
    wrapper.innerHTML = '';

    reviewsData.forEach(review => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        
        let starsHTML = '';
        for(let i = 1; i <= 5; i++) {
            if(i <= 4) {
                starsHTML += '<i class="fas fa-star"></i> ';
            } else {
                starsHTML += '<i class="far fa-star"></i> ';
            }
        }

        slide.innerHTML = `
            <div class="review-card">
                <img src="${review.img}" alt="${review.name}" class="review-img">
                <h3 class="review-name">${review.name}</h3>
                <div class="review-stars">${starsHTML}</div>
                <p class="review-text">${review.text}</p>
            </div>
        `;
        
        wrapper.appendChild(slide);
    });
}

populateReviewSwiper();

var reviewSwiper = new Swiper(".reviewSwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    grabCursor: true,
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".review-pagination",
        clickable: true,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 3,
            spaceBetween: 30,
        }
    }
});

const q = document.querySelectorAll('.q');
const a = document.querySelectorAll('.a');
const arr = document.querySelectorAll('.arrow');

for( let i = 0; i < q.length; i++){
  q[i].addEventListener('click', () => {
    a[i].classList.toggle('a-opened');
    arr[i].classList.toggle('arrow-rotated');
  });
}

// ==========================================
// 4. Test Drive Form Logic
// ==========================================
const testDriveForm = document.getElementById('test-drive-form');
const tdMessage = document.getElementById('td-message');

if (testDriveForm) {
    testDriveForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        testDriveForm.style.display = 'none';
        tdMessage.style.display = 'block';
        
        setTimeout(() => {
            testDriveForm.reset();
            testDriveForm.style.display = 'block';
            tdMessage.style.display = 'none';
        }, 5000);
    });
}