import { AbstractComponent } from '../framework/abstract-component.js'

export default class ClearButtonComponent extends AbstractComponent {
	#onClick

	constructor(onClick) {
		super()
		this.#onClick = onClick
	}

	get template() {
		return `<button class="clear-button">Очистить корзину</button>`
	}

	get element() {
		const element = super.element
		element.addEventListener('click', this.#onClick)
		return element
	}
}
