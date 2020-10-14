const CODES = {
  A: 65,
  Z: 90
}

function createCell(_, col) {
  return `
  <div class="cell" contenteditable data-col="${col}"></div>
  `
}

function toColumn(el, idx) {
  return `
    <div class="column" data-type="resizable" data-col="${idx}">
        ${el}
        <div class="col-resize" data-resize="col"></div>
    </div>`
}

function createRow(content, idx) {
  const resize = idx ? `<div class="row-resize" data-resize = "row"></div>` : ''
  return `
  <div class="row" data-type="resizable">
    <div class="row-info" >${idx ? idx : ''}
      ${resize}
    </div>

    <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 50) {
  const colsCount = CODES.Z-CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, null))

  for (let i = 0; i < rowsCount; i++) {
    const cell = new Array(colsCount)
        .fill('')
        .map(createCell)
        .join('')
    rows.push(createRow(cell, i+1))
  }
  return rows.join('')
}