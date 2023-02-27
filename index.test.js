import { jest } from '@jest/globals';
import { EmojiNetworkLog } from "./index";

beforeEach(() => EmojiNetworkLog.enable({ timingLevel: `fast` }));
afterEach(() => EmojiNetworkLog.disable());

test(`logs fetch request`, async () => {
  const original = console.log;
  jest.spyOn(console, `log`).mockImplementation((...args) => {
    expect([`🚀`, `🐇`, `🐢`].includes(args[0])).toBeTruthy();
    expect(args[1]).toEqual(`GET`);
    expect(args[2]).toEqual(`https://google.com`);
    expect(/\d+ms/.test(args[3])).toBeTruthy()
    expect(args[4]).toEqual(`✅ 200`);
    original(...args);
  });

  await fetch(`https://google.com`);
  expect(console.log).toHaveBeenCalled();
});