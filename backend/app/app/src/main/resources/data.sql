-- Insert initial data into cities table
INSERT INTO cities (id, name) VALUES (1, 'City One');
INSERT INTO cities (id, name) VALUES (2, 'City Two');

-- Insert initial data into districts table
INSERT INTO districts (id, name, city_id) VALUES (1, 'District One', 1);
INSERT INTO districts (id, name, city_id) VALUES (2, 'District Two', 2);

-- Insert initial data into buildings table
INSERT INTO buildings (id, name, district_id, floors, year, construction, description) VALUES
(1, 'Building One', 1, 10, 2000, 'Brick', 'A modern office building located in downtown.'),
(2, 'Building Two', 2, 20, 2010, 'Panel', 'A high-rise building with panoramic city views.'),
(3, 'Building Three', 1, 15, 2005, 'Brick', 'A classic brick building with historical significance.'),
(4, 'Building Four', 2, 8, 2015, 'Panel', 'An eco-friendly building with sustainable materials.'),
(5, 'Building Five', 1, 25, 2020, 'Brick', 'A state-of-the-art building with a glass facade.'),
(6, 'Building Six', 2, 12, 2008, 'Panel', 'A mid-rise building with commercial spaces.'),
(7, 'Building Seven', 1, 18, 2012, 'Brick', 'A residential building with modern amenities.'),
(8, 'Building Eight', 2, 6, 2018, 'Panel', 'A low-rise building designed for community use.'),
(9, 'Building Nine', 1, 22, 2011, 'Brick', 'A high-rise building known for its unique architecture.'),
(10, 'Building Ten', 2, 30, 2022, 'Panel', 'The tallest building in the district with luxury apartments.');


-- Insert initial data into property_type table
INSERT INTO property_type (id, name, description) VALUES (1, 'Apartment', 'Residential apartment');
INSERT INTO property_type (id, name, description) VALUES (2, 'Office', 'Commercial office space');

-- Insert initial data into real_estates table
INSERT INTO real_estates (id, building_id, price, size, property_type_id, floor, heating, description, status, publish_date) VALUES
(1, 1, 250000.00, 85.0, 1, 5, 'Central', 'A spacious apartment with modern amenities.', 'Ready to Use', '2023-01-01'),
(2, 2, 180000.00, 45.0, 2, 3, 'Electric', 'A cozy apartment with a great view.', 'In Building Process', '2023-02-15'),
(3, 1, 500000.00, 150.0, 2, 10, 'Gas', 'A luxury penthouse with panoramic views.', 'Ready to Use', '2023-03-20'),
(4, 2, 200000.00, 65.0, 1, 2, 'Central', 'A modern apartment with convenient access.', 'Ready to Use', '2023-04-25'),
(5, 1, 220000.00, 55.0, 1, 6, 'Electric', 'A well-maintained apartment in a prime location.', 'In Building Process', '2023-05-30'),
(6, 2, 240000.00, 70.0, 2, 4, 'Gas', 'An apartment with contemporary design.', 'Ready to Use', '2023-06-10'),
(7, 1, 600000.00, 180.0, 2, 12, 'Central', 'A spacious penthouse with luxury finishes.', 'Ready to Use', '2023-07-15'),
(8, 2, 280000.00, 90.0, 1, 7, 'Electric', 'A bright and airy apartment with modern features.', 'Ready to Use', '2023-08-20'),
(9, 1, 150000.00, 40.0, 1, 1, 'Central', 'A compact apartment ideal for singles or couples.', 'In Building Process', '2023-09-25'),
(10, 2, 230000.00, 75.0, 2, 8, 'Gas', 'An elegant apartment with a great layout.', 'Ready to Use', '2023-10-30'),
(11, 1, 200000.00, 50.0, 2, 2, 'Central', 'A stylish apartment in a well-connected area.', 'In Building Process', '2023-11-10'),
(12, 2, 190000.00, 60.0, 1, 5, 'Electric', 'A charming apartment with updated appliances.', 'Ready to Use', '2023-12-05'),
(13, 1, 270000.00, 95.0, 1, 9, 'Gas', 'A beautifully designed apartment with great amenities.', 'Ready to Use', '2024-01-15'),
(14, 2, 210000.00, 55.0, 2, 3, 'Central', 'A comfortable apartment with modern decor.', 'In Building Process', '2024-02-20'),
(15, 1, 400000.00, 130.0, 2, 11, 'Electric', 'A luxury apartment with high-end finishes.', 'Ready to Use', '2024-03-25'),
(16, 2, 260000.00, 80.0, 1, 4, 'Gas', 'A bright apartment with a spacious living area.', 'Ready to Use', '2024-04-30'),
(17, 1, 220000.00, 60.0, 1, 6, 'Central', 'A well-located apartment with modern features.', 'In Building Process', '2024-05-10'),
(18, 2, 350000.00, 100.0, 2, 10, 'Electric', 'A large apartment with premium amenities.', 'Ready to Use', '2024-06-15'),
(19, 1, 250000.00, 85.0, 2, 7, 'Gas', 'A stylish apartment in a vibrant neighborhood.', 'Ready to Use', '2024-07-20'),
(20, 2, 160000.00, 50.0, 1, 1, 'Central', 'A budget-friendly apartment in a great location.', 'In Building Process', '2024-08-25');


-- Insert initial data into sales table
INSERT INTO sales (id, real_estate_id, sale_date, status, sale_price) VALUES (1, 1, '2023-01-01', 'completed', 240000.00);
INSERT INTO sales (id, real_estate_id, sale_date, status, sale_price) VALUES (2, 2, '2023-02-01', 'pending', 490000.00);

-- Insert initial data into sellers table
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (1, 'John', 'Doe', '123-456-7890');
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (2, 'Jane', 'Smith', '098-765-4321');

-- Insert initial data into join table
INSERT INTO sellers_sales (sales_id, seller_id) VALUES (1, 1);
INSERT INTO sellers_sales (sales_id, seller_id) VALUES (2, 2);