<template>
    <div>
        <h2>XM tracker</h2>
        <div>
            {{ songStore }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { songStore } from "./stores/songStore";
</script>

<style scoped></style>
