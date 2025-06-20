import { AbstractComponent } from '../framework/abstract-component.js'

export default class FormComponent extends AbstractComponent {
	get template() {
		return `
      <form>
        <h2>Новая задача</h2>
        <span>
          <input placeholder="Название задачи" />
          <button>+ Добавить</button>
        </span>
      </form>
    `
	}
}
