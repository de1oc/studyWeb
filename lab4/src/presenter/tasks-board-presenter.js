import TaskComponent from '../view/task-component.js'
import ListComponent from '../view/list-component.js'
import ClearButtonComponent from '../view/clear-button-component.js'
import EmptyComponent from '../view/empty-component.js'
import { TaskStatusMap } from '../const.js'
import { render } from '../framework/render.js'

const statusClassMap = {
	todo: 'backlog',
	'in-progress': 'in-process',
	done: 'done',
	removed: 'bucket',
}

export default class TasksBoardPresenter {
	#boardContainer
	#taskModel

	constructor({ boardContainer, taskModel }) {
		this.#boardContainer = boardContainer
		this.#taskModel = taskModel
	}

	init() {
		this.#clearBoard()
		this.#renderBoard()
	}

	#clearBoard() {
		this.#boardContainer.innerHTML = ''
	}

	#renderBoard() {
		const statuses = Object.keys(TaskStatusMap).filter(
			status => status !== 'removed'
		)
		statuses.forEach(status => this.#renderTasksList(status))
		this.#renderBucket()
	}

	#renderTasksList(status) {
		const title = TaskStatusMap[status]
		const className = statusClassMap[status]

		const listComponent = new ListComponent(title, className)
		render(listComponent, this.#boardContainer)

		const listElement = listComponent.element.querySelector('.task-list')
		const tasksForStatus = this.#taskModel.tasks.filter(
			task => task.status === status
		)

		if (tasksForStatus.length === 0) {
			this.#renderEmptyComponent(listComponent)
			return
		}

		tasksForStatus.forEach(task => {
			this.#renderTask(task, listElement)
		})
	}

	#renderBucket() {
		const status = 'removed'
		const title = TaskStatusMap[status]
		const className = statusClassMap[status]

		const listComponent = new ListComponent(title, className)
		render(listComponent, this.#boardContainer)

		const listElement = listComponent.element.querySelector('.task-list')
		const tasksForStatus = this.#taskModel.tasks.filter(
			task => task.status === status
		)

		if (tasksForStatus.length === 0) {
			this.#renderEmptyComponent(listComponent)
			return
		}

		tasksForStatus.forEach(task => {
			this.#renderTask(task, listElement)
		})

		const clearButton = new ClearButtonComponent(() => {
			this.#taskModel.clearRemoved()
			this.init()
		})
		render(clearButton, listComponent.element)
	}

	#renderTask(task, container) {
		const taskComponent = new TaskComponent(task)
		render(taskComponent, container)
	}

	#renderEmptyComponent(listComponent) {
		const emptyComponent = new EmptyComponent()
		render(emptyComponent, listComponent.element)
	}
}
