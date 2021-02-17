'use strict';

// array to hold shops
let shops = [];
// generate a random number of customers per hour
function getRandomCustomers(minCusts, maxCusts) {
    return Math.floor(Math.random() * (maxCusts - minCusts + 1) + minCusts);
}

// create table and render it to sales.html
let salmonTable = document.createElement('table');
let tableParent = document.getElementById('salmon-sales');
tableParent.appendChild(salmonTable);

// constructor for creating a new shop location object
function SalmonCookieStand(name, minHourlyCustomers, maxHourlyCustomers, avgCookiesPerSale) {
    this.name = name
    this.minHourlyCustomers = parseInt(minHourlyCustomers);
    this.maxHourlyCustomers = parseInt(maxHourlyCustomers);
    this.avgCookiesPerSale = parseFloat(avgCookiesPerSale);
    this.purchasedCookies = this.calcCookiesPerHour();
    shops.push(this);
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
SalmonCookieStand.prototype.render = function () {
    let totalSales = 0;
    let shopRow = document.createElement('tr');

    let shopRowHead = document.createElement('th');
    shopRowHead.textContent = this.name;
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
    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < shops.length; j++) {
            hourSales += shops[j].purchasedCookies[i];
        }
        let tableData = document.createElement('td');
        tableData.textContent = hourSales;
        tableFooter.appendChild(tableData);
        hourSales = 0;
    }
}

let seattleSales = new SalmonCookieStand('Seattle', 23, 65, 6.3);
let tokyoSales = new SalmonCookieStand('Tokyo', 3, 24, 1.2);
let dubaiSales = new SalmonCookieStand('Dubai', 11, 38, 2.3);
let parisSales = new SalmonCookieStand('Paris', 20, 38, 2.3);
let limaSales = new SalmonCookieStand('Lima', 2, 16, 4.6);

seattleSales.calcCookiesPerHour();
tokyoSales.calcCookiesPerHour();
dubaiSales.calcCookiesPerHour();
parisSales.calcCookiesPerHour();
limaSales.calcCookiesPerHour();

renderHeader();
for (let i = 0; i < shops.length; i++) {
    shops[i].render()
}
renderFooter();

// get form data
let shopForm = document.getElementById("new-shop");
shopForm.addEventListener('submit', submitter);

function submitter(event) {

    event.preventDefault();

    let shopName = event.target.shopLocation.value;
    let minCusts = event.target.minCusts.value;
    let maxCusts = event.target.maxCusts.value;
    let avgCusts = event.target.avgCusts.value;

    if (!(isExist(shopName))) {
        console.log("hee");
        let divcontent = document.getElementById('salmon-sales');
        let shop = new SalmonCookieStand(shopName, minCusts, maxCusts, avgCusts);
        divcontent.textContent = '';
        shop.calcCookiesPerHour();

        // create table and render it to sales.html
        salmonTable = document.createElement('table');
        tableParent = document.getElementById('salmon-sales');
        tableParent.appendChild(salmonTable);
        renderHeader();
        for (let i = 0; i < shops.length - 1; i++) {
            shops[i].calcCookiesPerHour()
            shops[i].render();
        }
        shop.render(shopName);
        renderFooter();
    } else {
        //clear input fields after submit
        document.getElementById('new-shop').reset();
    }
}


// check if the new addded city is already exist
function isExist(name) {
    let temp = false;
    for (let i = 0; i < shops.length; i++) {
        if ((shops[i].name.toLowerCase()) == (name.toLowerCase())) {
            temp = true;
        }
    }
    return temp;
}
