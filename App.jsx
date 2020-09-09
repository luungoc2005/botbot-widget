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
    const { buttonText, message } = {...defaultWelcomeMessageProps, ...(welcomeMessage || {})};

    return <div>
      {showWelcomeMessage && <div 
        class={`notify-bubble ${showBubble && 'show'}`} 
        onclick={this.handleToggleChatWidget}
      >
        <div
          style={{
            padding: '24px 82px 24px 10px',
            whiteSpace: 'nowrap',
          }}
        >
          <img
            style={{
              display: 'inline-block',
              width: 32,
              height: 32,
            }}
            src={require('./avatar20200810.png')}
          />
          <div
            dangerouslySetInnerHTML={{ __html: message }}
            style={{
              marginLeft: 5,
              padding: '8px 20px 8px 20px',
              background: '#E5E5E5',
              color: '#373737',
              borderRadius: '24px 24px 24px 4px',
              display: 'inline-block',
              whiteSpace: 'initial',
            }}
          />
        </div>
        <div
          style={{
            background: '#F4F4F4',
            padding: '8px 32px',
          }}
        >
          <div style={{
              padding: '18px 32px',
              background: '#0058A0',
              borderRadius: 30,
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <span style={{ margin: '5px 0px', color: 'white', fontSize: 16 }}>
              {buttonText}
            </span>
            <svg style={{ marginLeft: 12 }} width="37" height="23" viewBox="0 0 37 23" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.4434 0.500571C11.4434 0.137743 11.8177 -0.104281 12.1485 0.0446109L35.8653 10.7171C36.2583 10.894 36.2583 11.4522 35.8653 11.6291L12.1485 22.3016C11.8177 22.4505 11.4434 22.2084 11.4434 21.8456V13.0807L31.7915 11.1731L11.4434 9.26546V0.500571Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.40433 1.3645C5.5759 1.3645 4.90433 2.03607 4.90433 2.8645V3.13405C4.90433 3.96248 5.5759 4.63405 6.40433 4.63405H8.30865C9.13708 4.63405 9.80865 3.96248 9.80865 3.13405V2.8645C9.80865 2.03607 9.13708 1.3645 8.30865 1.3645H6.40433ZM0 11.0384C0 10.21 0.671573 9.53838 1.5 9.53838H8.30866C9.13708 9.53838 9.80865 10.21 9.80865 11.0384V11.3079C9.80865 12.1364 9.13708 12.8079 8.30865 12.8079H1.5C0.671573 12.8079 0 12.1364 0 11.3079V11.0384ZM4.90433 19.2123C4.90433 18.3838 5.5759 17.7123 6.40433 17.7123H8.30865C9.13708 17.7123 9.80865 18.3838 9.80865 19.2123V19.4818C9.80865 20.3102 9.13708 20.9818 8.30865 20.9818H6.40433C5.5759 20.9818 4.90433 20.3102 4.90433 19.4818V19.2123Z" fill="white"/>
</svg>
          </div>
        </div>
      </div>}
      <div class={`chat-content ${showWidget && 'show'}`} aria-expanded={showWidget}>
        {iframeMounted && <iframe 
          id='botbot-iframe'
          src={url}
          allowfullscreen={true}
          style={{
            border: 0,
            width: '100%',
            height: '100%',
            ...iframeStyle,
          }}
        />}
        <button 
          class="minimize-button"
          onClick={this.handleToggleChatWidget}
        />
      </div>
      <button 
        class={`msg-button ${showWidget && 'show'}`}
        onclick={this.handleToggleChatWidget}
      >
        <img src={buttonIcon} alt="" />
      </button>
    </div>
  }
}
