const datas = [
  //   {
  // userID: 1,
  // userName: "",
  // postingId: 1,
  // postingTitle: "",
  // postingContent: "",
  //   },
];

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
    } else if (request.url === "/data") {
      //users 객체에서 id와 name 데이터를 뽑고
      //posts 객체에서 id, title content 데이터를 가져와서
      //객체 한 묶음에 표시한다.
      // data 배열을 만들고 하나씩 push 한다.
      let body = "";
      // data가 stream 형태로 들어온다.
      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        for (let i = 0; i < posts.length; i++) {
          //postlength 배열 개수만큼 반복
          if (users[i].id === posts[i].id) {
            // user[i]의 Id와 post[i]의 userid 값이 같을 경우 실행
            datas.push({
              userID: users[i].id,
              userName: users[i].name,
              postingId: posts[i].id,
              postingTitle: posts[i].title,
              postingContent: posts[i].content,
            });
          }
        }

        response.writeHead(201, { "Content-Type": "application/json" }); // (4)
        response.end(JSON.stringify({ data: datas })); // (5)
      });
    }
  } else if (request.method === "POST") {
    if (request.url === "/users") {
      let body = "";
      // data가 stream 형태로 들어온다.
      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const user = JSON.parse(body);
        users.push({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
        });

        response.writeHead(201, { "Content-Type": "application/json" }); // (4)
        response.end(JSON.stringify({ message: users })); // (5)
      });
    } else if (request.url === "/posts") {
      let body = "";
      // data가 stream 형태로 들어온다.
      request.on("data", (data) => {
        body += data;
      });
      request.on("end", () => {
        const post = JSON.parse(body);

        posts.push({
          id: post.id,
          title: post.title,
          content: post.content,
          userId: post.userId,
        });

        response.writeHead(201, { "Content-Type": "application/json" }); // (4)
        response.end(JSON.stringify({ message: posts })); // (5)
      });
    }
  } else if (request.method === "PATCH") {
    // "PATCH" 업데이트
    if (request.url === "/update") {
      // posts안의 postingId 값이 1인 값 "노드"로 수정
      // 수정한 값을 data 배열안에 push()
      let body = "";
      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const update = JSON.parse(body);
        const updateId = update.postingId; //ID값은 1
        // body값을 가져와서 postingId와 값이 같다면 내용을 수정하고 출력.
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === updateId) {
            posts[i].content = update.data;

            datas.push({
              userID: users[i].id,
              userName: users[i].name,
              postingId: posts[i].id,
              postingTitle: posts[i].title,
              postingContent: posts[i].content,
            });
          }
        }

        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ data: datas }));
      });
    }
  } else if (request.method === "DELETE") {
    // "DELETE" 업데이트
    if (request.url === "/delete") {
      let body = "";
      request.on("data", (data) => {
        body += data;
      });

      request.on("end", () => {
        const deletePostId = JSON.parse(body);

        for (let dleteIndex = 0; dleteIndex < posts.length; dleteIndex++) {
          if (posts[dleteIndex].id === deletePostId.id) {
            posts.splice(dleteIndex, 1);
          }
        }
        response.writeHead(201, { "Content-Type": "application/json" });
        response.end(JSON.stringify({ message: "postingDeleted" }));
      });
    }
  }
};

server.on("request", httpRequestListener); // server 객체에 이벤트 등록

server.listen(8000, "127.0.0.1", function () {
  // (7)
  console.log("Listening to requests on port 8000");
});
