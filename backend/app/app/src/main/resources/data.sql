-- Insert initial data into cities table
INSERT INTO cities (id, name) VALUES (1, 'City One');
INSERT INTO cities (id, name) VALUES (2, 'City Two');

-- Insert initial data into districts table
INSERT INTO districts (id, name, city_id) VALUES (1, 'District One', 1);
INSERT INTO districts (id, name, city_id) VALUES (2, 'District Two', 2);

-- Insert initial data into buildings table
INSERT INTO buildings (id, name, district_id, floors, year) VALUES (1, 'Building One', 1, 10, 2000);
INSERT INTO buildings (id, name, district_id, floors, year) VALUES (2, 'Building Two', 2, 20, 2010);

-- Insert initial data into property_type table
INSERT INTO property_type (id, name, description) VALUES (1, 'Apartment', 'Residential apartment');
INSERT INTO property_type (id, name, description) VALUES (2, 'Office', 'Commercial office space');

-- Insert initial data into real_estates table
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (1, 1, 250000.00, 85.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (2, 2, 180000.00, 45.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (3, 1, 500000.00, 150.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (4, 2, 200000.00, 65.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (5, 1, 220000.00, 55.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (6, 2, 240000.00, 70.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (7, 1, 600000.00, 180.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (8, 2, 280000.00, 90.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (9, 1, 150000.00, 40.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (10, 2, 230000.00, 75.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (11, 1, 200000.00, 50.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (12, 2, 190000.00, 60.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (13, 1, 270000.00, 95.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (14, 2, 210000.00, 55.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (15, 1, 400000.00, 130.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (16, 2, 260000.00, 80.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (17, 1, 220000.00, 60.0, 1);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (18, 2, 350000.00, 100.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (19, 1, 250000.00, 85.0, 2);
INSERT INTO real_estates (id, building_id, price, size, property_type_id) VALUES (20, 2, 160000.00, 50.0, 1);


-- Insert initial data into sales table
INSERT INTO sales (id, real_estate_id, sale_date, status, sale_price) VALUES (1, 1, '2023-01-01', 'completed', 240000.00);
INSERT INTO sales (id, real_estate_id, sale_date, status, sale_price) VALUES (2, 2, '2023-02-01', 'pending', 490000.00);

-- Insert initial data into sellers table
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (1, 'John', 'Doe', '123-456-7890');
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (2, 'Jane', 'Smith', '098-765-4321');

-- Insert initial data into join table
INSERT INTO sellers_sales (sales_id, seller_id) VALUES (1, 1);
INSERT INTO sellers_sales (sales_id, seller_id) VALUES (2, 2);