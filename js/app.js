'use strict';

// generate a random number of customers per hour
function getRandomCustomers(minCusts, maxCusts) {
    return Math.floor(Math.random() * (maxCusts - minCusts + 1) + minCusts);
}

// calculate the simulated amounts of cookies purchased for each hour 
function calcCookiesPerHour(shopLocation) {
    for (let i = 1; i <= 14; i++) {
        shopLocation.purchasedCookies.push(Math.floor(shopLocation.avgCookiesPerSale *
            getRandomCustomers(shopLocation.minHourlyCustomers, shopLocation.maxHourlyCustomers)));
    }
}

// write the output for shope location on sales.html
function displayShopSales(shopObject, shopLocation) {

    let paragraph = document.createElement('p');
    paragraph.textContent = shopLocation;
    let parent = document.getElementById('sales-body');
    let unorderedList = document.createElement('ul');

    //append shop name and sales per hour to the body of sales.html document
    parent.appendChild(paragraph);
    parent.appendChild(unorderedList);

    // iterate to calculate purchased cookies per hour and append the output to sales document 
    let totalCookies = 0;
    for (let i = 6; i <= 20; i++) {
        // append purchased cookies per hour to the unordered list as list item
        let listItem = document.createElement('li');
        unorderedList.appendChild(listItem);

        if (i <= 19) {
            // calculate the total cookies sold
            totalCookies += shopObject.purchasedCookies[i - 6];

            if (i <= 12) {
                listItem.textContent = i + 'am: ' + shopObject.purchasedCookies[i - 6] + ' cookies';
            } else {
                listItem.textContent = (i - 12) + 'pm: ' + shopObject.purchasedCookies[i - 6] + ' cookies';
            }
        } else {
            listItem.textContent = 'Total: ' + totalCookies + ' cookies'
        }
    }
}

let seattleSales = {
    minHourlyCustomers: 23,
    maxHourlyCustomers: 65,
    avgCookiesPerSale: 6.3,
    purchasedCookies: []
}

let tokyoSales = {
    minHourlyCustomers: 3,
    maxHourlyCustomers: 24,
    avgCookiesPerSale: 1.2,
    purchasedCookies: []
}

let dubaiSales = {
    minHourlyCustomers: 11,
    maxHourlyCustomers: 38,
    avgCookiesPerSale: 2.3,
    purchasedCookies: []
}

let parisSales = {
    minHourlyCustomers: 20,
    maxHourlyCustomers: 38,
    avgCookiesPerSale: 2.3,
    purchasedCookies: []
}

let limaSales = {
    minHourlyCustomers: 2,
    maxHourlyCustomers: 16,
    avgCookiesPerSale: 4.6,
    purchasedCookies: []
}


// render the output to sales.html document
calcCookiesPerHour(seattleSales);
displayShopSales(seattleSales, "Seattle");

calcCookiesPerHour(tokyoSales);
displayShopSales(tokyoSales, "Tokyo");

calcCookiesPerHour(dubaiSales);
displayShopSales(dubaiSales, "Dubai");

calcCookiesPerHour(parisSales);
displayShopSales(parisSales, "Paris");

calcCookiesPerHour(limaSales);
displayShopSales(limaSales, "Lima");
