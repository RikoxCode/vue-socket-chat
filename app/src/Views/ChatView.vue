<script setup>
import { ref, onMounted } from 'vue'
import { socket } from '@/services/socket-client.js'

const username = ref('')
const roomCode = ref('')
const chatMessages = ref([])
const newMessage = ref('')
const users = ref([])

socket.on('chat', (data) => {
  chatMessages.value.push({ username: data.userName, message: data.message })
})

const sendMessage = () => {
  if(newMessage.value === '') return;

  socket.emit('chat', newMessage.value)
  newMessage.value = ''
}

</script>

<template>
  <div class='flex flex-col items-center p-6 bg-gray-100 min-h-screen'>
    <h1 class='text-2xl font-bold mb-4'>Chat IO</h1>
    <div class='bg-white p-6 rounded-lg shadow-md w-80'>
      <div class='h-40 overflow-y-auto border-b mb-4'>
        <div v-for='(msg, index) in chatMessages' :key='index' class='p-1 text-sm'>
          {{ msg.username }}: {{ msg.message }}
        </div>
      </div>
      <input v-model='newMessage' @keyup.enter='sendMessage' placeholder='Type a message' class='w-full p-2 border rounded mb-2' />
      <button @click='sendMessage' class='w-full p-2 bg-gray-600 text-white rounded'>Send</button>
    </div>
  </div>
</template>