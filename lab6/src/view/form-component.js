import { AbstractComponent } from '../framework/abstract-component.js'

const createFormAddTaskComponentTemplate = () => `
  <form class="add-task-form">
	<h2>Новая задача</h2>
    <input id="add-task" type="text" placeholder="Название задачи" />
    <button type="submit">+ Добавить</button>
  </form>
`

export default class FormComponent extends AbstractComponent {
	#handleClick = null

	constructor({ onClick }) {
		super()
		this.#handleClick = onClick
		this.element.addEventListener('submit', this.#clickHandler)
	}

	get template() {
		return createFormAddTaskComponentTemplate()
	}

	#clickHandler = evt => {
		evt.preventDefault()
		this.#handleClick()
	}
}
