export class EmojiNetworkLog {
  static slow = `🐢`;
  static average = `🐇`;
  static fast = `🚀`;
  static slowThreshold = 1000;
  static averageThreshold = 500;
  static fastThreshold = 150;
  static info = `🧠`;
  static success = `✅`;
  static redirect = `🔁`;
  static bad = `❌`;
  static error = `🔥`;
  static cancelled = `❓`;
  static #enabled = false;

  static enable(options = {}) {
    Object.assign(EmojiNetworkLog, options);
    const emojiLog = new EmojiNetworkLog();
    emojiLog.#monitorXhr();
    emojiLog.#monitorFetch();
    EmojiNetworkLog.#enabled = true;
  }

  static disable() {
    EmojiNetworkLog.#enabled = false;
  }

  #monitorXhr() {
    if (XMLHttpRequest._emojiNetworkLogEnabled) {
      return;
    }

    XMLHttpRequest._emojiNetworkLogEnabled = true;

    const origOpen = XMLHttpRequest.prototype.open;
    const self = this;
    XMLHttpRequest.prototype.open = function () {
      const start = new Date();
      const url = arguments[1];
      this.addEventListener(`load`, () => {
        const end = new Date().getTime() - start.getTime();
        self.#logTiming(url, end, this.status);
      });
      origOpen.apply(this, arguments);
    };
  }

  #monitorFetch() {
    if (window.fetch._emojiNetworkLogEnabled) {
      return;
    }

    window.fetch._emojiNetworkLogEnabled = true;
    
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const start = new Date();
      const url = args[0];
      const resp = await originalFetch(...args);
      const end = new Date().getTime() - start.getTime();

      this.#logTiming(url, end, resp.status);

      return resp;
    }
  }

  #logTiming(url, end, statusCode) {
    if (!EmojiNetworkLog.#enabled) {
      return;
    }

    const status = this.#statusEmoji(statusCode);
    if (end <= EmojiNetworkLog.fastThreshold) {
      console.log(url, EmojiNetworkLog.fast, `${end}ms`, `${status} ${statusCode}`);
    } else if (end <= EmojiNetworkLog.averageThreshold) {
      console.log(url, EmojiNetworkLog.average, `${end}ms`, `${status} ${statusCode}`);
    } else {
      console.log(url, EmojiNetworkLog.slow, `${end}ms`, `${status} ${statusCode}`);
    }
  }
  
  // eslint-disable-next-line complexity
  #statusEmoji(status) {
    if (status < 100) {
      return EmojiNetworkLog.cancelled;
    } else if (status < 200) {
      return EmojiNetworkLog.info;
    } else if (status < 300) {
      return EmojiNetworkLog.success;
    } else if (status < 400) {
      return EmojiNetworkLog.redirect;
    } else if (status < 500) {
      return EmojiNetworkLog.bad;
    } else if (status < 600) {
      return EmojiNetworkLog.error;
    }
    return ``;
  } 
}