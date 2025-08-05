<template>
	<div class="app">
		<MainToolbar />
		<ChannelView />
	</div>
</template>

<script setup lang="ts">
import { songStore } from "./stores/songStore";
import MainToolbar from "@ui/components/MainToolbar.vue";
import ChannelView from "@ui/components/ChannelView.vue";
</script>

<style scoped>
.app {
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
}
</style>
