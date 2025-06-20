import { createElement } from '../framework/render.js'

function createListTemplate(title, className) {
	return `
    <section class="${className}">
      <h5>${title}</h5>
	<ul class="task-list"></ul>
    </section>
  `
}

export default class ListComponent {
	constructor(title, className) {
		this.title = title
		this.className = className
	}

	getTemplate() {
		return createListTemplate(this.title, this.className)
	}

	getElement() {
		if (!this.element) {
			this.element = createElement(this.getTemplate())
		}
		return this.element
	}

	removeElement() {
		this.element = null
	}
}
