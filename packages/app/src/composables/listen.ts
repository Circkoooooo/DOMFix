type currentChange = {
	addList: Node[]
	removeList: Node[]
}
export class Listen {
	private currentChange: currentChange

	constructor() {
		this.currentChange = {
			addList: [] as Node[],
			removeList: [] as Node[],
		}
	}
	//为Node创建Node变化的监听
	public listenNodeMove = (oldElementId: string, targetId: string) => {
		const oldNode = document.getElementById(oldElementId)
		const targetContainer = document.getElementById(targetId)
		const observerOptions = {
			childList: true,
			attributes: true,
		}
		if (!oldNode || !targetContainer) return

		this.observer.observe(oldNode, observerOptions)
		this.observer.observe(targetContainer, observerOptions)
	}

	//事件监听器
	private observer = new MutationObserver((mutationList, observer) => {
		mutationList.forEach(mutation => {
			switch (mutation.type) {
				case 'childList':
					/* 从树上添加或移除一个或更多的子节点；参见 mutation.addedNodes 与
							 mutation.removedNodes */
					if (mutation.addedNodes.length !== 0) {
						mutation.addedNodes.forEach(item => {
							this.currentChange.addList.push(item)
						})
					}
					if (mutation.removedNodes.length !== 0) {
						mutation.removedNodes.forEach(item => {
							this.currentChange.addList.push(item)
						})
					}
					console.log(this.currentChange)
			}
		})
	})
}
