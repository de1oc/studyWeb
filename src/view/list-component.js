import { AbstractComponent } from '../framework/abstract-component.js'

export default class ListComponent extends AbstractComponent {
	#title
	#className

	constructor(title, className) {
		super()
		this.#title = title
		this.#className = className
	}

	get template() {
		return `
      <section class="${this.#className}">
        <h5>${this.#title}</h5>
        <ul class="task-list"></ul>
      </section>
    `
	}
}
