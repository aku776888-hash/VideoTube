function uploadVideo() {

const file = document.getElementById("videoFile").files[0];
const title = document.getElementById("title").value;

if (!file) {
    alert("Silakan pilih video MP4.");
    return;
}

if (title.trim() === "") {
    alert("Masukkan judul video.");
    return;
}

document.getElementById("status").innerHTML =
"✅ Video '" + title + "' siap diupload.";

console.log("Judul:", title);
console.log("File:", file);

}
