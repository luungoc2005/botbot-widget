## Webchat Widget for BotBot

1. Basic Usage

```javascript
<html>

<body>
  <script src="/botbot-widget.js"></script>
  <script>
    BotBot.render({
      url: "https://webchat.botbot.ai/"
    });
  </script>
</body>

</html>
```

Where `botbot-widget.js` is the built JS file and URL of your choosing

2. Customizing the Welcome Message

Inside 
```javascript
  BotBot.render({
    url: "https://webchat.botbot.ai/"
  });
```

To **disable** the welcome message:

```javascript
  BotBot.render({
    url: "https://webchat.botbot.ai/",
    welcomeMessage: false
  });
```

To **customize** the welcome message:
```javascript
  BotBot.render({
    url: "https://webchat.botbot.ai/",
    welcomeMessage: {
      title: 'BotBot.AI',
      message: '👋 Hi, let me know if I can help!',
      delay: 2000,
      speed: 180
    }
  });
```

3. Customizing the button icon:

```javascript
  BotBot.render({
    url: "https://webchat.botbot.ai/",
    buttonIcon: 'https://dashboard.botbot.ai/assets/d16f4ba438e1cab71d86520c31ea1a29.png'
  });
```

4. Customizing the iframeStyle style:
```javascript
  BotBot.render({
    url: "https://webchat.botbot.ai/",
    iframeStyle: {
      maxWidth: "400px",
      width: "400px"
    }
  });
```