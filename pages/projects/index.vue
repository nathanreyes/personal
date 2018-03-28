<template>
  <div>
    <section
      v-for='{ img, imgAlt, imgClass, title, description, url, technologies } in projects'
      :key='title'
      class='project'>
      <div
        class='w-full md:w-4/5 md:mx-auto rounded overflow-hidden shadow-lg'>
        <div class='p-0 m-0 border-b border-brown-lighter'>
          <a class='p-0 m-0 cursor' :href='url' target='_blank'>
            <img
              :src='img'
              :alt='imgAlt'
              :class='imgClass'>
          </a>
        </div>
        <div class='px-6 py-4'>
          <div class='font-bold text-xl mb-2'>
            {{ title }}
          </div>
          <p class='text-grey-darker text-base mb-2'>
            {{ description }}
          </p>
          <a :href='url' class='' target='_blank'>{{ url }}</a>
        </div>
        <div
          class='px-6 pb-4 flex flex-wrap'
          v-if='technologies.length'>
          <span
            v-for='t in technologies'
            :key='t'
            class='inline-block bg-brown-lighter rounded-full px-3 py-1 text-sm tet-brown-darker mt-4 mr-1'>
            #{{ t }}
          </span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import projects from '~/content/projects/projects.json';

export default {
  data() {
    return {
      projects,
    };
  },
};
</script>

<style scoped>
.project {
  margin-bottom: 60px;
}
</style>