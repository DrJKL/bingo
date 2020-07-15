const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const generate = () => {
  const entries = document
    .querySelector("textarea")
    .value.split(`\n`)
    .map((v) => v.trim());

  const rows = +document.getElementById("rows").value;
  const cols = +document.getElementById("cols").value;
  const cards = +document.getElementById("cards").value;

  if (entries.length < rows * cols) {
    alert("not enough entries");
    return;
  }

  const output = [...Array(cards).keys()].map((i) => {
    const shuffled = shuffle(entries);
    return `<div class='card'><h2>Bingo!</h2><table>
        ${[...Array(rows).keys()]
          .map((r) => `<tr>
            ${[...Array(cols).keys()]
              .map((c) => `<td>${shuffled[r * cols + c]}</td>`)
              .join('')}
            </tr>`
          )
          .join('')}
        </table></div>`;
  }).join('');

  console.log(output)
  document.getElementById("output").innerHTML = output;
};
