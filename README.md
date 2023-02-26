# EmojiNetworkLog

Visually scan network activity in your browser console logs using the power of emojis 🐢 🐇 🚀. Works with both `fetch` and `XMLHttpRequest` calls.

Inspired by an episode of the Syntax podcast.

> I wrote this really nice little handy middleware... that analyzes all my requests as they go, just timing them - and based on how long the request takes it gives me different emoji. So if the request is really fast it's a 🚀, if it's kinda fast it's a 🐇, if it's slow it's a 🐢. ...In my console while I'm just browsing the site I can just see - and it has what type of request, what path it was too, and it's just like at a glance I can see - 'oh I'm in turtle time right now - these requests to this page are all slow for some reason let me take a look'
>
> Scott Talinsky
> Syntax Podcast, Episode 570 - https://syntax.fm/show/570/node-js-cjs-esm

## Usage

`EmojiNetworkLog` hooks into `fetch` and `XMLHttpRequest`, logging timing, status and request type. Timing and http status code are logged with configurable emojis so you can quickly scan your console to see how your requests are performing and investigate. Never miss "turtle time" requests again 🐢.

```js
// Enable emoji logs
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

// The following requests will automatically log information about each request for quick scanning
await fetch(`/found-average-speed`, { method: `POST` })
// POST /found-average-speed 🐇 400ms ✅ 200

await fetch(`/not-found-slowly`)
// GET /not-found-slowly 🐢 1022ms ❌ 404

await fetch(`/error-but-fast`, { method: `DELETE` })
// DELETE /error-but-fast 🚀 150ms 🔥 500

await fetch(`/redirect-average-speed`)
// GET /redirect-average-speed 🐇 400ms ❌ 302

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
