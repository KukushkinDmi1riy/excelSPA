import {capitalize} from './utils'

//abstract class
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided DOM listener')
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    // console.log(this.listeners, this.$root)
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`)
      }
      this[method] =this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }
  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

//input => onInput
function getMethodName(event) {
  return 'on' + capitalize(event)
}