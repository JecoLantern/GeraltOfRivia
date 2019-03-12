DROP DATABASE IF EXISTS armory;

CREATE DATABASE armory;

USE armory;

CREATE TABLE items(
    item_id INT AUTO_INCREMENT NOT NULL,
    armor_type VARCHAR(45) NOT NULL,
    product_name VARCHAR(45) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    armor_value DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    product_sales DECIMAL(10,2) DEFAULT 0,
    PRIMARY KEY (item_id)
);

SELECT * FROM items;

INSERT INTO items (armor_type, product_name, price, armor_value, stock_quantity)
VALUES ("Helmet", "Serpentine Cruz Headpiece", 90, 23, 100),
    ("Leggings", "Famed Pon Leggings", 87, 22, 100),
    ("Leggings", "Ursine Trousers", 78, 18, 100),
    ("Helmet", "Keeton Mask", 77, 24, 100),
    ("Leggings", "Wolven Shinguards", 75, 15, 100),
    ("Leggings", "Hansen's Breeches", 69, 17, 100),
    ("Helmet", "Feline Visor", 68, 16, 100),
    ("Chest", "Armor de Jandro", 67, 22, 100),
    ("Chest", "Chestpiece of Vachon", 64, 23, 100),
    ("Boots", "Diamond Boots", 64, 18, 100),
    ("Leggings", "Griffin Pants", 62, 11, 100),
    ("Chest", "Kaer Morhen Armor", 62, 21, 100),
    ("Helmet", "Ornate Helmet of Cagampan", 60, 16, 100),
    ("Chest", "Cured Leather Chestpiece", 59, 20, 100),
    ("Leggings", "Tanned Leg Protection", 59, 15, 100),
    ("Chest", "Smith's Plated Chestguard", 58, 10, 100),
    ("Chest", "Dented Plate Armor", 57, 19, 100),
    ("Leggings", "Manticore Braces", 56, 12, 100),
    ("Chest", "Jeweled Drake Tunic", 55, 19, 100),
    ("Chest", "Ginger's Gilded Armor", 54, 18, 100),
    ("Helmet", "Offner Protector", 54, 15, 100),
    ("Leggings", "Mail Emares Leggings", 53, 14, 100),
    ("Boots", "Steel Boots", 52, 14, 100),
    ("Boots", "Tate's Spiked Cleats", 52, 20, 100),
    ("Chest", "Garcia Guard", 50, 17, 100),
    ("Helmet", "Leather Helmet", 49, 13, 100),
    ("Leggings", "Woven Leggings", 47, 11, 100),
    ("Helmet", "Sligar's Noggin Protector", 46, 12, 100),
    ("Leggings", "Silken Pants", 45, 10, 100),
    ("Helmet", "Glass Bowl", 44, 12, 100),
    ("Leggings", "Tattered Shorts", 42, 13, 100),
    ("Boots", "Leather Lunde Shoes", 35, 7, 100),
    ("Boots", "Cloth Shoes", 33, 5, 100);