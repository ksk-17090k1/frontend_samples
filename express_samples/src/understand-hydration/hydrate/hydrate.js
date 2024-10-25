// hydrationするとブラウザに以下のようなJavaScriptが送られる！
// 中身を見てみるとJavaScriptというよりHTMLで、元のHTMLの末尾にscriptタグが追加されているだけぽい。
// このHTMLとReactのDOMに差分があるとhydration errorが起こると思われる

// TODO: なぜかブラウザ側でエラーが出てイベントハンドラが動かないので直す

// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <title>Static Server-side-rendered App with Hydration</title>
//   </head>
//   <body>
//     <div>Hello World!</div>
//   </body>
// </html>
// <script src="/main.js" async=""></script>
