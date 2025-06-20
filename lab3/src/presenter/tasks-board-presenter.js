import TaskComponent from '../view/task-component.js'
import ListComponent from '../view/list-component.js'
import ClearButtonComponent from '../view/clear-button-component.js'
import { TaskStatusMap } from '../const.js'
import { render } from '../framework/render.js'

export default class TasksBoardPresenter {
	constructor({ boardContainer, taskModel }) {
		this.boardContainer = boardContainer
		this.taskModel = taskModel
	}

	#clearBoard() {
		this.boardContainer.innerHTML = ''
	}

	init() {
		this.#clearBoard()

		const tasks = this.taskModel.getTasks()

		const statuses = ['todo', 'in-progress', 'done', 'removed']

		const groupedTasks = Object.fromEntries(
			statuses.map(status => [status, []])
		)

		tasks.forEach(task => {
			if (groupedTasks[task.status]) {
				groupedTasks[task.status].push(task)
			}
		})

		const statusClassMap = {
			todo: 'backlog',
			'in-progress': 'in-process',
			done: 'done',
			removed: 'bucket',
		}

		statuses.forEach(status => {
			const title = TaskStatusMap[status]
			const className = statusClassMap[status]

			const listComponent = new ListComponent(title, className)
			render(listComponent, this.boardContainer)

			const listElement = listComponent.getElement().querySelector('.task-list')

			groupedTasks[status].forEach(task => {
				const taskComponent = new TaskComponent(task)
				render(taskComponent, listElement)
			})

			if (status === 'removed' && groupedTasks[status].length > 0) {
				const clearButton = new ClearButtonComponent(() => {
					this.taskModel.clearRemoved()
					this.init()
				})
				render(clearButton, listComponent.getElement())
			}
		})
	}
}
