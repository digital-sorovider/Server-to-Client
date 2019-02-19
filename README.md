# Server-to-Client
* Webクライアントが指定したポート(プロトコル)がサーバー側でLISTEN状態かどうかを確認できる
* 画面上の動きなどは全クライアント間で同期される

### 言語・ライブラリ
* Node.js
* jQuery

### 対応OS
* Windows
* Linux

### セットアップ～起動
* Node.jsインストール(参考)
 https://qiita.com/daskepon/items/16a77868d38f8e585840
 
* Gitインストール(参考)
https://qiita.com/noraworld/items/8546c44d1ec6d739493f
 
* 任意のディレクトリで
  1.  `$ git clone https://github.com/rusian0/Server-to-Client.git`
  2. `$ cd Server-to-Client`
  3. `$ node app.js`
 
### 使用方法
 ブラウザでhttp://server-ip:3000
 にアクセス
 * ポート番号入力
 * プロトコル選択
 
これでサーバー側のポートの状態が表示されます

#### テストサーバーの使用方法
* 引数に指定した番号をListenします
 * `$ node sample-server/tcp.js 8080` 
 又は 
  * `$ node sample-server/udp.js 9987`
  などのように使ってみてください
