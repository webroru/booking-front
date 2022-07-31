<script setup>
  import { ref } from 'vue';

  const width = 320;
  const height = ref(0);
  let streaming = false;
  const canvas = ref(null);
  const photo = ref(null);
  const video = ref(null);

  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(function (stream) {
      video.value.srcObject = stream;
    })
    .catch((err) => {
      console.error(`An error occurred: ${err}`);
    });


  const adjustVideoSize = (event) => {
    if (streaming) {
      return;
    }

    height.value = event.currentTarget.videoHeight / (event.currentTarget.videoWidth / width);

    if (isNaN(height.value)) {
      height.value = width / (4 / 3);
    }

    streaming = true;
  };

  const clearphoto = () => {
    const context = canvas.value.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.value.width, canvas.value.height);

    photo.value = canvas.value.toDataURL('image/png');
  }

  const takepicture = () => {
    const context = canvas.value.getContext('2d');
    
    if (!width || !height.value) {
      clearphoto();
      return;
    }

    context.drawImage(video.value, 0, 0, width, height.value);
    photo.value = canvas.value.toDataURL('image/png');
  }
</script>

<template>
  <div class="camera">
    <video
      ref="video"
      autoplay
      @canplay="adjustVideoSize"
      :with="width"
      :height="height">
    </video>
    <el-button @click="takepicture">Take photo</el-button>
  </div>
  <canvas ref="canvas" :with="width" :height="height"></canvas>
  <div class="output">
    <el-image id="photo" :src="photo" :fit="contain" />
  </div>
</template>

<style scoped>
  canvas {
    display: none;
  }

  video {
    border: 1px solid black;
    box-shadow: 2px 2px 3px black;
    height: 240px;
    width: 320px;
  }

  #photo {
    /* border: 1px solid black;
    box-shadow: 2px 2px 3px black; */
    height: 240px;
    width: 320px;
  }

  .camera {
    display: inline-block;
    width: 340px;
  }

  .output {
    display: inline-block;
    vertical-align: top;
    width: 340px;
  }
</style>
