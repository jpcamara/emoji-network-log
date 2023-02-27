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
  static invalid = `👺`;
  static timingLevel = `slow`;
  static statusLevel = `bad`;
  static #timingPriority = [`invalid`, `slow`, `average`, `fast`];
  static #statusPriority = [`invalid`, `error`, `bad`, `redirect`, `success`, `info`, `cancelled`];
  static #enabled = false;
  static #patched = false;

  static enable(options = {}) {
    Object.assign(EmojiNetworkLog, options);
    const emojiLog = new EmojiNetworkLog();
    emojiLog.#monitorXhr();
    emojiLog.#monitorFetch();
    EmojiNetworkLog.#enabled = true;
    EmojiNetworkLog.#patched = true;
  }

  static disable() {
    EmojiNetworkLog.#enabled = false;
  }

  #monitorXhr() {
    if (!globalThis.XMLHttpRequest) {
      return;
    }

    if (EmojiNetworkLog.#patched) {
      return;
    }

    const origOpen = XMLHttpRequest.prototype.open;
    const self = this;
    XMLHttpRequest.prototype.open = function () {
      const start = new Date();
      const requestType = arguments[0];
      const url = arguments[1];
      this.addEventListener(`load`, () => {
        const end = new Date().getTime() - start.getTime();
        self.#logRequest(requestType, url, end, this.status);
      });
      origOpen.apply(this, arguments);
    };
  }

  #monitorFetch() {
    if (EmojiNetworkLog.#patched) {
      return;
    }
    
    const originalFetch = globalThis.fetch;
    globalThis.fetch = async (...args) => {
      const start = new Date();
      const url = args[0];
      const options = args[1] || { method: `GET` };
      const resp = await originalFetch(...args);
      const end = new Date().getTime() - start.getTime();

      this.#logRequest(options.method, url, end, resp.status);

      return resp;
    }
  }

  #logRequest(requestType, url, end, statusCode) {
    if (!EmojiNetworkLog.#enabled) {
      return;
    }

    const status = this.#statusType(statusCode);
    const timing = this.#timingType(end);
    const timingLevel = EmojiNetworkLog.#timingPriority.indexOf(EmojiNetworkLog.timingLevel);
    const statusLevel = EmojiNetworkLog.#statusPriority.indexOf(EmojiNetworkLog.statusLevel);
    const foundTimingLevel = EmojiNetworkLog.#timingPriority.indexOf(timing);
    const foundStatusLevel = EmojiNetworkLog.#statusPriority.indexOf(status);

    if (foundStatusLevel <= statusLevel || foundTimingLevel <= timingLevel) {
      console.log(EmojiNetworkLog[timing], requestType, url, `${end}ms`, `${EmojiNetworkLog[status]} ${statusCode}`);
    }
  }

  #timingType(time) {
    if (time <= EmojiNetworkLog.fastThreshold) {
      return `fast`;
    } else if (time <= EmojiNetworkLog.averageThreshold) {
      return `average`;
    } else if (time > EmojiNetworkLog.averageThreshold) {
      return `slow`;
    }
    return `invalid`;
  }
  
  // eslint-disable-next-line complexity
  #statusType(status) {
    if (status < 100) {
      return `cancelled`;
    } else if (status < 200) {
      return `info`;
    } else if (status < 300) {
      return `success`;
    } else if (status < 400) {
      return `redirect`;
    } else if (status < 500) {
      return `bad`;
    } else if (status < 600) {
      return `error`;
    }
    return `invalid`;
  } 
}