/*
import axios from "axios";

export const loadProductsFromFirebase = async () => {
  try {
    const response = await axios.get(
      "https://onlyback-gt-default-rtdb.firebaseio.com/productos.json" // Reemplaza con la URL correcta de tus productos en Firebase Realtime Database
    );

    if (response.data) {
      // La respuesta contiene los datos de productos desde Firebase
      return response.data;
      console.log("datos recibidos" + response.data);
    } else {
      // No se encontraron datos de productos
      return [];
    }
  } catch (error) {
    // Manejo de errores en caso de que la solicitud falle
    console.error("Error al cargar los productos:", error);
    return [];
  }
};
*/