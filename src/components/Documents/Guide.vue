<script setup>
  import { useI18n } from 'vue-i18n';

  const { t } = useI18n();

  const images = import.meta.glob('../../assets/images/documents/*.png', {
    eager: true,
    query: '?url',
    import: 'default'
  });

  const data = [
    {
      title: t('guide.p1.title'),
      body: t('guide.p1.body'),
      image: 'img_1.png',
    },
    {
      title: t('guide.p2.title'),
      body: t('guide.p2.body'),
      image: 'img_2.png',
    },
    {
      title: t('guide.p3.title'),
      body: t('guide.p3.body'),
      image: 'img_3.png',
    },
    {
      title: t('guide.p4.title'),
      body: t('guide.p4.body'),
      image: 'img_4.png',
    },
    {
      title: t('guide.p5.title'),
      body: t('guide.p5.body'),
      image: 'img_5.png',
    },
    {
      title: t('guide.p6.title'),
      body: t('guide.p6.body'),
      image: 'img_6.png',
    },
    {
      title: t('guide.p7.title'),
      body: t('guide.p7.body'),
      image: 'img_7.png',
    },
    {
      title: t('guide.p8.title'),
      body: t('guide.p8.body'),
      image: 'img_8.png',
    },
    {
      title: t('guide.p9.title'),
      body: t('guide.p9.body'),
      image: 'img_9.png',
    },
  ];

  data.forEach(item => {
    item.image = images[`../../assets/images/documents/${item.image}`];
  });
</script>

<template>
  <p>{{ $t('guide.p0') }}</p>

  <template v-for="item in data" :key="item.title">
    <h2>{{ item.title }}</h2>
    <p>{{ item.body }}</p>
    <el-image :src="item.image" fit="scale-down">
      <template #placeholder>
        <el-skeleton animated>
          <template #template>
            <el-skeleton-item variant="image" style="width: 240px; height: 240px" />
          </template>
        </el-skeleton>
      </template>
    </el-image>
  </template>
</template>
