const carousel = document.querySelector(".carousel"),
firstImg = carousel.querySelectorAll("img")[0],
arrowIcons = document.querySelectorAll(".wrapper i");

let isDragStart = false, isDragging = false, prevPageX, prevScrollLeft, positionDiff;

const showHideIcons = () => {
    // showing and hiding prev/next icon according to carousel scroll left value
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        let firstImgWidth = firstImg.clientWidth + 14; // getting first img width & adding 14 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left else add to it
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
        setTimeout(() => showHideIcons(), 60); // calling showHideIcons after 60ms
    });
});

const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if(carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;

    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 14;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;

    if(carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}

const dragStart = (e) => {
    // updatating global variables value on mouse down event
    isDragStart = true;
    prevPageX = e.pageX || e.touches[0].pageX;
    prevScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    // scrolling images/carousel to left according to mouse pointer
    if(!isDragStart) return;
    e.preventDefault();
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    showHideIcons();
}

const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");

    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("touchstart", dragStart);

document.addEventListener("mousemove", dragging);
carousel.addEventListener("touchmove", dragging);

document.addEventListener("mouseup", dragStop);
carousel.addEventListener("touchend", dragStop);

/*보글보글*/
// you can change the hue and amount lit-ness via data attributes on html

// clips the value to given range
const clip = (v, min, max = Infinity) => {
    if (v < min) return min;
    else if (v > max) return max;
    else return v;
};

// generated random value from given range
const randRange = (min, max) => Math.random() * max + min;

// create bubble on x and y position inside target with given hue theme
function bubble(x, y, rect, hue, target) {
    // variables
    const size = randRange(20, rect.width / 5);
    const circleHue = hue + randRange(-20, 20);
    const animDuration = randRange(clip(size ** 2 / 1000, 1), 6);
    const zIndex = Math.random() < 0.1 ? 2 : -1;
    // apply to DOM
    const circle = document.createElement("span");
    circle.className = "lit";
    circle.style.left = x + "px";
    circle.style.top = y + "px";
    circle.style.width = size + "px";
    circle.style.height = size + "px";
    circle.style.background = `hsl(${circleHue}deg, 100%, 60%)`;
    circle.style.zIndex = zIndex;
    circle.style.animationDuration = animDuration + "s";
    target.appendChild(circle);
}
//json 이용하기
document.querySelectorAll("[data-lit-hue]").forEach((target) => {
    const rect = target.getBoundingClientRect();
    const hue = Number(target.getAttribute("data-lit-hue"));
    const count = Number(target.getAttribute("data-lit-count") || 50);

for (let i = 0; i < count; i++) {
    const x = randRange(0, rect.width);
    const y = randRange(0, rect.height);
    bubble(x, y, rect, hue, target);
}
});

function loadBooks(carouselId, dataUrl, minRnum, maxRnum) {
fetch(dataUrl)
    .then(response => response.json())
    .then(data => {
    const carousel = document.getElementById(carouselId);
    const filteredBooks = data.filter(book => {
        const rnum = Number(book.RNUM);
        return rnum >= minRnum && rnum <= maxRnum;
    });
    filteredBooks.forEach(book => {
        const img = document.createElement('img');
        img.src = book.URL;
        img.alt = 'img';
        img.draggable = false;
        carousel.appendChild(img);
    });
    })
    .catch(error => console.error(error));
}

window.addEventListener('load', () => {
loadBooks('recommend-carousel', './assets/book/book.json', 1, 8);
loadBooks('popular-carousel', './assets/book/book.json', 10, 20);
loadBooks('new-carousel', './assets/book/book.json', 20, 30);
});

//로그인 기능
function login(event) {
    event.preventDefault();

    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    const username = usernameInput.value;
    const password = passwordInput.value;

fetch("users.json")
    .then((response) => response.json())
    .then((users) => {
    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (user) {
        alert("로그인 성공");
        // 로그인 성공 시 처리할 로직 추가
    } else {
        alert("로그인 실패");
        // 로그인 실패 시 처리할 로직 추가
    }
    })
    .catch((error) => console.error(error));
}

const refreshIcon = document.getElementById("refresh-icon");

refreshIcon.addEventListener("click", function() {
    location.reload();
});
