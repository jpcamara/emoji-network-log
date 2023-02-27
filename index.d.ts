export class EmojiNetworkLog {
  static slow: string;
  static average: string;
  static fast: string;
  static slowThreshold: number;
  static averageThreshold: number;
  static fastThreshold: number;
  static info: string;
  static success: string;
  static redirect: string;
  static bad: string;
  static error: string;
  static cancelled: string;
  static invalid: string;
  static timingLevel: `slow` | `average` | `fast`;
  static statusLevel: `info` | `success` | `redirect` | `bad` | `error` | `cancelled`;

  static enable(options: { 
    slow?: string;
    average?: string;
    fast?: string;
    slowThreshold?: number;
    averageThreshold?: number;
    fastThreshold?: number;
    info?: string;
    success?: string;
    redirect?: string;
    bad?: string;
    error?: string;
    cancelled?: string;
    invalid?: string;
    timingLevel?: `slow` | `average` | `fast`;
    statusLevel?: `info` | `success` | `redirect` | `bad` | `error` | `cancelled`;
  } = {}): void;

  static disable(): void;
}