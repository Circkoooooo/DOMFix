<script setup lang="ts">
import { ListenMove } from '@/composables/implement/ListenMove';
import { onMounted } from 'vue';
onMounted(() => {
	const listenMove = new ListenMove()
	listenMove.listenNodeMove("ele-left", "right")
})

const move = (id: string) => {
	const left = document.getElementById(id)
	const rightContainer = document.getElementById("right")
	const leftContainer = document.getElementById("left")
	if (!left || !rightContainer || !leftContainer) return
	if (rightContainer.hasChildNodes()) {
		leftContainer.appendChild(left)
	} else {
		rightContainer.appendChild(left)
	}
}
</script>
<template>
	<div class="playground">
		<div class="menus">
			<button @click="move('ele-left')">移动元素</button>
		</div>
		<div class="container">
			<div id="left"
					class="box">
				<div id="ele-left"
						class="ele"></div>
			</div>
			<div id="right"
					class="box">
			</div>
		</div>
	</div>
</template>

<style src="@/styles/playground.less" lang="less">
</style>