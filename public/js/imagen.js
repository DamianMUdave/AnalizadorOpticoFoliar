const apiUrl = 'https://jsonplaceholder.typicode.com/photos'; // URL de la API

// Obtener una referencia al elemento <img> en tu HTML
const imgElement = document.getElementById('apiimg');

// Realizar una solicitud al API para obtener las imágenes
fetch(apiUrl)
  .then(response => {
    // Verificar el estado de la respuesta
    if (response.ok) {
      // Si la respuesta es exitosa, convertirla en un objeto JSON
      return response.json();
    } else {
      // Si hay un error en la respuesta, lanzar un error
      throw new Error('Error en la solicitud');
    }
  })
  .then(photos => {
    // Encontrar el primer elemento con el ID 1
    const firstImage = photos.find(photos => photos.id === 1);

    // Verificar si se encontró un elemento con el ID 1
    if (firstImage) {
      // Asignar la URL de la imagen al atributo src del elemento <img>
      imgElement.src = firstImage.url;
    } else {
      // Manejar el caso en que no se encontró un elemento con el ID 1
      console.error('No se encontró una imagen con el ID 1');
    }
  })
  .catch(error => {
    // Manejar errores de la solicitud
    console.error(error);
  });
