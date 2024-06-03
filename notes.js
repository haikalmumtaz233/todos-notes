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
            .post("https://notes-orsanl6iza-et.a.run.app/notes", {
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
            .put(`https://notes-orsanl6iza-et.a.run.app/notes/${id}`, {
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
      .get("https://notes-orsanl6iza-et.a.run.app/notes")
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

function addStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'styles2.css';
    document.head.appendChild(link);
}

addStylesheet();

function tampilkanCatatan(note) {
    return `
    <div class="note-card">
        <h2 class="note-title judul">${note.judul}</h2>
        <p class="note-content isi">${note.isi}</p>
        <button
            data-id="${note.id}"
            class="btn btn-edit">
            Edit
        </button>
        <button
            data-id="${note.id}"
            class="btn btn-hapus">
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
            .delete(`https://notes-orsanl6iza-et.a.run.app/notes/${id}`)
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
            tombol_edit.parentElement.querySelector(
                ".judul"
            ).innerText;
        const isi =
            tombol_edit.parentElement.querySelector(".isi").innerText;

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