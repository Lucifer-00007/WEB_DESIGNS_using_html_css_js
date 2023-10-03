// Replace with your actual API key
const apiKey = 'a13d2ccbcd9f45d98699f485b9cd2b55';
const pageSize = 4; // Number of cards to display per page
let currentPage = 1;


// Function to fetch data from the API and generate news cards
async function fetchNews(input) {
    try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${apiKey}`);
        const data = await response.json();

        if (data.status === 'ok' && data.articles) {
            const startIndex = (currentPage - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const newsData = data.articles.slice(startIndex, endIndex);

            // Clear previous news cards and pagination
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = '';

            // Generate and display news cards
            for (let i = 0; i < newsData.length; i += 2) {
                // Create a new row for every two cards
                const row = document.createElement('div');
                row.className = 'row mb-2';

                const firstArticle = newsData[i];
                const firstCard = createNewsCard(firstArticle);

                if (i + 1 < newsData.length) {
                    const secondArticle = newsData[i + 1];
                    const secondCard = createNewsCard(secondArticle);
                    row.appendChild(firstCard);
                    row.appendChild(secondCard);
                } else {
                    row.appendChild(firstCard);
                }

                newsContainer.appendChild(row);
            }

            // Generate and display pagination buttons
            const paginationContainer = document.getElementById('pagination');
            const totalPages = Math.ceil(data.articles.length / pageSize);
            paginationContainer.innerHTML = '';

            for (let i = 1; i <= totalPages; i++) {
                const pageButton = document.createElement('li');
                pageButton.className = `page-item ${i === currentPage ? 'active' : ''}`;
                pageButton.innerHTML = `
                    <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
                `;
                paginationContainer.appendChild(pageButton);
            }
        } else {
            console.error('Failed to fetch news data.');
        }
    } catch (error) {
        console.error('An error occurred while fetching news data:', error);
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
                        <span class="text-muted">${article.author}</span>
                    </div>
                    <a href="${article.url}" class="stretched-link">Read more</a>
                </div>

                <div class="col-auto d-none d-lg-block pt-4 m-2">
                    <img class="bd-placeholder-img custom-news-image" width="250" height="272" src="${article.urlToImage}" alt="">
                </div>
            </div>
        </div>
    `;
    return card;
}

// Function to display news data
// async function displayNews(input) {
//     try {
//         const newsData = await fetchNews(input);
//         const newsContainer = document.getElementById('news-container');

//         if (newsData && newsData.status === 'ok' && newsData.articles) {
//             for (let i = 0; i < newsData.articles.length; i += 2) {
//                 const row = document.createElement('div');
//                 row.className = 'row mb-2';

//                 const firstArticle = newsData.articles[i];
//                 const firstCard = createNewsCard(firstArticle);

//                 if (i + 1 < newsData.articles.length) {
//                     const secondArticle = newsData.articles[i + 1];
//                     const secondCard = createNewsCard(secondArticle);
//                     row.appendChild(firstCard);
//                     row.appendChild(secondCard);
//                 } else {
//                     row.appendChild(firstCard);
//                 }

//                 newsContainer.appendChild(row);
//             }
//         } else {
//             console.error('Failed to fetch or display news data.');
//         }
//     } catch (error) {
//         console.error('An error occurred:', error);
//     }
// }

// Call the displayNews function with your desired input
displayNews('india'); 


// Function to change the current page
function changePage(page) {
    currentPage = page;
    fetchNews('technology'); // Replace 'technology' with your desired search query
}

// Call fetchNews to initially populate the container with news cards
fetchNews('technology'); // Replace 'technology' with your desired search query
