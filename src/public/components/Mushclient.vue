<template>
  <div>
    <P>Client</p>
  </div>
</template>

<script>
import axios from 'axios';
import WSClient from '../wsclient.js';

// The export default syntax is declaring a component 
// which can be registered and reused later.
  export default {
    name: 'Mushclient',
    data () {
      return {
        isOpen: false,
        socket: null
      }
    },
    created() {

      const serverSSL = window.location.protocol == "https:";
      const serverProto = serverSSL ? "wss://" : "ws://";
      const serverUrl = `${serverProto}jetownersanonymous.com:1777/wsclient`;
      let conn = this.connect(serverUrl);

    },
    methods: {
      isConnected: function() {
        return (this.socket && this.isOpen && (this.socket.readyState === 1));
      },
      sendText: function(text) {

      },
      connect: function(url) {
        if (this.isConnected()) {
          console.log("is Connected!")
          var old = this.socket;
          this.sendText('QUIT');
          this.isOpen && setTimeout(old.close, 1000);
        }

        this.socket = new window.WebSocket(url);
        this.isOpen = false;

        this.socket.onopen = function(evt) {
          console.log(evt);
        };

        this.socket.onerror = function (evt) {
          console.log(evt);
        };

        this.socket.onclose = function (evt) {
          console.log(evt);
        };

        this.socket.onmessage = function (evt) {
          console.log(evt);
        };

      }
    }
  }


</script>
