-- Drop tables if they exist
DROP TABLE IF EXISTS real_estates_sellers;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS real_estates;

DROP TABLE IF EXISTS sellers;
DROP TABLE IF EXISTS property_type;
DROP TABLE IF EXISTS buildings;
DROP TABLE IF EXISTS districts;
DROP TABLE IF EXISTS cities;

CREATE TABLE cities (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255)
);

CREATE TABLE districts (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255),
  city_id integer,
  FOREIGN KEY (city_id) REFERENCES cities (id)
);

CREATE TABLE buildings (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255),
  district_id integer,
  floors integer,
  year integer,
  construction varchar(255),
  descriptionBG text(65535),
  descriptionEN text(65535),
  FOREIGN KEY (district_id) REFERENCES districts (id)
);

CREATE TABLE property_type (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  name varchar(255),
  description varchar(255)
);

CREATE TABLE real_estates (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  building_id integer,
  price float,
  property_size float,
  property_type_id integer,
  floor integer,
  heating varchar(255),
  titleBG varchar(255),
  titleEN varchar(255),
  rooms integer,
  descriptionBG text(65535),
  descriptionEN text(65535),
  top_property BOOLEAN,
  publish_date date,
  status varchar(255),
  FOREIGN KEY (property_type_id) REFERENCES property_type (id),
  FOREIGN KEY (building_id) REFERENCES buildings (id)
);

CREATE TABLE images (
  id BINARY(16) PRIMARY KEY NOT NULL,
  property_id integer,
  building_id INTEGER,
  descriptionBG varchar(255),
  descriptionEN varchar(255),
  height integer,
  width integer,
  image longblob,
  is_main_image BOOLEAN,
  FOREIGN KEY (property_id) REFERENCES real_estates (id),
  FOREIGN KEY (building_id) REFERENCES buildings (id),
  CHECK (building_id IS NOT NULL OR property_id IS NOT NULL),
  CHECK (NOT (building_id IS NOT NULL AND property_id IS NOT NULL))
);

CREATE TABLE sellers (
  id integer PRIMARY KEY NOT NULL AUTO_INCREMENT,
  first_name varchar(255),
  last_name varchar(255),
  phone_number varchar(255)
);

CREATE TABLE real_estates_sellers (
    real_estate_id integer NOT NULL,
    seller_id integer NOT NULL,
    PRIMARY KEY (real_estate_id, seller_id),
    FOREIGN KEY (real_estate_id) REFERENCES real_estates(id),
    FOREIGN KEY (seller_id) REFERENCES sellers(id)
);

