<script setup>
  import { ref } from 'vue';
  import ShowPhotos from './ShowPhotos.vue';

  // eslint-disable-next-line no-unused-vars
  const emit = defineEmits(['updatePhotos'])
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

  const clearphoto = () => {
    const context = canvas.value.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.value.width, canvas.value.height);
  }

  const takepicture = () => {
    canvas.value.height = video.value.clientHeight;
    canvas.value.width = video.value.clientWidth;
    const context = canvas.value.getContext('2d');
    
    if (!canvas.value.height || !canvas.value.width) {
      clearphoto();
      return;
    }

    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    //photos.value.push(canvas.value.toDataURL('image/png'));
    canvas.value.toBlob((blob) => {
      if (blob === null) {
        console.log("Failed to convert canvas to blob");
        return;
      }
      photos.value.push(blob);
    });
    emit('updatePhotos', photos.value);
  }

  const removePhoto = (inxex) => {
    photos.value.splice(inxex, 1);
    emit('updatePhotos', photos.value);
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
      <canvas ref="canvas"></canvas>
    </el-col>
    <el-col :span="12">
      <div class="output">
        <ShowPhotos :photos="photos" @remove-photo="removePhoto" />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
  canvas {
    display: none;
  }

  video {
    width: 100%;
  }

  .camera {
    display: inline-block;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }
</style>
