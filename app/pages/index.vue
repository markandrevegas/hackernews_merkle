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
      <div v-for="i in 10" :key="i" class="card">
				<div style="display:flex; flex-direction:column; gap:8px; flex:1">
					<h2>Story Title {{ i }}</h2>
					<p>Lorem ipsum dolor, sit amet consectetur</p>
				</div>
				
        <img :src="`https://picsum.photos/seed/${i}/80/64`" alt="">
      </div>
    </div>
    <div class="app-footer">
      <p>End of content</p>
    </div>
	</div>
</template>