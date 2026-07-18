function uploadVideo() {

    const file = document.getElementById("videoFile").files[0];
    const title = document.getElementById("title").value;

    if (!file) {
        alert("Pilih video!");
        return;
    }

    const url = URL.createObjectURL(file);

    let videos = JSON.parse(localStorage.getItem("videos")) || [];

    videos.push({
        title: title,
        video: url
    });

    localStorage.setItem("videos", JSON.stringify(videos));

    alert("Video berhasil ditambahkan!");

    window.location.href = "index.html";
}
