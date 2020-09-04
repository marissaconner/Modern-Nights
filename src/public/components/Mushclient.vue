<template>
  <div class="client">
    <div class="client__message" v-for="message in messageBuffer">
      {{message}}
    </div>

    <textarea v-on:keyup="handleKeyup" v-model="input" />
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
        historyIndex: 0,
        inputHistory: [],
        messageBuffer: [],
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
      handleKeyup: function(e) {
        if( e.keyCode === 13 ) {
          this.sendMessage()
        }
        if( e.keyCode === 38 ) {
          if( this.historyIndex < this.inputHistory.length  ) {
            this.input = this.inputHistory[this.historyIndex];
            this.historyIndex += 1;
          }
        }
        if( e.keyCode === 40 ) {
          if( this.historyIndex > 0 ) {
            this.input = this.inputHistory[this.historyIndex-1];
            this.historyIndex -= 1;    
          }
        }
      }, 
      isConnected: function() {
        return (this.socket && this.isOpen && (this.socket.readyState === 1));
      },
      sendMessage: function() {
        if( this.input.length > 0 ) {
          this.socket.send('t' + this.input + '\r\n');
          this.inputHistory.unshift(this.input);
          this.input = "";
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
          component.messageBuffer.push(evt);
        };

        this.socket.onclose = function (evt) {
          component.messageBuffer.push("Connection closed.");
        };

        this.socket.onmessage = function(evt) {
          console.log(evt.data.replace(/[\n\r]t/g, ''));
          component.messageBuffer.push(evt.data)
        }
      }
    }
  }
</script>

<style>

  .client {
    display: flex;
    flex-direction: column;
    font-family: 'Courier Prime';
  }
  .client__message {
    margin: .5em;
  }
</style>