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

	#handleModelChange = () => {
		this.init()
	}

	constructor({ boardContainer, taskModel }) {
		this.#boardContainer = boardContainer
		this.#taskModel = taskModel

		this.#taskModel.addObserver(this.#handleModelChange)
	}

	init() {
		this.#clearBoard()
		this.#renderBoard()
	}

	#clearBoard() {
		this.#boardContainer.innerHTML = ''
	}

	#renderBoard() {
		const statuses = Object.keys(TaskStatusMap)
		statuses.forEach(status => this.#renderTasksList(status))
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
		}

		tasksForStatus.forEach(task => {
			this.#renderTask(task, listElement)
		})

		if (status === 'removed') {
			const bucketButton = new ClearButtonComponent(() => {
				this.#taskModel.clearRemoved()
				this.init()
			})
			render(bucketButton, listComponent.element)
		}

		listComponent.element.addEventListener('dragover', evt => {
			evt.preventDefault()
		})

		listComponent.element.addEventListener('drop', evt => {
			evt.preventDefault()
			const taskId = evt.dataTransfer.getData('text/plain')
			this.#taskModel.updateTaskStatus(taskId, status)
		})
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
