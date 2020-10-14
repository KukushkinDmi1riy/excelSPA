import {$} from '../../core/dom'

export function resizeHandler($root, event) {
  const $resizer = $(event.target)
  const $parent = $resizer.closest('[data-type="resizable"]')
  const cords = $parent.getCords()
  const type = $resizer.data.resize
  let value;

  const sideProp = type === 'col' ? 'bottom' : 'right'

  $resizer.css({
    opacity: 1,
    [sideProp]: '-3000px'
  })

  const cells = $root.findAll(`[data-col="${$parent.data.col}"]`)

  document.onmousemove = e => {
    if (type === 'col') {
      console.log('mousemove')
      const delta = e.pageX - cords.right
      value = cords.width + delta
      $resizer.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - cords.bottom
      value = cords.height + delta
      $resizer.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = () => {
    document.onmousemove = null
    document.onmouseup = null

    if (type === 'col') {
      $parent.css({width: value + 'px'})
      cells.forEach(el => el.style.width = value + 'px')
    } else {
      $parent.css({height: value + 'px'})
      cells.forEach(el => el.style.height = value + 'px')
    }


    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0
    })
  }
}