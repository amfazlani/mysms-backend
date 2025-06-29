declare module 'actioncable' {
  export interface Cable {
    subscriptions: any;
    // add other properties if you want more typings
  }
  export function createConsumer(url?: string): Cable;
}
