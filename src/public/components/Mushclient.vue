<template>
  <div class="client">
    <div class="client__buffer neu__element--inset">
      <div id="client__scroller">
        <div class="client__messages" v-for="message in messageBuffer">
          <pre v-html="message" /> 
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
var Convert = require('ansi-to-html');

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
        this.converter = new Convert();    

        this.socket.onopen = function(evt) {
          component.messageBuffer.push("Connecting...")
        };

        this.socket.onerror = function (evt) {
          component.messageBuffer.push("There was an error connecting to the game server.  It may be down!");
        };

        this.socket.onclose = function (evt) {
          component.messageBuffer.push("Connection closed.");
        };

        this.socket.onmessage = function(evt) {
          let prepend = evt.data.charAt(0);

          if( prepend !== 'p') {
            let messageText = evt.data.slice(1);
            // Escaping < and > 
            messageText = messageText.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');            
            
            // Converting carriage returns
           // messageText = messageText.replace(/[\n\r]/g, '<br />');

            // Enabling ansi          
            messageText = component.converter.toHtml(messageText);
           
            component.messageBuffer.push(messageText);
          } 
          console.log( evt.data);
        }
      }
    }
  }
</script>

<style>
  .client {
    width: 800px;
    max-width: 800px;
    height: 600px;
    max-height: 720px;
    font-family: 'Courier Prime', monospace;
    flex-direction: column;
  }

  .client pre {
    margin: 0;
    padding: 0;
    font-size: 14px;
    overflow-x: auto;
    white-space: pre-wrap;
    white-space: -moz-pre-wrap;
    white-space: -pre-wrap;
    white-space: -o-pre-wrap;
    word-wrap: break-word;
  }

  .client__buffer {
    padding: 1em;
    height: 100%;
    max-height:100%;
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
    margin: 0;
  }
</style>