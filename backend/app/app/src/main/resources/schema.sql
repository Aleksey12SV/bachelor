-- Drop tables if they exist
DROP TABLE IF EXISTS sellers_sales;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS real_estates;

DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS property_type;
DROP TABLE IF EXISTS buildings;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  id integer PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE districts (
  id integer PRIMARY KEY,
  name varchar(255),
  city_id integer,
  FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE buildings (
  id integer PRIMARY KEY,
  name varchar(255),
  district_id integer,
  floors integer,
  year integer,
  FOREIGN KEY (district_id) REFERENCES districts (id)
);

CREATE TABLE property_type (
  id integer PRIMARY KEY,
  name varchar(255),
  description varchar(255)
);

CREATE TABLE real_estates (
  id integer PRIMARY KEY,
  building_id integer,
  price float,
  size float,
  property_type_id integer,
  FOREIGN KEY (property_type_id) REFERENCES property_type (id),
  FOREIGN KEY (building_id) REFERENCES buildings (id)
);

CREATE TABLE images (
  id integer PRIMARY KEY,
  property_id integer,
  description varchar(255),
  image tinyblob,
  FOREIGN KEY (property_id) REFERENCES real_estates (id)
);

CREATE TABLE sales (
  id integer PRIMARY KEY,
  real_estate_id integer,
  sale_date date,
  status enum('ACTIVE','COMPLETED','PENDING'),
  sale_price float,
  FOREIGN KEY (real_estate_id) REFERENCES real_estates (id)
);

CREATE TABLE sellers (
  id integer PRIMARY KEY,
  first_name varchar(255),
  last_name varchar(255),
  phone_number varchar(255)
);

CREATE TABLE sellers_sales (
    sales_id integer NOT NULL,
    seller_id integer NOT NULL,
    PRIMARY KEY (sales_id, seller_id),
    FOREIGN KEY (sales_id) REFERENCES sales(id),
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

