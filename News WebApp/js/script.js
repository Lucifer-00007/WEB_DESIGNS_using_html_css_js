// Your API key and input query
const apiKey = 'a13d2ccbcd9f45d98699f485b9cd2b55';
const input = 'india'; // Replace with your desired search query
const pageSize = 10; // Number of news cards per page
let currentPage = 1; // Current page number

if (window.location.pathname.includes('index.html') || window.location.pathname == '/') {
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const topicItems = document.querySelectorAll('.topic-item');

    // Add event listeners to category buttons
    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            // Set the input query based on the button clicked
            let input = button.dataset.category;
            currentPage = 1; // Reset to page 1 when changing categories
            showAlert(input);
            mainFunc(input, currentPage);
        });
    });

    // Add event listeners to search buttons
    searchBtn.addEventListener('click', (event) => {
        event.preventDefault();
        currentPage = 1; // Reset to page 1 when changing categories
        showAlert(searchInput.value);
        mainFunc(searchInput.value, currentPage);
    });


    // Add event listeners to all dropdowns
    topicItems.forEach(function (item) {
        item.addEventListener('click', function () {
            const selectedValue = item.textContent;
            currentPage = 1; // Reset to page 1 when changing categories
            showAlert(selectedValue);
            mainFunc(selectedValue, currentPage)
        });
    });
}

// Function to fetch news data
async function fetchNews(input) {
    try {
        // const response = await fetch(`https://news-api-wjkj.onrender.com/news?q=${input}&apiKey=${apiKey}`);
        // const response = await fetch(`https://us-central1-micro-service-52cc5.cloudfunctions.net/newsApi/news?q=${input}&apiKey=${apiKey}`);
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
        const newsData = await fetchNews(input);
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
                        <span class="text-muted">${article.author ? characterClamp(article.author, 15) : 'Anonymous'}</span>
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
const mainFunc = async (input) => {
    try {
        const newsData = await fetchNews(input);
        displayNews(newsData);
    } catch (error) {
        console.error('An error occurred:', error);
    }
};

if (window.location.pathname.includes('index.html') || window.location.pathname == '/') {
    mainFunc(input, currentPage);
}

//Function to clamped to a certain number of characters
function characterClamp(text, maxCharacters) {
    if (text.length <= maxCharacters) {
        return text;
    }

    const clampedText = text.slice(0, maxCharacters) + '...';
    return clampedText;
}

// Function to show alert
function showAlert(input) {
    const alert = document.getElementById('alert');
    const newsContainer = document.getElementById('news-container')
    const paginationContainer = document.getElementById('pagination');

    // Clear previous news cards and pagination
    newsContainer.innerHTML = '';
    paginationContainer.innerHTML = '';

    alert.innerHTML = `
    <div class="alert alert-success fade show pt-3 m-2 mb-4 text-center" role="alert">
        <strong class="mx-4" >Displaying search results for: "${input}"</strong>
        <a href="./" class="btn btn-outline-success" aria-hidden="true">Go Back</a>
    </div>
    `;
}

