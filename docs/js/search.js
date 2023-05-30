// 검색 버튼 클릭 이벤트 핸들러
document.querySelector(".search img").addEventListener("click", function() {
    var searchTerm = document.querySelector(".search input").value;
    searchBooks(searchTerm);
});

// 도서 검색 함수
function searchBooks(searchTerm) {
    fetch("./assets/book/book.json") // book.json 파일 경로를 지정해야 합니다.
        .then(response => response.json())
        .then(data => {
            var searchResults = data.filter(book => book.TITLE.includes(searchTerm));
            displaySearchResults(searchResults);
        })
        .catch(error => {
            console.error("Error fetching book data:", error);
        });
}

// 검색 결과 출력 함수
function displaySearchResults(results) {
if (results.length === 0) {
    alert("결과가 없습니다.");
} else {
    var searchResultsElement = document.getElementById("search-results");
    searchResultsElement.innerHTML = "";

    var searchResultContainer = document.createElement("div");

    results.forEach(book => {
        var bookInfo = document.createElement("div");

        var bookImage = document.createElement("img");
        bookImage.src = book.URL;
        bookImage.classList.add("booksearch-image"); // 새로 추가된 CSS 클래스
        bookInfo.appendChild(bookImage);
        var bookTitle = document.createElement("h2");
        bookTitle.textContent = "제목: " + book.TITLE;
        bookInfo.appendChild(bookTitle);

        var bookIssuedDate = document.createElement("p");
        bookIssuedDate.textContent = "발행일: " + book.ISSUEDDATE;
        bookInfo.appendChild(bookIssuedDate);

        var bookLocalId = document.createElement("p");
        bookLocalId.textContent = "로컬 ID: " + book.LOCALID;
        bookInfo.appendChild(bookLocalId);

        

        searchResultContainer.appendChild(bookInfo);
    });

    searchResultsElement.appendChild(searchResultContainer);
}
}