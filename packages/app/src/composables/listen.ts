type MoveCurrentChange = {
	addList: Set<Node>
}
type OldElementStatus = {
	left: number
	top: number
	height: number
	width: number
}

export class Listen {
	private currentChange: MoveCurrentChange
	private oldElementStatus: OldElementStatus
	private oldElement: HTMLElement
	constructor() {
		this.currentChange = {
			addList: new Set(),
		}
		this.oldElementStatus = {} as OldElementStatus
		this.oldElement = {} as HTMLElement
	}

	//为Node创建Node变化的监听
	public listenNodeMove = async (oldElementId: string, targetId: string) => {
		//获取旧的属性
		const oldElement = document.getElementById(oldElementId)
		const targetContainer = document.getElementById(targetId)
		if (!oldElement || !targetContainer) return
		//保存元素旧状态的属性
		this.oldElement = oldElement
		this.copyNodeStatus(oldElement)

		const observerOptions = {
			childList: true,
			attributes: true,
		}

		// 创建监听
		this.observer.observe(oldElement, observerOptions)
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
							this.currentChange.addList.add(item)
						})
					}
			}
		})
		console.log('pre', this.oldElementStatus)
		this.copyNodeStatus(this.oldElement)
		console.log('after', this.oldElementStatus)
	})

	private copyNodeStatus(element: HTMLElement) {
		this.oldElementStatus.height = element.offsetHeight
		this.oldElementStatus.width = element.offsetWidth
		this.oldElementStatus.left = element.offsetLeft
		this.oldElementStatus.top = element.offsetTop
	}
}
