const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const chalk = require("chalk");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "armory"
});

let itemID;
let orderQuantity;
let stockQuantity;
let currentCost;
let totalCost = 0;
let totalSale;
let totalArmorVal = 0;
let crowns = 300;

connection.connect(function(err) {
    if (err) {
        console.log("Connection Error: " + err.stack);
    }
    var armorShopFigletized = "ARMOR       SHOP";
    figlet(armorShopFigletized, function(err, data) {
        if (err) {
            console.log("Something wrong...");
            console.dir(err);
            return;
        }
        console.log(chalk.hex("#329999")(data));
        console.log(chalk.hex("#71cc0a")("\t\tWELCOME to the ARMORY!"));
        loadProducts();
    });
});

function loadProducts() {
    console.log(chalk.hex("#71cc0a")("*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*=.=*"+"\n\n\t\tList of all available items: \n"));
    connection.query("SELECT * FROM items", function(err, respondez) {
        if (err) throw err;
        console.table(respondez);

        purchaseStart();
    });
}

function purchaseStart() {
    inquirer.prompt([{
        type: "input",
        name: "itemID",
        message: "Please pick the item ID you wish to purchase",
        validate: function(val) {
            return !isNaN(val);}
        },{
        type: "input",
        name: "quantity",
        message: "How many of this item would you like?",
        validate: function(val) {
            return val > 0;}
    
    }]).then(function(answers) {
        itemID = answers.itemID;
        orderQuantity = parseInt(answers.quantity);
        orderProduct();
        totalSale = 0
    })
}

function orderProduct() {
    connection.query("SELECT * FROM items WHERE item_id=?", [itemID], function(err, respondez) {
        stockQuantity = respondez[0].stock_quantity;
        totalSale = respondez[0].product_sales;
        price = respondez[0].price;
        armorVal = respondez[0].armor_value;

        updateProduct();
    })
}

function askForMoreItems() {
    inquirer.prompt({
        type: "confirm",
        name: "confirm",
        message: "Is there anything else you need?",
        default: false
    }).then(function(answer) {
        if (answer.confirm) {
            purchaseStart();
        }else{
            console.log("Your total cost is: ", totalCost, " Crowns.");
            var thankU4ShoppingFigletized = "Thanks For Shopping!!";
            figlet(thankU4ShoppingFigletized, function(err, data) {
                if (err) {
                    console.log("Something wrong...");
                    console.dir(err);
                    return;
                }
                console.log(chalk.hex("#329999")(data));
                connection.end();
            })
        }
    });
}

function updateProduct() {
    console.log("Updating... : \n");
    if((stockQuantity-orderQuantity)>0) {
        var query = connection.query("UPDATE items SET ? WHERE ?", [{stock_quantity: stockQuantity-orderQuantity, product_sales: totalSale+=(price * orderQuantity)}, {item_id: itemID}], function(err, respondez) {
            console.log(chalk.hex("#71cc0a")(respondez.affectedRows + " items updated..!\n"));
            calculateCost();
            askForMoreItems();
        });
    }else{
        console.log(chalk.red("Insufficient Quantity..!!\n"));
        console.log("Your total cost is: ", totalCost +"\n");
        purchaseStart();
    }

}

function calculateCost() {
    var availableCrowns;
    currentCost = price * orderQuantity;
    totalCost+=currentCost;
    availableCrowns=crowns-totalCost;
    totalArmorVal+=armorVal;
    console.log("Your current cost is: ", currentCost + " Crowns");
    console.log("Your total cost is: ", totalCost + " crowns.");
    console.log("You get " + totalArmorVal + " armor!")
    console.log("You have: ", availableCrowns + " crowns left.");
    if (availableCrowns <= 0) {
        console.log(chalk.red("Insufficient Crowns..!!\n"));
        console.log("Your total cost is: ", totalCost +"\n");
        purchaseStart();
    }
}