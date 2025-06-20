import { boardTasks } from '../mock/task.js'
import { generateID } from '../utils.js'

export default class TaskModel {
	#tasks = [...boardTasks]
	#observers = []

	get tasks() {
		return this.#tasks
	}

	addObserver(callback) {
		this.#observers.push(callback)
	}

	#notify() {
		for (const observer of this.#observers) {
			observer()
		}
	}

	addTask(title) {
		const newTask = {
			id: generateID(),
			title,
			status: 'todo',
		}
		this.#tasks.push(newTask)
		this.#notify()
	}

	clearRemoved() {
		this.#tasks = this.#tasks.filter(task => task.status !== 'removed')
		this.#notify()
	}

	markDoneAsRemoved() {
		this.#tasks = this.#tasks.map(task =>
			task.status === 'done' ? { ...task, status: 'removed' } : task
		)
		this.#notify()
	}

	updateTaskStatus(id, newStatus) {
		const task = this.#tasks.find(t => t.id === id)
		if (task && task.status !== newStatus) {
			task.status = newStatus
			this.#notify()
		}
	}
}
