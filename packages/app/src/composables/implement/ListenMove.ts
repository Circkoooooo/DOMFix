import { Listen } from './interface/Listen'
import { ListenBase } from './ListenBase'

/**
 * 用于检测node节点移除到显示，更换状态的类。
 */
export class ListenMove extends ListenBase implements Listen {
	constructor() {
		super()
	}
	public listenNodeMove = (oldElementId: string, targetId: string) => {
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
}
