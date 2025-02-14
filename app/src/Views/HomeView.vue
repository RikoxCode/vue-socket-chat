<script setup>
import { ref } from 'vue';
import random from 'random-string-generator';
import router from "../router/index.js";
import socketService from "../services/socket-client.service.js";

const socket = socketService.getSocket()
const userName = ref('');
const roomCode = ref('');

const createRoom = () => {
  if(userName.value === '') return;

  console.log('create room');

  socket.emit('createRoom', {room: random(10), userName: userName.value});
  router.push('/chat')
};

const joinRoom = () => {
  console.log('join room', roomCode.value, userName.value);
  if(roomCode.value === '') return;
  if(userName.value === '') return;

  socket.emit('joinRoom', {room: roomCode.value, userName: userName.value});
  router.push('/chat')
};
</script>

<template>
  <!-- Room Creation / Joining -->
  <div class='flex justify-center items-center w-full mt-12'>
    <div class='w-1/3 bg-white p-6 rounded-2xl shadow-lg'>
      <h2 class='text-xl font-bold text-center text-gray-800 mb-4'>Join or Create a Room</h2>
      <input v-model='userName' type='text' placeholder='Enter your name' class='w-full p-3 border rounded-lg mb-4 text-center text-gray-700 font-bold' />
      <button @click='createRoom' class='w-full p-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition'>Create Room</button>
      <div class='flex items-center my-4'>
        <hr class='flex-grow border-t border-gray-400'>
        <span class='px-3 text-gray-500'>or</span>
        <hr class='flex-grow border-t border-gray-400'>
      </div>
      <div class='flex w-full border border-gray-500 rounded-lg overflow-hidden'>
        <input v-model='roomCode' type='text' placeholder='Enter room code' class='flex-1 p-3 outline-none' />
        <button @click='joinRoom' @keyup.enter='joinRoom' class='p-3 bg-gray-800 text-white hover:bg-gray-700 transition'>Join</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>