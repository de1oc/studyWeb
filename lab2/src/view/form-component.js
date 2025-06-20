import { createElement } from '../framework/render.js';

function createFormTemplate() {
  return `
    <form>
      <h2>Новая задача</h2>
      <span>
        <input placeholder="Название задачи" />
        <button>+ Добавить</button>
      </span>
    </form>
  `;
}

export default class FormComponent {
  getTemplate() {
    return createFormTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}