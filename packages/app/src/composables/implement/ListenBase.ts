import { MoveCurrentChange, OldElementStatus } from '@/types'
import { Listen } from '../interface/Listen'

export class ListenBase implements Listen {
	currentChange: MoveCurrentChange
	oldElementStatus: OldElementStatus
	oldElement: HTMLElement
	observer: MutationObserver

	constructor() {
		this.currentChange = {
			addList: new Set(),
		}
		this.oldElementStatus = {} as OldElementStatus
		this.oldElement = {} as HTMLElement
		this.observer = this.initObserver()
	}
	initObserver() {
		//事件监听器
		return new MutationObserver((mutationList, observer) => {
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
	}

	public copyNodeStatus(element: HTMLElement) {
		this.oldElementStatus.height = element.offsetHeight
		this.oldElementStatus.width = element.offsetWidth
		this.oldElementStatus.left = element.offsetLeft
		this.oldElementStatus.top = element.offsetTop
	}
}
