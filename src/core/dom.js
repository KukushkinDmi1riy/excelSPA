class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
    ? document.querySelector(selector)
    : selector
  }
  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  on(eventType, cb) {
    this.$el.addEventListener(eventType, cb)
  }

  off(eventType, cb) {
    this.$el.removeEventListener(eventType, cb)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(seletor) {
    return $(this.$el.closest(seletor))
  }

  getCords() {
    return this.$el.getBoundingClientRect()
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  // css(styles= {}) {
  //   return Object.assign(this.$el.style, styles)
  // }

  css(styles = {}) {
    Object.keys(styles)
        .forEach(prop => this.$el.style[prop] = styles[prop])
  }
}

//$('div').html('<h1>Привет</h1>').clear() // use this

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}

