import { AbstractComponent } from '../framework/abstract-component.js'

export default class EmptyComponent extends AbstractComponent {
	get template() {
		return `
      <p class="task-empty">Перетащите карточку</p>
    `
	}
}
