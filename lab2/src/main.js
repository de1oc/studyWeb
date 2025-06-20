import { render, RenderPosition } from './framework/render.js';
import HeaderComponent from './view/header-component.js';
import FormComponent from './view/form-component.js';
import BoardComponent from './view/board-component.js';
import ListComponent from './view/list-component.js';
import TaskComponent from './view/task-component.js';

const body = document.querySelector('body');

const header = new HeaderComponent();
render(header, body, RenderPosition.AFTERBEGIN);

const main = document.querySelector('main');
const form = new FormComponent();
render(form, main, RenderPosition.AFTERBEGIN);

const board = new BoardComponent();
render(board, main);

const boardContainer = board.getElement();

const lists = [
  { title: 'Бэклог', className: 'backlog', tasks: ['Выжить', 'Курсач', 'Сделать домашку'] },
  { title: 'В процессе', className: 'in-process', tasks: ['ААААА', 'Помогите'] },
  { title: 'Готово', className: 'done', tasks: ['ЭХ', 'Как жить?'] },
  { title: 'Корзина', className: 'bucket', tasks: ['НЕЕЕЕЕТ', 'ПУПУПУ', 'Что не так?'] }
];

lists.forEach(({ title, className, tasks }) => {
  const list = new ListComponent(title, className);
  render(list, boardContainer);

  const ul = list.getElement().querySelector('ul');

  tasks.forEach((task) => {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, ul);
  });

  if (className === 'bucket') {
    const button = document.createElement('button');
    button.textContent = '✖ Очистить';
    button.classList.add('clear-bucket');
    ul.appendChild(button);
  }
});