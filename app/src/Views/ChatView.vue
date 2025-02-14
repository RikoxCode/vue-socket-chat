<script setup>
import {ref, onBeforeUnmount} from 'vue'
import socketService from '../services/socket-client.service.js'
import Message from "@/components/Message.vue";
import router from "@/router/index.js";

onBeforeUnmount(() => {
  socket.emit('leaveRoom')
})

const socket = socketService.getSocket()
const username = ref('')
const roomCode = ref('')
const chatMessages = ref([])
const newMessage = ref('')
const users = ref([])

socket.on('roomConfig', (data) => {
  users.value = data.room.users
  roomCode.value = data.room.roomName
  username.value = data.currentUser.userName

  chatMessages.value.push({isSpecial: true, username: 'System', message: 'Welcome to the Chat'})

  if (users.value.length === 0) {
    router.push('/')
  }
})

socket.on('chat', (data) => {

  chatMessages.value.push({isSpecial: false, username: data.userName, message: data.message})

  // Scroll messages div down to newest Message
  const messagesDiv = document.querySelector('.w-full.flex-1.overflow-y-auto.border-b.pb-4.mb-4.space-y-2')
  // scroll to lowest point
  messagesDiv.scrollTop = messagesDiv.scrollHeight
})

socket.on('newUser', (data) => {
  chatMessages.value.push({isSpecial: true, username: 'System', message: `${data.userName} joined the Chat`})
})

socket.on('userLeft', (data) => {
  chatMessages.value.push({isSpecial: true, username: data.userName, message: `left the Chat`})
})

const sendMessage = () => {
  if (newMessage.value === '') return;

  socket.emit('newMessage', newMessage.value)
  newMessage.value = ''
}


</script>

<template>
  <div class='w-full flex flex-row items-start p-6 bg-gray-50 min-h-screen'>
    <!-- Sidebar -->
    <div class='w-1/4 bg-white p-4 rounded-2xl shadow-lg mr-6'>
      <h2 class='text-lg font-semibold text-gray-800 mb-4'>Active Users</h2>
      <ul class='space-y-2'>
        <li v-for='(user, index) in users' :key='index' class='p-2 bg-gray-100 rounded-lg text-gray-700'>
          {{ user.userName }}
        </li>
      </ul>
      <div class='mt-4 p-2 bg-gray-200 rounded-lg text-center text-gray-700'>
        Chat Key: <span class='font-semibold'>{{ roomCode }}</span>
      </div>

      <!-- Red leave chat btn -->
      <button @click="router.push('/')" class="mt-4 w-full p-2 rounded-lg bg-red-200 hover:bg-red-300">
        Leave room
      </button>
    </div>

    <!-- Main Chat Section -->
    <div class='w-3/4 bg-white p-6 rounded-2xl shadow-lg flex flex-col' style='height: calc(100vh - 48px);'>
      <h1 class='text-3xl font-extrabold text-gray-800 mb-4 text-center'>Chat IO</h1>
      <div class='w-full flex-1 overflow-y-auto border-b pb-4 mb-4 space-y-2'>

        <Message v-for='(msg, index) in chatMessages' :key='index' :msg='msg'/>

      </div>
      <div class='flex gap-2'>
        <input v-model='newMessage' @keyup.enter='sendMessage' placeholder='Type a message...'
               class='flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-gray-400'/>
        <button @click='sendMessage' class='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition'>
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}

.fade-enter, .fade-leave-to {
  opacity: 1;
}
</style>