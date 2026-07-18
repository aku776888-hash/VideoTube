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

bannerIndex = (bannerIndex + 1) % banners.length;

banner.style.opacity = "0";

setTimeout(() => {
banner.src = banners[bannerIndex];
banner.style.opacity = "1";
},300);

},4000);

// ================= LOAD VIDEO =================

async function loadVideos(){

const container = document.querySelector(".videos");

const { data, error } = await supabase
.from("videos")
.select("*")
.order("created_at",{ascending:false});

if(error){
console.log(error);
return;
}

container.innerHTML = "";

data.forEach(video=>{

container.innerHTML += `
<a href="${video.video_url}" class="video-link" target="_blank">

<div class="video-card">

<div class="thumb">
<video src="${video.video_url}" controls></video>
</div>

<div class="video-info">

<div class="video-text">
<h3>${video.title}</h3>
<p>${video.description}</p>
</div>

</div>

</div>

</a>
`;

});

}

loadVideos();

// ================= PENCARIAN =================

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input",()=>{

const keyword = searchInput.value.toLowerCase();

document.querySelectorAll(".video-link").forEach(item=>{

const title=item.querySelector("h3").textContent.toLowerCase();

item.style.display=title.includes(keyword)?"block":"none";

});

});
