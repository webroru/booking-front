<script setup>
  import { ref } from 'vue';

  const width = 320;
  const height = ref(0);
  let streaming = false;
  const canvas = ref(null);
  const video = ref(null);
  const photos = ref([]);

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
  }

  const takepicture = () => {
    const context = canvas.value.getContext('2d');
    
    if (!width || !height.value) {
      clearphoto();
      return;
    }

    context.drawImage(video.value, 0, 0, width, height.value);
    photos.value.push(canvas.value.toDataURL('image/png'));
  }

const removePhoto = (inxex) => {
  photos.value.splice(inxex, 1);
};
</script>

<template>
  <el-row>
    <el-col :span="12">
      <div class="camera">
        <video ref="video" autoplay @canplay="adjustVideoSize">
        </video>
        <el-button @click="takepicture" type="primary">Take photo</el-button>
      </div>
      <canvas ref="canvas" :with="width" :height="height"></canvas>
    </el-col>
    <el-col :span="12">
      <div class="output">
        <div class="image-wraper" v-for="(photo, index) in photos" :key="'photo' + index">
          <el-image :src="photo" :preview-src-list="photos" :initial-index="index" :fit="contain" />
          <el-button type="danger" @click="removePhoto(index)">Remove</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  canvas {
    display: none;
  }

  .image-wraper {
    margin: 0 10px 10px;
    text-align: center;
    width: 128px;
  }

  .camera {
    display: inline-block;
    width: 340px;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }
</style>
