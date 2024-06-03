const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    kirimTodo();
})

function kirimTodo() {
    const elemen_judul = document.querySelector("#judul");
    const elemen_deskripsi = document.querySelector("#deskripsi");

    const id = elemen_judul.dataset.id;
    const judul = elemen_judul.value;
    const deskripsi = elemen_deskripsi.value;

    if (id == "") {
        // Tambah todo
        axios
            .post("https://todos-orsanl6iza-et.a.run.app/todos", {
                judul,
                deskripsi,
            })
            .then(() => {
                // bersihin formnya
                elemen_judul.dataset.id = "";
                elemen_judul.value = "";
                elemen_deskripsi.value = "";
    
                // manggil fungsi get todo biar datanya di-refresh
                getTodo();
            })
            .catch((error) => console.log(error.message));
    } else {
        axios
            .put(`https://todos-orsanl6iza-et.a.run.app/todos/${id}`, {
                judul,
                deskripsi,
            })
            .then(() => {
                // bersihin formnya
                elemen_judul.dataset.id = "";
                elemen_judul.value = "";
                elemen_deskripsi.value = "";
    
                // manggil fungsi get todo biar datanya direfresh
                getTodo();
            })
        .catch((error) => console.log(error));
    }
}

function getTodo() {
    axios
      .get("https://todos-orsanl6iza-et.a.run.app/todos")
      .then(({ data }) => {
        const todo = document.querySelector("#todo-list");
        const { data: todos } = data;
        let tampilan = "";

        for (const todo of todos) {
            tampilan += tampilkanTodo(todo);
        }
        todo.innerHTML = tampilan;

        hapusTodo();
        editTodo();
    })
    .catch((error) => {
        console.log(error.message);
    });
}

function addStylesheet() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = 'styles3.css';
    document.head.appendChild(link);
}

addStylesheet();

function tampilkanTodo(todo) {
    return `
    <div class="todo-card">
        <h2 class="todo-title judul">${todo.judul}</h2>
        <p class="todo-content deskripsi">${todo.deskripsi}</p>
        <button
            data-id="${todo.id}"
            class="btn btn-edit">
            Edit
        </button>
        <button
            data-id="${todo.id}"
            class="btn btn-hapus">
            Delete
        </button>
    </div>
    `;
}

function hapusTodo() {
    const kumpulan_tombol_hapus = document.querySelectorAll(".btn-hapus");

    kumpulan_tombol_hapus.forEach((btn) => {
        btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        axios
            .delete(`https://todos-orsanl6iza-et.a.run.app/todos/${id}`)
            .then(() => getTodo())
            .catch((error) => console.log(error));
        });
    });
}

function editTodo() {
    const kumpulan_tombol_edit = document.querySelectorAll(".btn-edit");

    kumpulan_tombol_edit.forEach((tombol_edit) => {
    tombol_edit.addEventListener("click", () => {
        const id = tombol_edit.dataset.id;
        const judul =
            tombol_edit.parentElement.querySelector(
                ".judul"
            ).innerText;
        const deskripsi =
            tombol_edit.parentElement.querySelector(".deskripsi").innerText;

        // Ngambil elemen input
        const elemen_judul = document.querySelector("#judul");
        const elemen_deskripsi = document.querySelector("#deskripsi");
        
        elemen_judul.dataset.id = id;
        elemen_judul.value = judul;
        elemen_deskripsi.value = deskripsi;
        });
    });
}

getTodo();