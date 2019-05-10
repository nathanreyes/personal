<template>
  <div class="max-w-md mx-auto">
    <p
      class="mb-6 text-center"
    >If you felt encouraged or informed by this blog, or would like to hire me, please reach out.</p>
    <p class="mb-12 text-center">I'd love to hear from you.</p>
    <form
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      class="flex flex-col items-center mx-4 mb-16"
    >
      <input type="hidden" name="form-name" value="contact">
      <div class="w-full mb-4">
        <input type="text" :class="controlClass" placeholder="Name">
      </div>
      <div class="w-full mb-4">
        <textarea :class="controlClass" placeholder="Message" rows="4"/>
      </div>
      <button
        class="bg-blue-300 hover:bg-blue-400 text-blue-800 text-xl font-medium w-full px-6 py-4 rounded shadow-lg hover:shadow-md hover:text-blue-d3"
      >Submit</button>
    </form>
    <p class="mb-16 border-t-2 border-blue-l2 w-1/2 mx-auto opacity-25"/>
    <p class="mb-8 text-center">You can also get in contact via the following:</p>
    <div class="flex items-center">
      <ul class="mx-auto text-xl">
        <li class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-blue-200 fill-current w-8 h-8 mr-6"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.066 9.645c.183 4.04-2.83 8.544-8.164 8.544-1.622 0-3.131-.476-4.402-1.291 1.524.18 3.045-.244 4.252-1.189-1.256-.023-2.317-.854-2.684-1.995.451.086.895.061 1.298-.049-1.381-.278-2.335-1.522-2.304-2.853.388.215.83.344 1.301.359-1.279-.855-1.641-2.544-.889-3.835 1.416 1.738 3.533 2.881 5.92 3.001-.419-1.796.944-3.527 2.799-3.527.825 0 1.572.349 2.096.907.654-.128 1.27-.368 1.824-.697-.215.671-.67 1.233-1.263 1.589.581-.07 1.135-.224 1.649-.453-.384.578-.87 1.084-1.433 1.489z"
            ></path>
          </svg>
          <div class="flex items-baseline">
            <span class="w-24">Twitter:</span>
            <a href="#" class="link">@natedoggit</a>
          </div>
        </li>
        <li class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="text-blue-200 fill-current w-8 h-8 mr-6"
          >
            <path
              class="primary"
              d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"
            ></path>
            <path class="secondary" d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"></path>
          </svg>
          <div class="flex items-baseline">
            <span class="w-24">Email:</span>
            <a href="mailto:nathanreyes@me.com" class="link">nathanreyes@me.com</a>
          </div>
        </li>
        <li class="flex items-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="text-blue-200 fill-current w-8 h-8 mr-6"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            ></path>
          </svg>
          <div class="flex items-baseline">
            <span class="w-24">Github:</span>
            <a href="https://github.com/nathanreyes" class="link">nathanreyes</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data() {
    return {
      controlClass:
        'block w-full bg-blue-100 text-xl text-gray-800 px-4 py-4 rounded outline-none shadow-md',
    };
  },
};
</script>
