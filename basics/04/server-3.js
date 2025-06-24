const http = require("http"); // 내장 http 모듈 로드

const server = http.createServer((req, res) => {
    res.setHeader("Content-type", "text/plain"); // 헤더 설정 (텍스트 응답)
    res.write("Hello Node"); // 본문 응답
    res.end(); // 응답 종료
});

server.listen(3000, () => {
    console.log("서버가 실행 중...");
});
