import { AbstractComponent } from '../framework/abstract-component.js'

export default class BoardComponent extends AbstractComponent {
	get template() {
		return `<section class="task-container"></section>`
	}
}
