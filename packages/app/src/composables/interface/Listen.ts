import { MoveCurrentChange, OldElementStatus } from '@/types'

export interface Listen {
	currentChange: MoveCurrentChange
	oldElementStatus: OldElementStatus
	oldElement: HTMLElement
	observer: MutationObserver
	initObserver(): MutationObserver
	copyNodeStatus(element: HTMLElement): void
	listenNodeMove?(oldElementId: string, targetId: string): void
	doMove?(oldElementId: string, targetContainerId: string): void
}
