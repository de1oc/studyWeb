import { render, RenderPosition } from './framework/render.js'
import HeaderComponent from './view/header-component.js'
import BoardComponent from './view/board-component.js'
import FormComponent from './view/form-component.js'
import TasksBoardPresenter from './presenter/tasks-board-presenter.js'
import TaskModel from './model/task-model.js'

const headerContainer = document.querySelector('.header')
const boardContainer = document.querySelector('.board')

const headerComponent = new HeaderComponent()
render(headerComponent, headerContainer)

const formComponent = new FormComponent({
	onClick: () => {
		const input = document.querySelector('#add-task')
		const taskTitle = input.value.trim()

		if (!taskTitle) return

		taskModel.addTask(taskTitle)
		input.value = ''
	},
})

render(formComponent, boardContainer, RenderPosition.AFTERBEGIN)

const boardComponent = new BoardComponent()
render(boardComponent, boardContainer)

const taskModel = new TaskModel()
const boardPresenter = new TasksBoardPresenter({
	boardContainer: boardComponent.element,
	taskModel,
})

boardPresenter.init()
