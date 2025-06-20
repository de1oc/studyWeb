import { boardTasks } from '../mock/task.js'

export default class TaskModel {
	#tasks = [...boardTasks]

	get tasks() {
		return this.#tasks
	}

	addTask(title) {
		const newTask = {
			id: crypto.randomUUID(),
			title,
			status: 'todo',
		}
		this.#tasks.push(newTask)
	}

	clearRemoved() {
		this.#tasks = this.#tasks.filter(task => task.status !== 'removed')
	}

	markDoneAsRemoved() {
		this.#tasks = this.#tasks.map(task =>
			task.status === 'done' ? { ...task, status: 'removed' } : task
		)
	}
}
