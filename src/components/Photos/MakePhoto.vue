<script setup>
  import { ref, watch } from 'vue';
  import { usePhotosStore } from '@/stores/photos';
  import ShowPhotos from './ShowPhotos.vue';

  // eslint-disable-next-line no-unused-vars
  const props = defineProps({
    isCameraEnabled: Boolean,
  });

  const photosStore = usePhotosStore();
  const { addPhoto } = photosStore;
  const canvas = ref(null);
  const video = ref(null);
  let localStream = null;

  const startStreaming = async () => {
    try {
      localStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      video.value.srcObject = localStream;
    } catch (err) {
      console.error(`An error occurred: ${err}`);
    }
  };

  const clearphoto = () => {
    const context = canvas.value.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, canvas.value.width, canvas.value.height);
  };

  const takepicture = () => {
    const ratio = video.value.clientHeight / video.value.clientWidth;
    canvas.value.width = 1024;
    canvas.value.height = canvas.value.width * ratio;
    const context = canvas.value.getContext('2d');
    
    if (!canvas.value.height || !canvas.value.width) {
      clearphoto();
      return;
    }

    context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
    canvas.value.toBlob((blob) => {
      if (blob === null) {
        console.log('Failed to convert canvas to blob');
        return;
      }
      addPhoto(blob);
    });
  };

  const stopStreaming = () => {
    if (localStream !== null) {
      const track = localStream.getTracks()[0];
      track.stop();
      localStream = null;
    }
  };

  startStreaming();

  watch(() => props.isCameraEnabled, (value) => {
    if (value) {
      startStreaming();
    } else {
      stopStreaming();
    }
  });
</script>

<template>
  <el-row>
    <el-col :span="12">
      <div class="camera">
        <video ref="video" autoplay muted playsinline @canplay="adjustVideoSize"></video>
        <el-button @click="takepicture" type="primary">{{ $t('photos.takePhoto') }}</el-button>
      </div>
      <canvas ref="canvas"></canvas>
    </el-col>
    <el-col :span="12">
      <div class="output">
        <ShowPhotos />
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
