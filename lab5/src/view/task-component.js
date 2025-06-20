import { AbstractComponent } from '../framework/abstract-component.js'

export default class TaskComponent extends AbstractComponent {
	#task

	constructor(task) {
		super()
		this.#task = task
	}

	get template() {
		return `<li class="task">${this.#task.title}</li>`
	}
}
