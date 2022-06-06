<script setup lang="ts">
import { Listen } from '@/composables';
import { onMounted } from 'vue';
onMounted(() => {
	const listen = new Listen()
	listen.listenNodeMove("ele-left", "right")
})

const remove = (id: string) => {
	const left = document.getElementById(id)
	const rightContainer = document.getElementById("right")
	if (!left || !rightContainer) return
	rightContainer.appendChild(left)
}
</script>
<template>
	<div class="playground">
		<div class="menus">
			<button @click="remove('ele-left')">移除左边</button>
			<button @click="remove('right')">移除左边</button>
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