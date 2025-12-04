<script setup lang="ts">
import { ref } from 'vue'

const message = ref('Top Stories')
const today = new Date().toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
</script>
<template>
	<div class="app-container">
		<div class="app-header">
			<span class="app-date">{{ today }}</span>
			<h1>{{ message }}</h1>
		</div>
		<div class="app-content">
      <p v-for="i in 20" :key="i">
        Dummy content line {{ i }}
      </p>
    </div>
    <div class="app-footer">
      <p>End of content</p>
    </div>
	</div>
</template>