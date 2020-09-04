<template>
  <div>
    <P>Client</p>
    <div v-for="message in messageBuffer">
      {{message}}
    </div>

    <textarea v-model="input" />
    <span @click=sendMessage>send</span>
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
        messageBuffer: ["This is a message!"],
        isOpen: false,
        socket: null,
        input: ""
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
      sendMessage: function() {
        if( this.input.length > 0 ) {
          this.socket.send('t' + this.input + '\r\n');
        }
      },
      handleMessage: function(event) {
        this.messageBuffer.push(evt.data);
      },
      connect: function(url) {
        let component = this;

        if (this.isConnected()) {
          console.log("is Connected!")
          var old = this.socket;
          this.sendText('QUIT');
          this.isOpen && setTimeout(old.close, 1000);
        }

        this.socket = new window.WebSocket(url);
        this.isOpen = false;

        this.socket.onopen = function(evt) {
          component.messageBuffer.push("Connecting...")
        };

        this.socket.onerror = function (evt) {
          console.log(evt);
        };

        this.socket.onclose = function (evt) {
          console.log(evt);
        };

        this.socket.onmessage = function(evt) {
          component.messageBuffer.push(evt.data)
        }

      }
    }
  }


</script>
