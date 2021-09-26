window.addEventListener('DOMContentLoaded', init, false);

function init() {
    getCoinRanking();
    getLatestNews();
}

function getCoinRanking() {
    
    var baseUrl = "https://api.coinranking.com/v2/coins";
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    var apiKey = "coinrankingfe41554bf7b47f4da7021f4d799fc35d15039711f3aa8659";
    
    var defaultCurrency = "$";
    
    fetch(`${proxyUrl}${baseUrl}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${apiKey}`,
            'Access-Control-Allow-Origin': '*'
        }
    }).then((response) => {
        if(response.ok) {
            response.json().then((json) => {
                console.log(json.data.coins)
                
                let coinsData = json.data.coins
                
                if(coinsData.length > 0) {
                    var cryptoCoins = ""
                }
                let trending_coin = coinsData.shift();
                document.getElementById("topcoin_name").innerHTML = trending_coin.name;
                document.getElementById("topcoin_price").innerHTML = defaultCurrency + parseFloat(trending_coin.price).toFixed(2);
                document.getElementById("topcoin_change").innerHTML = trending_coin.change;
                
                // set today's date
                let today = new Date;
                
                document.getElementById("today").innerHTML = today.toLocaleDateString();
                
                // for loop starts
                coinsData.forEach((coin) => {
                    cryptoCoins += "<tr>"
                    cryptoCoins += `<td>${coin.rank}<td>`;
                    cryptoCoins += `<td>${coin.name}<td>`;
                    cryptoCoins += `<td>${defaultCurrency}${parseFloat(coin.price).toFixed(2)}<td>`;
                    
                    // Change color based on value of coin.change
                    if(parseFloat(coin.change)>0) {
                        cryptoCoins += `<td class="coinChangeGreen">${coin.change}<td>`;"<tr>"
                        
                    } else {
                        cryptoCoins += `<td class="coinChangeRed">${coin.change}<td>`;"<tr>"
                    }
                    
                    
                    
                })
                document.getElementById("data").innerHTML = cryptoCoins;
            })
        }
    }).catch((error) => {
        console.log(error)
    })
}

function getLatestNews() {
    const url = "https://api.nytimes.com/svc/mostpopular/v2/emailed/7.json?api-key=fV3ANA2J6R3z24U5hZNVmC0kPPPtRQGX";
    fetch(url).then(function(result) {
        return result.json();
    }).then(function(json) {
        // displayResults(json);
        // console.log(json);
        // console.log(json.results);   
        
        for (let i = 0; i<json.results.length; i++) {
            console.log(json.results[i]['title'],json.results[i]['url']);
            
            // document.getElementById("data").innerHTML = cryptoCoins;
            // news_page = document.createElement('news_page');
            // top_news = document.createElement('top_news');
        } 
        //   news_page.appendChild(top_news);
        
        // const news_page = json.response.docs;
        
        
        
        
    });
}

