# EmojiNetworkLog

Visually scan network activity in your browser console logs using the power of emojis 🐢 🐇 🚀. Works with both `fetch` and `XMLHttpRequest` calls.

## Usage

```js
EmojiNetworkLog.enable({
  slow: `🐢`,
  average: `🐇`,
  fast: `🚀`,
  slowThreshold: 1000,
  averageThreshold: 500,
  fastThreshold: 150,
  info: `🧠`,
  success: `✅`,
  redirect: `🔁`,
  bad: `❌`,
  error: `🔥`,
  cancelled: `❓`,
});

// To turn it off
EmojiNetworkLog.disable();
```

## Installation
Installation is done using `npm` or `yarn`:

```bash
npm install emoji-network-log
# OR with yarn
yarn add emoji-network-log
```

## Contributing
Contribution directions go here.

## License
The gem is available as open source under the terms of the [MIT License](https://opensource.org/licenses/MIT).
