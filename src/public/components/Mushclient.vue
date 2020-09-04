<template>
  <div class="client">
    <div class="client__buffer neu__element--inset">
      <div id="client__scroller">
        <div class="client__messages" v-for="message in messageBuffer">
          <span v-html="message" /> 
        </div>
        <div id="client__anchor"></div>
      </div>
    </div>

    <div class="client__input">
      <textarea class="neu__element--inset" v-on:keyup="handleKeyup" v-model="input" />
      <span class="button button--block" @click=sendMessage>send</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
          let prepend = evt.data.charAt(0);
          if( prepend !== 'p') {
            let messageText = evt.data.slice(1).replace(/[\n\r]/g, '<br />');;
            component.messageBuffer.push(messageText);
          }
        }
      }
    }
  }
</script>

<style>
  .client {
    max-height: 650px;
    font-family: 'Courier Prime';
    flex-direction: column;
  }

  .client__buffer {
    padding: 1em;
    max-height: 400px;
    overflow-y: scroll;
    border-radius: 5px;
  }

  .client__input {
    width: 100%;
    height: 100px;
  }

  .client__input textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    margin: 0;
    border: none;
    margin: .5em 0;
  }

   .client__input textarea:focus {
    outline: none;
    border: none;
    background: var(--main-bg-lighter);
  }

  #client__scroller * {
    overflow-anchor: none;
  }

  #client__anchor {
   overflow-anchor: auto;
   height: 1px;
  }

  .client__message {
    margin: .25em;
  }
</style>