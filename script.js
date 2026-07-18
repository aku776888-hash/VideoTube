// ================= BANNER =================

const banners = [
    "https://picsum.photos/900/400?1",
    "https://picsum.photos/900/400?2",
    "https://picsum.photos/900/400?3",
    "https://picsum.photos/900/400?4"
];

let bannerIndex = 0;
const banner = document.querySelector(".banner img");

setInterval(() => {

    bannerIndex++;

    if (bannerIndex >= banners.length) {
        bannerIndex = 0;
    }

    banner.style.opacity = "0";

    setTimeout(() => {
        banner.src = banners[bannerIndex];
        banner.style.opacity = "1";
    }, 300);

}, 4000);

// ================= KATEGORI =================

const categoryButtons = document.querySelectorAll(".categories button");

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        categoryButtons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

    });

});

// ================= PENCARIAN =================

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", cariVideo);

searchInput.addEventListener("keypress", function(e){

    if(e.key === "Enter"){

        cariVideo();

    }

});

function cariVideo(){

    const keyword = searchInput.value.toLowerCase();

    document.querySelectorAll(".video-link").forEach(item => {

        const title = item.querySelector("h3").textContent.toLowerCase();

        if(title.includes(keyword)){

            item.style.display = "block";

        }else{

            item.style.display = "none";

        }

    });

}

// ================= NOTIFIKASI =================

const bell = document.querySelector(".fa-bell");

bell.addEventListener("click", () => {

    alert("Belum ada notifikasi.");

});