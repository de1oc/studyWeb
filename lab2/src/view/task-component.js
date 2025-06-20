import { createElement } from '../framework/render.js'

function createTaskTemplate(taskText) {
	return `<li>${taskText}</li>`
}

export default class TaskComponent {
	constructor(text) {
		this.text = text
	}

	getTemplate() {
		return createTaskTemplate(this.text)
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