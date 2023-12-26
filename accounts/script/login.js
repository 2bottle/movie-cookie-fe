document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("http://127.0.0.1:8000/accounts/login/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("Response Data:", data);
            if (data.access_token) {
                // 로그인 성공 시 액세스 및 리프레시 토큰을 로컬 스토리지에 저장
                localStorage.setItem("access", data.access_token);
                localStorage.setItem("refresh", data.refresh_token);
                window.location.href = "/accounts/mypage/index.html";
            } else {
                alert("아이디 또는 패스워드가 일치하지 않습니다.");
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
});
