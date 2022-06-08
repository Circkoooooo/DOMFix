<script setup lang="ts">
import { ListenMove } from '@/composables/implement/ListenMove';
import { onMounted } from 'vue';

let listenMove: ListenMove
onMounted(() => {
	listenMove = new ListenMove()
	listenMove.listenNodeMove("ele-left", "right")
})

function move(type: number) {
	if (type === 1) {
		listenMove.doMove("ele-left", "right")
	} else {
		listenMove.doMove("ele-left", "left")
	}

}
</script>
<template>
	<div class="playground">
		<div class="menus">
			<button @click="move(2)">移动到左边</button>
			<button @click="move(1)">移动到右边</button>
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