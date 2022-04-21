const arr = {
  file: 'C:\\Users\\Laboratoria\\Desktop\\Bootcamp\\Project4\\CDMX012-md-links\\docs\\doc-5.md',
  href: 'https://www.101computing.net/wp/wp-content/uploads/Luhn-Algorithm.png',
  text: 'gráfica de algoritmo de Luhn',
};

function links(ar) {
  return `${ar.file}, %c ${ar.texto} `;
}

console.log(links(arr));
