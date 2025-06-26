const methodOverride = require("method-override");

// express 모듈 불러오기
const express = require("express");

// MongoDB 연결 함수 불러오기 (dbConnect.js에서 정의된 함수)
const dbConnect = require("./config/dbConnect");

// express 애플리케이션 생성
const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static("./public"));

app.use(methodOverride("_method"));

// MongoDB 연결 실행
dbConnect();

// 클라이언트 요청에서 JSON 형식의 body 데이터를 파싱하기 위한 미들웨어
app.use(express.json());

// 클라이언트 요청에서 x-www-form-urlencoded 형식의 body 데이터를 파싱하기 위한 미들웨어
app.use(express.urlencoded({ extended: true }));

// '/contacts' 경로로 들어오는 요청을 contactRoutes에서 처리
app.use("/contacts", require("./routes/contactRoutes"));

// 포트 3000번에서 서버 실행
app.listen(3000, () => {
  console.log("서버 실행 중...");
});
