create database sa_G11;
use sa_G11; 


Create table Category(
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);


Create table User(
	id_user INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    rol int not null
);
insert into User(email,password, rol) values('ejemplo@gmail.com','123456',1); /*----0 cliente 1- proveedor-------*/
select *from User;

Create table Customer(
id_customer INT AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
phone_number int not null,
photografy VARCHAR(100) NOT NULL,
id_user int not null,
FOREIGN KEY (id_user) REFERENCES User(id_user)
);

Create table Supplier(
id_supplier INT AUTO_INCREMENT PRIMARY KEY,
brand VARCHAR(100) NOT NULL,
address VARCHAR(100) NOT NULL,
id_user int not null,
FOREIGN KEY (id_user) REFERENCES User(id_user)
);
insert into Supplier(brand,address,id_user) values('Logitech','Av. Santa Fe # 440 - 102, Century Plaza,',1);
select *from Supplier;


Create table Product(
id_product INT AUTO_INCREMENT PRIMARY KEY,
name  VARCHAR(100) NOT NULL,
description VARCHAR(500) NOT NULL,
price float not null,
stock int not null,
img VARCHAR(100) NOT NULL,
id_category int not null,
id_supplier int not null,
FOREIGN KEY (id_category) REFERENCES Category(id),
FOREIGN KEY (id_supplier) REFERENCES Supplier(id_supplier)
);

insert into Product(name,description,price,stock,img,id_category,id_supplier) values('Laptop Logitech 523','Laptop para estudiante', 4500,5,'https://images.unsplash.com/1/type-away.jpg?q=80&fm=jpg&w=400&fit=max',3,1);
select *from Product;

Create table Shopping_Cart(
id INT AUTO_INCREMENT PRIMARY KEY,
quantity int not null,
id_customer int not null,
id_product int not null,
FOREIGN KEY (id_customer) REFERENCES Customer(id_customer),
FOREIGN KEY (id_product) REFERENCES Product(id_product)
);


Create Table Credit_Card(
id INT AUTO_INCREMENT PRIMARY KEY,
number VARCHAR(100) NOT NULL,
expiration VARCHAR(100) NOT NULL,
ccv VARCHAR(100) NOT NULL,
id_customer int not null,
FOREIGN KEY (id_customer) REFERENCES Customer(id_customer)
);

Create Table Sale(
id_sale INT AUTO_INCREMENT PRIMARY KEY,
date VARCHAR(100) NOT NULL,
total Float not null,
id_customer int not null,
FOREIGN KEY (id_customer) REFERENCES Customer(id_customer)
);
drop table Sale_Detail;

Create table Sale_Detail(
id_detail INT AUTO_INCREMENT PRIMARY KEY,
quantity int not null,
id_sale int not null,
id_product int not null,
FOREIGN KEY (id_sale) REFERENCES Sale(id_sale),
FOREIGN KEY (id_product) REFERENCES Product(id_product)
);

/*----- Fase 2 -----------------------*/
create table Favorites_list(
id_list int auto_increment primary key,		
id_product int not null,
id_customer int not null,
FOREIGN KEY (id_product) REFERENCES Product(id_product),
FOREIGN KEY (id_customer) REFERENCES Customer(id_customer)

);


create table Auction(
id_auction int auto_increment primary key,
initial_value float not null,
actual_value float,
description varchar(100) not null,
product_name  varchar(100) not null,
deadline varchar(100) not null,
status int not null,
id_seller int not null,
id_bidder int,
FOREIGN KEY (id_seller) REFERENCES User(id_user),
FOREIGN KEY (id_bidder) REFERENCES User(id_user)
);

create table Auction_history(
id_auction_history int auto_increment primary key,
id_auction int not null,
value float not null,
id_bidder int not null,
FOREIGN KEY (id_auction) REFERENCES Auction(id_auction),
FOREIGN KEY (id_bidder) REFERENCES User(id_user)
);

drop table  auction_history;
create table Auction_sale(
id_auction_sale int auto_increment primary key,
id_auction int not null,
FOREIGN KEY (id_auction) REFERENCES Auction(id_auction)
);


create table Bill(
id_bill int auto_increment primary key,
id_auction_sale int,
id_sale int,
nit varchar(100) not null,
address varchar(100) not null,
FOREIGN KEY (id_auction_sale) REFERENCES Auction_sale(id_auction_sale),
FOREIGN KEY (id_sale) REFERENCES Sale(id_sale)

);





insert into Category(name) values('Monitor');
insert into Category(name) values('Mouse');
insert into Category(name) values('Laptops');
insert into Category(name) values('Tarjeta de video');
insert into Category(name) values('Teclado');
insert into Category(name) values('audifonos');
insert into Category(name) values('MotherBoard');




select *from Shopping_Cart;
select *from Customer;
select *from Product;
select *from Supplier;
select *from User;
select *from Sale;
select *from Sale_Detail;
insert into Shopping_Cart(quantity,id_customer,id_product) values(4,4,11);

Delete from Shopping_Cart where id = 4;





