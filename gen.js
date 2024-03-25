const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const generate = () => {
  const entries = document
    .querySelector("textarea")
    .value.split(`\n`)
    .map((v) => v.trim());

  const rows = +document.getElementById("rows").value;
  const cols = +document.getElementById("cols").value;
  const cards = +document.getElementById("cards").value;

  const minEntries = rows * cols;

  if (entries.length < minEntries) {
    alert(`Only ${entries.length} entries, need at least ${minEntries}`);
    return;
  }

  const output = [...Array(cards).keys()].map((i) => {
    const shuffled = shuffle(entries);
    const headerRow = `
<div class="card-row header-row">
  <span>B</span>
  <span>I</span>
  <span>N</span>
  <span>G</span>
  <span>O</span>
  <span class="card-number">${i + 1}</span>
</div>`;
    const cardContents = [...Array(rows).keys()]
      .map((r) => `<div class="card-row">
      ${[...Array(cols).keys()]
          .map((c) => `<div class="card-box">${shuffled[r * cols + c]}</div>`)
          .join('')}
      </div>`
      )
      .join('');
    return `
<div class='card' style="--row-count: ${rows}; --col-count: ${cols};">
    <div class="card-card">
        ${headerRow}
        ${cardContents}
    </div>
</div>`;
  }).join('');

  console.log(output);
  document.getElementById("output").innerHTML = output;
};

function fillWithMinimumLines() {
  const targetElement = document
    .querySelector("textarea");

  const rows = +document.getElementById("rows").value;
  const cols = +document.getElementById("cols").value;
  const entries = targetElement
    .value.split(`\n`)
    .map((v) => v.trim()).filter(Boolean);
  const expectedEntryCount = rows * cols;
  if (entries.length > expectedEntryCount) {
    return;
  }
  const fillerEntries = Array.from({ length: expectedEntryCount }, (_, i) => `${i + 1}`);
  fillerEntries.splice(0, entries.length);
  const newEntries = [...entries, ...fillerEntries];
  targetElement.value = newEntries.join('\n');
}
