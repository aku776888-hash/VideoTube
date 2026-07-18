function uploadVideo() {

const file = document.getElementById("videoFile").files[0];
const title = document.getElementById("title").value;
const description = document.getElementById("description").value;

if (!file) {
alert("Silakan pilih video.");
return;
}

if (title.trim() === "") {
alert("Masukkan judul video.");
return;
}

const video = {
title: title,
description: description,
fileName: file.name,
date: new Date().toLocaleString()
};

let videos = JSON.parse(localStorage.getItem("videos")) || [];

videos.unshift(video);

localStorage.setItem("videos", JSON.stringify(videos));

document.getElementById("status").innerHTML =
"✅ Video berhasil ditambahkan.";

document.getElementById("title").value = "";
document.getElementById("description").value = "";
document.getElementById("videoFile").value = "";

setTimeout(() => {
window.location.href = "index.html";
}, 1500);

}
