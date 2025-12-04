<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Start here.')
</script>
<template>
	<div>
		<h1>{{ message }}</h1>
	</div>
</template>