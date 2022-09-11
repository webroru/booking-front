<script setup>
  /**
   * TODO:
   * Загрузка фото на сервер перед переходом к следующему шагу.
   * Либо сохранение в сторадж и загрузка от туда..
   * Но нужно продумать механизм удаления с бэка.
   */
  import { ref, computed } from 'vue';
  import { useBookingStore } from '@/stores/booking';
  import MakePhoto from './Photos/MakePhoto.vue';
  import ShowPhotos from './Photos/ShowPhotos.vue';

  const store = useBookingStore();
  const { booking, setBooking } = store;
  const showMakePhoto = ref(false);
  const photos = ref([]);
  const formRef = ref();
  const isCameraEnabled = ref(false);

  const tax = {
    adult: 3.13,
    children: 1.57,
    baby: 0,
  };

  const bookedNights = Math.ceil((Date.parse(booking.checkOutDate) - Date.parse(booking.checkInDate)) / 1000 / 60 / 60 / 24);
  const totalTax = computed(() => strip(bookedNights * (booking.adults * tax.adult + booking.children * tax.children + booking.babies * tax.baby)));
  const showExtraPay = computed(() => isExtraGuest());
  const strip = (number) => parseFloat(number).toPrecision(4);

  const closeMakePhoto = () => {
    isCameraEnabled.value = false;
    showMakePhoto.value = false;
  };

  const openMakePhoto = () => {
    isCameraEnabled.value = true;
    showMakePhoto.value = true;
  };

  setBooking({ ...booking, adults: 0, children: 0, babies: 0, sucklings: 0 });

  const isExtraGuest = () => {
    let confirmedGuests = booking.adults + booking.children + booking.babies;
    if (booking.sucklings > 1) {
      confirmedGuests += booking.sucklings - 1;
    }
    return booking.guestsAmount < confirmedGuests;
  };

  const submitForm = () => {
    const formData = new FormData();

    for (const photoBlob of photos.value) {
      formData.append('photos[]', photoBlob);
    }

    fetch('https://example.com/upload.php', { method: 'POST', body: formData })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          throw Error(`Server returned ${response.status}: ${response.statusText}`);
        }
      })
      .then(response => console.log(response.text()))
      .catch(err => {
        alert(err);
      });
  };
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="16">
      <el-form :model="booking" label-width="50%" ref="formRef">
        <el-form-item label="Enter amount of Addults (18 years and older)">
          <el-input-number v-model="booking.adults" :min="0" :max="10" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (from 7 years up to 18 years)">
          <el-input-number v-model="booking.children" :min="0" :max="10" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (from 4 years up to 7)">
          <el-input-number v-model="booking.babies" :min="0" :max="10" />
        </el-form-item>
        <el-form-item label="Enter amount of Children (4 years and younger)">
          <el-input-number v-model="booking.sucklings" :min="0" :max="10" />
        </el-form-item>
        <el-form-item>
          <div class="output">
            <ShowPhotos />
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openMakePhoto">Make photos of yours Pasports or Card IDs</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>The city tax for a person per night</span>
          </div>
        </template>
        <div class="text item">18 years and older: {{ tax.adult }} &euro;</div>
        <div class="text item">from 7 years to 18 years: {{ tax.children }} &euro;</div>
        <div class="text item">6 years and younger: {{ tax.baby }} &euro;</div>
        <div class="bottom">
          Total Tax: {{ totalTax }} &euro;
        </div>
      </el-card>
      <p v-if="showExtraPay"><strong>Дополнительная плата за дополнительного гостя: {{ bookedNights * booking.extraPerson}} &euro;</strong></p>
    </el-col>
  </el-row>
  <el-row>
  </el-row>
  <el-dialog v-model="showMakePhoto" title="Make photos of yours Pasports or Card IDs" width="80%"
    :before-close="closeMakePhoto">
    <MakePhoto :is-camera-enabled="isCameraEnabled" />
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="closeMakePhoto">Done</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .text {
    font-size: 14px;
  }
  
  .item {
    margin-bottom: 18px;
  }

  .bottom {
    font-weight: bold;
  }

  .output {
    display: flex;
    flex-wrap: wrap;
  }
</style>
