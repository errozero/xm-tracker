<template>
	<div class="channel-view">
		<Channel />
		<Channel />
	</div>
</template>

<script setup lang="ts">
import Channel from "@ui/components/Channel.vue";
</script>

<style scoped>
.channel-view {
	display: flex;
	background: #111;
	flex-grow: 1;
}
</style>
