export default class ClearButtonComponent {
	#onClick
	#element = null

	constructor(onClick) {
		this.#onClick = onClick
	}

	get template() {
		return `<button class="clear-button">✖ Очистить</button>`
	}

	getElement() {
		if (!this.#element) {
			const wrapper = document.createElement('div')
			wrapper.innerHTML = this.template
			this.#element = wrapper.firstElementChild
			this.#element.addEventListener('click', this.#onClick)
		}
		return this.#element
	}
}
