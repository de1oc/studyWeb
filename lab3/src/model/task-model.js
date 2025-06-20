import { boardTasks } from '../mock/task.js'

export default class TaskModel {
	tasks = [...boardTasks]

	getTasks() {
		return this.tasks
	}

	markDoneAsRemoved() {
		this.tasks = this.tasks.map(task =>
			task.status === 'done' ? { ...task, status: 'removed' } : task
		)
	}

	clearRemoved() {
		this.tasks = this.tasks.filter(task => task.status !== 'removed')
	}
}
