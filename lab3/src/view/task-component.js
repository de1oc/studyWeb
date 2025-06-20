export default class TaskComponent {
	#task
	#element = null

	constructor(task) {
		this.#task = task
	}

	get template() {
		return `<li class="task">${this.#task.title}</li>`
	}

	getElement() {
		if (!this.#element) {
			const wrapper = document.createElement('div')
			wrapper.innerHTML = this.template
			this.#element = wrapper.firstElementChild
		}
		return this.#element
	}
}
