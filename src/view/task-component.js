import { AbstractComponent } from '../framework/abstract-component.js'

export default class TaskComponent extends AbstractComponent {
	#task

	constructor(task) {
		super()
		this.#task = task

		this.element.setAttribute('draggable', 'true')
		this.element.addEventListener('dragstart', this.#handleDragStart)
	}

	get template() {
		return `<li class="task" data-id="${this.#task.id}">${
			this.#task.title
		}</li>`
	}

	#handleDragStart = evt => {
		evt.dataTransfer.setData('text/plain', this.#task.id)
	}
}
