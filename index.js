import { render, h } from 'preact';
import { App } from './App';

let rendered = false;

const defaultProps = {
  url: null,
  welcomeMessage: defaultWelcomeMessageProps,
  buttonIcon: require('./chatbot.gif'),
  iframeStyle: {},
  position: {
    top: undefined,
    left: undefined,
    bottom: 20,
    right: 50,
  }
}

export const defaultWelcomeMessageProps = {
  buttonText: 'Gửi tin nhắn cho Sari',
  message: 'Xin chào! Mình là Sari - trợ lý ảo Sacombank. Mình có thể giúp gì cho bạn',
  delay: 500,
  speed: 180,
}

window.BotBot = {
  render: (props) => {
    const { welcomeMessage, url, position } = {...defaultProps, ...props};
    const { speed } = welcomeMessage || defaultWelcomeMessageProps;

    if (!url) console.error('BotBot URL unspecified');

    const css = `
.botbot-chat-widget {
  position: fixed;
  ${position.top ? "top: " + position.top + "px;" : ""}
  ${position.left ? "left: " + position.left + "px;" : ""}
  ${position.bottom ? "bottom: " + position.bottom + "px;" : ""}
  ${position.right ? "right: " + position.right + "px;" : ""}
  z-index: 1006;
}
.botbot-chat-widget *, .botbot-chat-widget *::before, .botbot-chat-widget *::after {
  box-sizing: border-box;
}
.botbot-chat-widget .chat-content.show {
  display: block;
}
.botbot-chat-widget .msg-button {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: visible;
  display: block;
  border: 0;
  cursor: pointer;
  outline: none;
  background-color: transparent;
}
.botbot-chat-widget .msg-button img {
  width: 100px;
  height: 100px;
}
.botbot-chat-widget .msg-button:hover {
  opacity: 0.9;
}
.botbot-chat-widget .chat-content {
  display: none;
  position: absolute;
  bottom: 100%;
  right: 0;
  box-shadow: 0 1px 2px #ddd;
  background: white;
  height: 520px;
  width: 360px;
  max-height: calc(100vh - ${position.top || (position.bottom ? position.bottom + 100 : 200)}px - 50px);
  border-radius: 15px;
  overflow: hidden;
}
.botbot-chat-widget .chat-content .minimize-button {
  position: absolute;
  top: 28px;
  right: 20px;
  width: 15px;
  height: 2px;
  background: white;
  border-radius: 1px;
  opacity: 1;
  cursor: pointer;
  border: 0;
  outline: none;
}
.botbot-chat-widget .chat-content .minimize-button:hover {
  opacity: .5;
}
.botbot-chat-widget .notify-bubble {
  border-radius: 15px;
  opacity: 0;
  pointer-events: none;
  width: 360;
  background-color: white;
  box-shadow: 0 1px 2px #ddd;
  position: absolute;
  bottom: calc(100% + 23px);
  right: 0;
  cursor: pointer;
  user-select: none;
  transform: translateY(40px);
  overflow: hidden;
}
.botbot-chat-widget .notify-bubble.show {
  opacity: 100;
  pointer-events: auto;
  transition: opacity ${speed}ms ease-out, transform ${speed}ms ease-out;
  transform: translateX(0);
}
.botbot-chat-widget .notify-bubble span {
  color: #666;
  font-size: .8em;
}
.botbot-chat-widget .notify-bubble p {
  margin-top: 10px;
}
@media only screen and (max-width: 480px) {
  .botbot-chat-widget {
    bottom: 0px;
    right: 16px;
  }
  .botbot-chat-widget .chat-content {
    position: fixed;
    top: 4px;
    right: 4px;
    bottom: ${position.top ? position.top + 8 : position.bottom ? position.bottom + 88 : 108}px;
    width: 98vw;
    max-width: 360px;
    height: initial;
    max-height: initial;
    z-index: 200;
  }
  .botbot-chat-widget .chat-content iframe {
    width: 100%;
    height: 100%;
    max-width: initial;
  }
}
    `
    
    if (!rendered) {
      const styleTag = document.createElement('style');
      styleTag.innerHTML = css;
      document.head.appendChild(styleTag);
    }
  
    if (!document.querySelectorAll('.botbot-chat-widget').length) {
      const container = document.createElement('div');
      container.className = 'botbot-chat-widget';
      document.body.appendChild(container);

      render(<App {...defaultProps} {...props} />, container);
    }

    rendered = true;
  }
}
