const quotoContainer = document.getElementById("card");
const quotoText = document.getElementById("quoto");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuotoBtn = document.getElementById("new-quoto");
const loader = document.getElementById("loader");

let apiQuotes = [];

// show loading
function loading() {
    loader.hidden = false;
    quotoContainer.hidden = true;
}

function complete() {
    loader.hidden = true;
    quotoContainer.hidden = false;
}


// Show New Quoto
function newQuoto(quotes) {
    loading();
    let numbers = quotes.length;
    let randomInt = Math.floor(Math.random() * numbers);

    quotoText.innerHTML = `<i class='bx bxs-quote-left symbol'></i> ${quotes[randomInt].text}`;

    // check if a author is black and replace it as Unknown
    if (!quotes[randomInt].author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quotes[randomInt].author;
    }

    // check quote length to determine styling
    if (quotes[randomInt].text.length > 120) {
        quotoText.classList.add('long-quote');
    } else {
        quotoText.classList.remove('long-quote');
    }
    complete();
}

// tweet quote
function tweetQuote(quotoText, authorText) {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quotoText.textContent.trim()} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// event listener
newQuotoBtn.addEventListener('click', () => newQuoto(apiQuotes));
twitterBtn.addEventListener('click', () => tweetQuote(quotoText, authorText));


// Get Quotos from API
async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        let quoto = newQuoto(apiQuotes);
        console.log(quoto);
    } catch (error) {
        alert(error);
        getQuotes();
    }
}

getQuotes();