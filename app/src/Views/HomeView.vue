<script setup>
import { ref } from 'vue';
import { socket } from "@/services/socket-client";
import random from 'random-string-generator';
import router from "@/router/index.js";

const userName = ref('');
const roomCode = ref('');

const createRoom = () => {
  if(userName.value === '') return;

  console.log('create room');

  socket.emit('createRoom', {room: random(10), userName: userName.value});
  router.push('/chat')
};

const joinRoom = () => {
  if(roomCode.value === '') return;
  if(userName.value === '') return;

  socket.emit('joinRoom', {room: roomCode.value, userName: userName.value});
  router.push('/chat')
};
</script>

<template>
  <div class="m-12">
    <div class="w-full flex justify-center">
      <h1 class="text-3xl font-bold">Chat IO</h1>
    </div>

    <!-- (Room Creation / Room Joining) & User Name creation -->
    <div class="flex justify-center items-center w-full mt-8">
      <div class="flex-col justify-center mt-8 items-center w-1/4 bg-slate-300 shadow-2xl rounded-xl">
        <div class="flex justify-center items-center w-full p-4">
          <input v-model="userName" type="text" placeholder="Enter your name"
                 class="w-full p-2 border-2 border-slate-500 text-center text-gray-700 font-bold rounded-md">
        </div>
        <div class="flex justify-center items-center w-full p-4">
          <button @click="createRoom" class="w-full p-2 bg-slate-500 text-white rounded-md cursor-pointer hover:bg-slate-600">Create Room</button>
        </div>

        <div class="flex items-center w-7/8 mx-auto">
          <hr class="flex-grow border-t border-gray-600">
          <span class="px-3 text-gray-500">
            or
        </span>
          <hr class="flex-grow border-t border-gray-600">
        </div>

        <div class="flex justify-center items-center w-full p-4">
          <div class="flex w-full border border-gray-500 rounded-md overflow-hidden">
            <input
                type="text"
                placeholder="Enter room code"
                class="flex-1 p-2 outline-none"
                v-model="roomCode"
            />
            <button
                @click="joinRoom"
                class="p-2 bg-slate-500 text-white cursor-pointer hover:bg-slate-600 m-[1px] rounded-r-lg"
            >
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>