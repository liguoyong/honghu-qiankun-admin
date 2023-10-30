<template>
  <div class="layout-wrapper shell-container">
    <v-shell :banner="banner" :shell_input="send_to_terminal" :commands="commands" @shell_output="prompt"></v-shell>
  </div>
</template>

<script>
export default {
  data() {
    return {
      send_to_terminal: "",
      banner: {
        // header: "Vue Shell",
        // subHeader: "Shell is power just enjoy 🔥",
        // helpHeader: 'Enter "help" for more information.',
        emoji: {
          first: "",
          second: "",
          // time: 750
        },
        sign: "$",
        // img: {
        //   align: "left",
        //   link: "/mylogo.png",
        //   width: 100,
        //   height: 100
        // }
      },
      commands: [
        {
          name: "info",
          desc: "Show information about this terminal",
          get() {
            return `<p>With ❤️ By Salah Bentayeb @halasproject.</p>`;
          }
        },
        {
          name: "uname",
          desc: "Show the current terminal name",
          get() {
            return navigator.appVersion;
          }
        }
      ]
    };
  },
  methods: {
    prompt(value) {
      console.log(value, 'value');
      if (value == "node -v") {
        this.send_to_terminal = '1234';
      }
    }
  }
};
</script>

<style>
.shell-container {
  min-height: 500px;

  #container {
    min-height: 500px;
    overflow-y: auto;
    max-height: 500px;
  }

  #banner {
    margin-bottom: 1em;
  }
}
</style>
