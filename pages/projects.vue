<template>
  <div class="max-w-3xl mx-auto">
    <div
      v-for="{ img, imgAlt, imgClass, title, description, url, githubUrl, tintColor } in projects"
      :key="title"
      class="flex flex-col md:flex-row w-full bg-gray-800 shadow-inner rounded-lg overflow-hidden mb-12"
    >
      <div class="flex flex-col w-full md:w-1/2 py-6 px-8">
        <h3 class="header">{{ title }}</h3>
        <div class="border-b-4 border-gray-500 w-8 mb-6"></div>
        <p class="flex-grow mb-4">{{ description }}</p>
        <ul class="text-sm">
          <!--Site Link-->
          <li class="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-blue-300 fill-current w-6 h-6 mr-4"
              viewBox="0 0 20 20"
            >
              <path
                d="M10 20a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm7.75-8a8.01 8.01 0 0 0 0-4h-3.82a28.81 28.81 0 0 1 0 4h3.82zm-.82 2h-3.22a14.44 14.44 0 0 1-.95 3.51A8.03 8.03 0 0 0 16.93 14zm-8.85-2h3.84a24.61 24.61 0 0 0 0-4H8.08a24.61 24.61 0 0 0 0 4zm.25 2c.41 2.4 1.13 4 1.67 4s1.26-1.6 1.67-4H8.33zm-6.08-2h3.82a28.81 28.81 0 0 1 0-4H2.25a8.01 8.01 0 0 0 0 4zm.82 2a8.03 8.03 0 0 0 4.17 3.51c-.42-.96-.74-2.16-.95-3.51H3.07zm13.86-8a8.03 8.03 0 0 0-4.17-3.51c.42.96.74 2.16.95 3.51h3.22zm-8.6 0h3.34c-.41-2.4-1.13-4-1.67-4S8.74 3.6 8.33 6zM3.07 6h3.22c.2-1.35.53-2.55.95-3.51A8.03 8.03 0 0 0 3.07 6z"
              ></path>
            </svg>
            <a :href="url" class="link">{{ url }}</a>
          </li>
          <!--Github Link-->
          <li class="flex items-center mt-4" v-if="githubUrl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="text-blue-300 fill-current w-6 h-6 mr-4"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              ></path>
            </svg>
            <a :href="githubUrl" class="link">{{ githubUrl }}</a>
          </li>
        </ul>
      </div>
      <div
        class="flex items-stretch w-full md:w-1/2 shadow-inner"
        :style="{ backgroundColor: tintColor }"
      >
        <div
          class="w-full mx-6 md:my-6 mt-8 md:ml-8 -mb-8 md:-mr-8 rounded-lg overflow-hidden shadow-lg bg-cover"
          :style="{ height: '24rem', backgroundImage: `url(${img})`, backgroundPosition: 'top center' }"
        />
      </div>
    </div>
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
