import { Component, h, Fragment } from 'preact';
import { defaultWelcomeMessageProps } from './index';

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showBubble: false,
      showWidget: false,
      iframeMounted: false,
    }
    this.handleToggleChatWidget = this.handleToggleChatWidget.bind(this);
  }

  componentDidMount() {
    const { welcomeMessage } = this.props;
    const { delay } = {...defaultWelcomeMessageProps, ...(welcomeMessage || {})}
    this.notifyBubbleTimeout = setTimeout(() => {
      this.setState({ showBubble: true })
    }, delay || 2000);
  }

  componentWillUnmount() {
    if (this.notifyBubbleTimeout) {
      clearTimeout(this.notifyBubbleTimeout);
    }
  }

  handleToggleChatWidget() {
    if (this.notifyBubbleTimeout) {
      clearTimeout(this.notifyBubbleTimeout);
    }
    this.setState({ 
      showWidget: !this.state.showWidget,
      showBubble: false,
      iframeMounted: true,
    })
  }

  render() {
    const { showBubble, showWidget, iframeMounted } = this.state;
    const { 
      url,
      welcomeMessage,
      buttonIcon,
      iframeStyle,
    } = this.props;
    
    const showWelcomeMessage = Boolean(welcomeMessage)
    const { title, message } = {...defaultWelcomeMessageProps, ...(welcomeMessage || {})};

    return <Fragment>
      {showWelcomeMessage && <div 
        class={`notify-bubble ${showBubble && 'show'}`} 
        onclick={this.handleToggleChatWidget}
      >
        <span>{title}</span>
        <p>{message}</p>
      </div>}
      <div class={`chat-content ${showWidget && 'show'}`} aria-expanded={showWidget}>
        {iframeMounted && <iframe 
          id='botbot-iframe'
          src={url}
          allowfullscreen={true}
          style={{
            maxWidth: '500px',
            width: '90vw',
            height: '520px',
            border: 0,
            ...iframeStyle,
          }}
        />}
      </div>
      <button 
        class={`msg-button ${showWidget && 'show'}`}
        onclick={this.handleToggleChatWidget}
      >
        <img src={buttonIcon} alt="" />
      </button>
    </Fragment>
  }
}