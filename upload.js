async function uploadVideo() {

    const file = document.getElementById("videoFile").files[0];
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const status = document.getElementById("status");

    if (!file) {
        alert("Silakan pilih video.");
        return;
    }

    if (title === "") {
        alert("Masukkan judul video.");
        return;
    }

    status.innerHTML = "⏳ Sedang mengupload...";

    const fileName = Date.now() + "_" + file.name;

    // Upload ke Storage
    const { data: uploadData, error: uploadError } =
        await supabase.storage
            .from("videos")
            .upload(fileName, file);

    if (uploadError) {
        console.error(uploadError);
        status.innerHTML = "❌ Upload gagal";
        alert(uploadError.message);
        return;
    }

    // Ambil URL Public
    const { data: publicData } =
        supabase.storage
            .from("videos")
            .getPublicUrl(fileName);

    const videoUrl = publicData.publicUrl;

    // Simpan ke Database
    const { error: dbError } =
        await supabase
            .from("videos")
            .insert([
                {
                    title: title,
                    description: description,
                    video_url: videoUrl
                }
            ]);

    if (dbError) {
        console.error(dbError);
        status.innerHTML = "❌ Gagal menyimpan database";
        alert(dbError.message);
        return;
    }

    status.innerHTML = "✅ Upload berhasil";

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("videoFile").value = "";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);

}
