// Mengimport package
const express = require("express");
const router = express.Router();
const connection = require("./config");

// [GET] Mengambil daftar todos
router.get("/", async (req, res) => {
  try {
    // Execute query ke database
    const command = "SELECT * FROM todos";
    const data = await connection.promise().query(command);

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil data todos",
      data: data[0],
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [POST] Memasukkan todo baru ke daftar todos
router.post("/", async (req, res) => {
  try {
    // mengambil judul dan deskripsi dari request body
    const { judul, deskripsi } = req.body;

    // kalau judul/deskripsi kosong atau gaada kolom judul/deskripsi di request body
    if (!judul || !deskripsi) {
      const msg = `${!judul ? "Judul" : "Deskripsi"} tidak boleh kosong!`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "INSERT INTO todos (judul, deskripsi) VALUES (?, ?)";
    await connection.promise().query(command, [judul, deskripsi]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil menambahkan todos",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [PUT] Mengubah data todo berdasarkan id
router.put("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // mengambil judul dan deskripsi dari request body
    const { judul, deskripsi } = req.body;

    // kalau judul/deskripsi kosong atau gaada kolom judul/deskripsi di request body
    if (!judul || !deskripsi) {
      const msg = `${!judul ? "Judul" : "Deskripsi"} tidak boleh kosong!`;
      const error = new Error(msg);
      error.statusCode = 401;
      throw error;
    }

    // Execute query ke database
    const command = "UPDATE todos SET judul = ?, deskripsi = ? WHERE id = ?";
    await connection.promise().query(command, [judul, deskripsi, id]);

    // mengirimkan respons jika berhasil
    res.status(201).json({
      status: "Success",
      message: "Berhasil mengubah data todo",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [DELETE] Menghapus data todo berdasarkan id
router.delete("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "DELETE FROM todos WHERE id = ?";
    await connection.promise().query(command, [id]);

    // mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil menghapus todo",
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

// [GET] Mengambil data todo berdasarkan ID
router.get("/:id", async (req, res) => {
  try {
    // mengambil id dari parameter
    const { id } = req.params;

    // Execute query ke database
    const command = "SELECT * FROM todos WHERE id = ?";
    const [[data]] = await connection.promise().query(command, [id]);

    if (!data) {
      const error = new Error("Todo tidak ditemukan.");
      error.statusCode = 404;
      throw error;
    }

    // Mengirimkan respons jika berhasil
    res.status(200).json({
      status: "Success",
      message: "Berhasil mengambil todo",
      data: data,
    });
  } catch (error) {
    // mengirimkan respons jika gagal
    res.status(error.statusCode || 500).json({
      status: "Error",
      message: error.message,
    });
  }
});

module.exports = router;