async function uploadVideo() {

    const file = document.getElementById("videoFile").files[0];
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const status = document.getElementById("status");

    if (!file) {
        alert("Silakan pilih video.");
        return;
    }

    if (title.trim() === "") {
        alert("Masukkan judul video.");
        return;
    }

    status.innerHTML = "⏳ Sedang mengupload...";

    const fileName = Date.now() + "_" + file.name;

    // Upload ke Storage
    const { error: uploadError } = await supabase.storage
        .from("videos")
        .upload(fileName, file);

    if (uploadError) {
        status.innerHTML = "❌ Upload gagal!";
        console.log(uploadError);
        return;
    }

    // Ambil URL video
    const { data } = supabase.storage
        .from("videos")
        .getPublicUrl(fileName);

    const videoUrl = data.publicUrl;

    // Simpan ke Database
    const { error: dbError } = await supabase
        .from("videos")
        .insert([
            {
                title: title,
                description: description,
                video_url: videoUrl
            }
        ]);

    if (dbError) {
        status.innerHTML = "❌ Gagal menyimpan database!";
        console.log(dbError);
        return;
    }

    status.innerHTML = "✅ Upload berhasil!";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);

}
