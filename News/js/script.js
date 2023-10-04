// Your API key and input query
const apiKey = 'a13d2ccbcd9f45d98699f485b9cd2b55';
const input = 'india'; // Replace with your desired search query
const pageSize = 10; // Number of news cards per page
let currentPage = 1; // Current page number

// Function to fetch news data
async function fetchNews(input, page) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching news data:', error);
        return null;
    }
}

// Function to change the current page and update the news display
async function changePage(page) {
    currentPage = page;
    try {
        const newsData = await fetchNews(input, currentPage);
        displayNews(newsData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Function to display news data and pagination
function displayNews(data) {
    const newsContainer = document.getElementById('news-container');
    
    if (data && data.status === 'ok' && data.articles) {
        // Calculate the range of articles to display
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const newsData = data.articles.slice(startIndex, endIndex);

        // Clear previous news cards and pagination
        newsContainer.innerHTML = '';
        const paginationContainer = document.getElementById('pagination');
        paginationContainer.innerHTML = '';

        // Generate and display news cards
        newsData.forEach((article, index) => {
            const card = createNewsCard(article);
            if (index % 2 === 0) {
                // Create a new row for every two cards
                const row = document.createElement('div');
                row.className = 'row mb-2';
                row.appendChild(card);
                newsContainer.appendChild(row);
            } else {
                // Add the card to the last row
                const lastRow = newsContainer.lastChild;
                lastRow.appendChild(card);
            }
        });

        // Generate and display pagination buttons
        const totalPages = Math.ceil(data.articles.length / pageSize);
        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('li');
            pageButton.className = `page-item ${i === currentPage ? 'active' : ''}`;
            pageButton.innerHTML = `
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            `;
            paginationContainer.appendChild(pageButton);
        }
    } else {
        console.error('Failed to fetch or display news data.');
    }
}

// Function to create a news card
function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'col-md-6';
    card.innerHTML = `
        <div class="card mb-4 shadow custom-rounded-card">
            <div class="row no-gutters">
                <div class="col p-4 d-flex flex-column position-static">
                    <strong class="d-inline-block mb-2 text-primary">${article.source.name}</strong>
                    
                    <p class="mb-1 pb-1 line-clamp-2">${article.title}</p>
                    
                    <div class="mb-2">
                        <i class="fas fa-calendar"></i>
                        ${new Date(article.publishedAt).toLocaleDateString()}
                    </div>
                    
                    <p class="mt-3 card-text mb-auto line-clamp-3">${article.description}</p>
                    
                    <div class="my-2 line-clamp-1">
                        <i class="fas fa-user"></i>
                        <span class="text-muted">${ article.author ? characterClamp(article.author, 15) : 'Anonymous'}</span>
                    </div>
                    <a target="_blank" href="${article.url}" class="stretched-link">Read more</a>
                </div>

                <div class="col-auto d-none d-lg-block pt-4 m-2">
                    <img class="bd-placeholder-img custom-news-image" width="250" height="272" src="${article.urlToImage}" alt="">
                </div>
            </div>
        </div>
    `;
    return card;
}

// Initial fetch and display of news data
(async () => {
    try {
        const newsData = await fetchNews(input, currentPage);
        displayNews(newsData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
})();

//Function to clamped to a certain number of characters
function characterClamp(text, maxCharacters) {
    if (text.length <= maxCharacters) {
        return text;
    }

    const clampedText = text.slice(0, maxCharacters) + '...';
    return clampedText;
}
