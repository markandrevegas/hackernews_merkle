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
      <div v-for="i in 10" :key="i">
				<div v-if="i === 1" class="card-first">
					<img :src="`https://picsum.photos/seed/${i}/360/250`" alt="">
					<h2>Story Title {{ i }}</h2>
					<div class="card-first__layout">
						<div>
							<img :src="`https://picsum.photos/seed/${i}/40/40`" alt="" style="border-radius:50%">
							<span style="color:var(--dark)">Author Name</span>
						</div>
						<div><span>{{ today }}</span></div>
					</div>
				</div>
				<div v-else class="card">
					<img :src="`https://picsum.photos/seed/${i}/90/90`" alt="">
					<div class="card-text">
						<h2>Story Title {{ i }}</h2>
					</div>
				</div>
      </div>
    </div>
    <div class="app-footer">
      <p>End of content</p>
    </div>
	</div>
</template>