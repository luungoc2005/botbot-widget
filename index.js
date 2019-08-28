import { render, h } from 'preact';
import { App } from './App';

let rendered = false;
const defaultProps = {
  url: null,
  welcomeMessage: defaultWelcomeMessageProps,
  buttonIcon: 'https://dashboard.botbot.ai/assets/d16f4ba438e1cab71d86520c31ea1a29.png',
  iframeStyle: {},
}
export const defaultWelcomeMessageProps = {
  title: 'BotBot.AI',
  message: '👋 Hi, let me know if I can help!',
  delay: 2000,
  speed: 180,
}
window.BotBot = {
  render: (props) => {
    const { welcomeMessage, url } = {...defaultProps, ...props};
    const { speed } = welcomeMessage || defaultWelcomeMessageProps;

    if (!url) console.error('BotBot URL unspecified');

    const css = `
    .botbot-chat-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }
    .botbot-chat-widget *, .botbot-chat-widget *::before, .botbot-chat-widget *::after {
      box-sizing: border-box;
    }
    .botbot-chat-widget .chat-content.show {
      display: block;
    }
    .botbot-chat-widget .msg-button.show {
      background: #f5f5f5;
    }
    .botbot-chat-widget .msg-button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: block;
      padding: 15px;
      border: 0;
      box-shadow: 0 4px 5px #ddd, 4px 0 5px #ddd;
      cursor: pointer;
      outline: none;
    }
    .botbot-chat-widget .msg-button img {
      max-width: 100%;
    }
    .botbot-chat-widget .msg-button:hover {
      opacity: 0.9;
    }
    .botbot-chat-widget .chat-content {
      display: none;
      position: absolute;
      bottom: calc(100% + 20px);
      right: 0;
      box-shadow: 0 4px 5px #ddd;
      background: white;
    }
    .botbot-chat-widget .notify-bubble {
      opacity: 0;
      pointer-events: none;
      max-width: 500px;
      min-width: 280px;
      background-color: white;
      box-shadow: 0 4px 5px #ddd;
      border-radius: 10px;
      position: absolute;
      bottom: calc(100% + 23px);
      right: 0;
      padding: 20px;
      font-family: sans-serif;
      cursor: pointer;
      user-select: none;
      transform: translateY(40px);
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
    }`
    
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