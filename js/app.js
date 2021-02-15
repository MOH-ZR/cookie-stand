'use strict';

// generate a random number of customers per hour
function getRandomCustomers(minCusts, maxCusts) {
    return Math.floor(Math.random() * (maxCusts - minCusts + 1) + minCusts);
}

// create table and render it to sales.html
let salmonTable = document.createElement('table');
let tableParent = document.getElementById('salmon-sales');
tableParent.appendChild(salmonTable);

// constructor for creating a new shop location object
function SalmonCookieStand(minHourlyCustomers, maxHourlyCustomers, avgCookiesPerSale) {
    this.minHourlyCustomers = minHourlyCustomers;
    this.maxHourlyCustomers = maxHourlyCustomers;
    this.avgCookiesPerSale = avgCookiesPerSale;
    this.purchasedCookies = this.calcCookiesPerHour();
}

SalmonCookieStand.prototype.calcCookiesPerHour = function () {
    let temp = [];
    for (let i = 1; i <= 14; i++) {
        temp.push(Math.floor(this.avgCookiesPerSale *
            getRandomCustomers(this.minHourlyCustomers, this.maxHourlyCustomers)));
    }
    this.purchasedCookies = temp;
}

// render the table's header
function renderHeader() {
    let tablehead = document.createElement('tr');
    salmonTable.appendChild(tablehead);

    // create empty head for the first column
    let emptyHead = document.createElement('th');
    tablehead.appendChild(emptyHead);
    for (let i = 6; i <= 20; i++) {
        let tableh1 = document.createElement('th');
        if (i <= 19) {
            if (i <= 12) {
                tableh1.textContent = i + ':00am';
            } else {
                tableh1.textContent = (i - 12) + ':00pm';
            }
        } else {
            tableh1.textContent = 'Daily Location Total';
        }
        tablehead.appendChild(tableh1);
    }
}

// create render function for each shop location
SalmonCookieStand.prototype.render = function (location) {
    let totalSales = 0;
    let shopRow = document.createElement('tr');

    let shopRowHead = document.createElement('th');
    shopRowHead.textContent = location;
    shopRow.appendChild(shopRowHead);

    salmonTable.appendChild(shopRow);
    for (let i = 0; i <= 14; i++) {
        let shopData = document.createElement('td');
        shopRow.appendChild(shopData);
        if (i <= 13) {
            totalSales += this.purchasedCookies[i];
            shopData.textContent = this.purchasedCookies[i];
        } else {
            shopData.textContent = totalSales;
        }
    }
    this.purchasedCookies.push(totalSales);
}

// render the table's footer
function renderFooter() {
    let hourSales = 0;
    let tableFooter = document.createElement('tr');
    
    // create header for totals row
    let tableFooterHeader = document.createElement('th');
    tableFooterHeader.textContent = "Totals";
    tableFooter.appendChild(tableFooterHeader);
     
    salmonTable.appendChild(tableFooter);
    for (let i = 1; i <= 15; i++) {
        hourSales = seattleSales.purchasedCookies[i - 1] +
            tokyoSales.purchasedCookies[i - 1] +
            dubaiSales.purchasedCookies[i - 1] +
            parisSales.purchasedCookies[i - 1] +
            limaSales.purchasedCookies[i - 1];

        let tableData = document.createElement('td');
        tableData.textContent = hourSales;
        tableFooter.appendChild(tableData);
    }
}

let seattleSales = new SalmonCookieStand(23, 65, 6.3);
let tokyoSales = new SalmonCookieStand(3, 24, 1.2);
let dubaiSales = new SalmonCookieStand(11, 38, 2.3);
let parisSales = new SalmonCookieStand(20, 38, 2.3);
let limaSales = new SalmonCookieStand(2, 16, 4.6);

seattleSales.calcCookiesPerHour();
tokyoSales.calcCookiesPerHour();
dubaiSales.calcCookiesPerHour();
parisSales.calcCookiesPerHour();
limaSales.calcCookiesPerHour();

renderHeader();
seattleSales.render('Seattle');
tokyoSales.render('Tokyo');
dubaiSales.render('Dubai');
parisSales.render('Paris');
limaSales.render('Lima');
renderFooter();
