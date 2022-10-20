# Next.js Pusher chat app
- Serverless Functions on Vercel are stateless and have a maximum execution duration. As a result, it is not possible to maintain a WebSocket connection to a Serverless Function.
- While you cannot maintain a persistent connection to a Serverless Function, it is possible to use a third-party service, such as Pusher Channels, to enable realtime communication for your app.
- Vercel에 배포 시 WebSocket이 지원하지 않으므로, Pusher을 추가하여 WebSocket을 통신을 연결한다.
- [`Vercel guide`](https://vercel.com/guides/do-vercel-serverless-functions-support-websocket-connections)

## How to use
```bash
npm i
```

```bash
npm run dev
```

#### make `.env` file
```javascript
PUSHER_APP_ID = YOUR_PUSHER_APP_ID
PUSHER_APP_KEY = YOUR_PUSHER_APP_KEY
NEXT_PUBLIC_KEY = YOUR_PUSHER_APP_KEY
PUSHER_APP_SECRET = YOUR_PUSHER_APP_SECRET
PUSHER_APP_CLUSTER = YOUR_PUSHER_APP_CLUSTER
```