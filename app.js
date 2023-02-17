const users = [
  {
    id: 1,
    name: "Rebekah Johnson",
    email: "Glover12345@gmail.com",
    password: "123qwe",
  },
  {
    id: 2,
    name: "Fabian Predovic",
    email: "Connell29@gmail.com",
    password: "password",
  },
];

const posts = [
  {
    id: 1,
    title: "간단한 HTTP API 개발 시작!",
    content: "Node.js에 내장되어 있는 http 모듈을 사용해서 HTTP server를 구현",
    userId: 1,
  },
  {
    id: 2,
    title: "HTTP의 특성",
    content: "Request/Response와 Stateless!!",
    userId: 1,
  },
];

const http = require("http"); // http built-in module 호출

const server = http.createServer(); // HTTP server 객체 생성

const httpRequestListener = (request, response) => {
  // HTTP 요청 처리 함수 작성
  if (request.method === "GET") {
    if (request.url === "/ping") {
      response.writeHead(200, { "Content-Type": "application/json" }); // (4)
      response.end(JSON.stringify({ message: "pong!" }));
    }
  } else if (request.method === "POST") {
    if (request.url === "/users") {
      response.writeHead(200, { "Content-Type": "application/json" }); // (4)
      response.end(JSON.stringify({ message: "userCreated" }));
      // // data가 stream 형태로 들어온다.
    }
  }
};

server.on("request", httpRequestListener); // server 객체에 이벤트 등록

server.listen(8000, "127.0.0.1", function () {
  // (7)
  console.log("Listening to requests on port 8000");
});
