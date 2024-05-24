const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    kirimCatatan();
})

function kirimCatatan() {
    const elemen_judul = document.querySelector("#judul");
    const elemen_isi = document.querySelector("#isi");

    const id = elemen_judul.dataset.id;
    const judul = elemen_judul.value;
    const isi = elemen_isi.value;

    if (id == "") {
        // Tambah catatan
        axios
            .post("https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa", {
                judul,
                isi,
            })
            .then(() => {
                // bersihin formnya
                elemen_judul.dataset.id = "";
                elemen_judul.value = "";
                elemen_isi.value = "";
    
                // manggil fungsi get catatan biar datanya di-refresh
                getCatatan();
            })
            .catch((error) => console.log(error.message));
    } else {
        axios
            .put(`https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa/${id}`, {
                judul,
                isi,
            })
            .then(() => {
                // bersihin formnya
                elemen_judul.dataset.id = "";
                elemen_judul.value = "";
                elemen_isi.value = "";
    
                // manggil fungsi get catatan biar datanya direfresh
                getCatatan();
            })
        .catch((error) => console.log(error));
    }
}

function getCatatan() {
    axios
      .get("https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa")
      .then(({ data }) => {
        const note = document.querySelector("#note-list");
        const { data: notes } = data;
        let tampilan = "";

        for (const note of notes) {
            tampilan += tampilkanCatatan(note);
        }
        note.innerHTML = tampilan;

        hapusCatatan();
        editCatatan();
    })
    .catch((error) => {
        console.log(error.message);
    });
}

function tampilkanCatatan(note) {
    return `
    <div class="bg-white shadow-md rounded-md p-4 mb-4">
        <h2 class="text-xl font-semibold mb-2">${note.judul}</h2>
        <p class="text-gray-700 mb-2">${note.isi}</p>
        <button
            data-id=${note.id}
            class="btn-edit bg-blue-500 text-white py-1 px-3 rounded-md 
            hover:bg-blue-600 focus:outline-none focus:bg-blue-700 mr-2">
            Edit
        </button>
        <button
            data-id=${note.id}
            class="btn-edit bg-red-500 text-white py-1 px-3 rounded-md 
            hover:bg-red-600 focus:outline-none focus:bg-red-700">
            Delete
        </button>
    </div>
    `;
}

function hapusCatatan() {
    const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

    kumpulan_tombol_hapus.forEach((btn) => {
        btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        axios
            .delete(`https://mahasiswa-llz4uecrhq-et.a.run.app/mahasiswa/${id}`)
            .then(() => getCatatan())
            .catch((error) => console.log(error));
        });
    });
}

function editCatatan() {
    const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

    kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
        const id = tombol_edit.dataset.id;
        const judul =
            tombol_edit.parentElement.parentElement.querySelector(
                ".judul"
            ).innerText;
        const isi =
            tombol_edit.parentElement.parentElement.querySelector(".isi").innerText;

        // Ngambil elemen input
        const elemen_judul = document.querySelector("#judul");
        const elemen_isi = document.querySelector("#isi");
        
        elemen_judul.dataset.id = id;
        elemen_judul.value = judul;
        elemen_isi.value = isi;
        });
    });
}

getCatatan();