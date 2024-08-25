-- Insert initial data into cities table
INSERT INTO cities (id, name) VALUES (1, 'Blagoevgrad');
INSERT INTO cities (id, name) VALUES (2, 'Burgas');
INSERT INTO cities (id, name) VALUES (3, 'Dobrich');
INSERT INTO cities (id, name) VALUES (4, 'Gabrovo');
INSERT INTO cities (id, name) VALUES (5, 'Haskovo');
INSERT INTO cities (id, name) VALUES (6, 'Kardzhali');
INSERT INTO cities (id, name) VALUES (7, 'Kyustendil');
INSERT INTO cities (id, name) VALUES (8, 'Lovech');
INSERT INTO cities (id, name) VALUES (9, 'Montana');
INSERT INTO cities (id, name) VALUES (10, 'Pazardzhik');
INSERT INTO cities (id, name) VALUES (11, 'Pernik');
INSERT INTO cities (id, name) VALUES (12, 'Pleven');
INSERT INTO cities (id, name) VALUES (13, 'Plovdiv');
INSERT INTO cities (id, name) VALUES (14, 'Razgrad');
INSERT INTO cities (id, name) VALUES (15, 'Ruse');
INSERT INTO cities (id, name) VALUES (16, 'Shumen');
INSERT INTO cities (id, name) VALUES (17, 'Silistra');
INSERT INTO cities (id, name) VALUES (18, 'Sliven');
INSERT INTO cities (id, name) VALUES (19, 'Smolyan');
INSERT INTO cities (id, name) VALUES (20, 'Sofia');
INSERT INTO cities (id, name) VALUES (21, 'Stara Zagora');
INSERT INTO cities (id, name) VALUES (22, 'Targovishte');
INSERT INTO cities (id, name) VALUES (23, 'Varna');
INSERT INTO cities (id, name) VALUES (24, 'Veliko Tarnovo');
INSERT INTO cities (id, name) VALUES (25, 'Vidin');
INSERT INTO cities (id, name) VALUES (26, 'Vratsa');
INSERT INTO cities (id, name) VALUES (27, 'Yambol');

-- Districts in Varna (city_id = 23)
INSERT INTO districts (id, name, city_id) VALUES (1, 'Asparuhovo', 23);
INSERT INTO districts (id, name, city_id) VALUES (2, 'Briz', 23);
INSERT INTO districts (id, name, city_id) VALUES (3, 'Chayka', 23);
INSERT INTO districts (id, name, city_id) VALUES (4, 'Galata', 23);
INSERT INTO districts (id, name, city_id) VALUES (5, 'Levski', 23);
INSERT INTO districts (id, name, city_id) VALUES (6, 'Mladost', 23);
INSERT INTO districts (id, name, city_id) VALUES (7, 'Odessos', 23);
INSERT INTO districts (id, name, city_id) VALUES (8, 'Primorski', 23);
INSERT INTO districts (id, name, city_id) VALUES (9, 'Vladislav Varnenchik', 23);

-- Districts in Sofia (city_id = 20)
INSERT INTO districts (id, name, city_id) VALUES (10, 'Vitosha', 20);
INSERT INTO districts (id, name, city_id) VALUES (11, 'Krasno Selo', 20);
INSERT INTO districts (id, name, city_id) VALUES (12, 'Lozenets', 20);
INSERT INTO districts (id, name, city_id) VALUES (13, 'Lulin', 20);
INSERT INTO districts (id, name, city_id) VALUES (14, 'Mladost', 20);
INSERT INTO districts (id, name, city_id) VALUES (15, 'Nadezhda', 20);
INSERT INTO districts (id, name, city_id) VALUES (16, 'Oborishte', 20);
INSERT INTO districts (id, name, city_id) VALUES (17, 'Ovcha Kupel', 20);
INSERT INTO districts (id, name, city_id) VALUES (18, 'Pancharevo', 20);
INSERT INTO districts (id, name, city_id) VALUES (19, 'Serdika', 20);
INSERT INTO districts (id, name, city_id) VALUES (20, 'Sredets', 20);
INSERT INTO districts (id, name, city_id) VALUES (21, 'Studentski', 20);
INSERT INTO districts (id, name, city_id) VALUES (22, 'Triaditsa', 20);
INSERT INTO districts (id, name, city_id) VALUES (23, 'Vrabnitsa', 20);

-- Districts in Plovdiv (city_id = 13)
INSERT INTO districts (id, name, city_id) VALUES (24, 'Central', 13);
INSERT INTO districts (id, name, city_id) VALUES (25, 'Trakia', 13);
INSERT INTO districts (id, name, city_id) VALUES (26, 'Izgrev', 13);
INSERT INTO districts (id, name, city_id) VALUES (27, 'Severen', 13);
INSERT INTO districts (id, name, city_id) VALUES (28, 'Zapaden', 13);
INSERT INTO districts (id, name, city_id) VALUES (29, 'Yuzhen', 13);
INSERT INTO districts (id, name, city_id) VALUES (30, 'Kamenitsa', 13);
INSERT INTO districts (id, name, city_id) VALUES (31, 'Smirnenski', 13);

-- Districts in Burgas (city_id = 2)
INSERT INTO districts (id, name, city_id) VALUES (32, 'Bratya Miladinovi', 2);
INSERT INTO districts (id, name, city_id) VALUES (33, 'Izgrev', 2);
INSERT INTO districts (id, name, city_id) VALUES (34, 'Lazur', 2);
INSERT INTO districts (id, name, city_id) VALUES (35, 'Meden Rudnik', 2);
INSERT INTO districts (id, name, city_id) VALUES (36, 'Slaveykov', 2);
INSERT INTO districts (id, name, city_id) VALUES (37, 'Zornitsa', 2);
INSERT INTO districts (id, name, city_id) VALUES (38, 'Sarafovo', 2);
INSERT INTO districts (id, name, city_id) VALUES (39, 'Vazrazhdane', 2);


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
INSERT INTO property_type (id, name, description) VALUES (2, 'Studio', 'Compact, self-contained living space');
INSERT INTO property_type (id, name, description) VALUES (3, 'Hotel', 'Commercial property providing lodging services');
INSERT INTO property_type (id, name, description) VALUES (4, 'Warehouse', 'Storage or distribution facility');
INSERT INTO property_type (id, name, description) VALUES (5, 'House', 'Standalone residential property');
INSERT INTO property_type (id, name, description) VALUES (6, 'Office', 'Commercial space for business operations');
INSERT INTO property_type (id, name, description) VALUES (7, 'Garage', 'Enclosed space for vehicle storage');
INSERT INTO property_type (id, name, description) VALUES (8, 'Villa', 'Luxurious, often spacious residential property');

-- Insert initial data into real_estates table
INSERT INTO real_estates (id, building_id, price, property_size, property_type_id, floor, heating, descriptionBG, descriptionEN, top_property, status, publish_date, rooms, title) VALUES
(1, 1, 250000.00, 85.0, 1, 5, 'Central', 'Просторен апартамент с модерни удобства.', 'A spacious apartment with modern amenities.', FALSE, 'Ready to Use', '2023-01-01', 3, 'Spacious Modern Apartment'),
(2, 2, 180000.00, 45.0, 2, 3, 'Electric', 'Уютен апартамент с отлична гледка.', 'A cozy apartment with a great view.', FALSE, 'In Building Process', '2023-02-15', 1, 'Cozy Apartment with View'),
(3, 1, 500000.00, 150.0, 2, 10, 'Gas', 'Луксозен пентхаус с панорамна гледка.', 'A luxury penthouse with panoramic views.', TRUE, 'Ready to Use', '2023-03-20', 4, 'Luxury Penthouse'),
(4, 2, 200000.00, 65.0, 1, 2, 'Central', 'Модерен апартамент с удобен достъп.', 'A modern apartment with convenient access.', FALSE, 'Ready to Use', '2023-04-25', 2, 'Modern Apartment'),
(5, 1, 220000.00, 55.0, 1, 6, 'Electric', 'Добре поддържан апартамент в отлична локация.', 'A well-maintained apartment in a prime location.', FALSE, 'In Building Process', '2023-05-30', 2, 'Well-Maintained Prime Location Apartment'),
(6, 2, 240000.00, 70.0, 2, 4, 'Gas', 'Апартамент със съвременен дизайн.', 'An apartment with contemporary design.', FALSE, 'Ready to Use', '2023-06-10', 2, 'Contemporary Design Apartment'),
(7, 1, 600000.00, 180.0, 2, 12, 'Central', 'Просторен пентхаус с луксозни довършителни работи.', 'A spacious penthouse with luxury finishes.', TRUE, 'Ready to Use', '2023-07-15', 4, 'Luxury Finished Penthouse'),
(8, 2, 280000.00, 90.0, 1, 7, 'Electric', 'Светъл и просторен апартамент с модерни характеристики.', 'A bright and airy apartment with modern features.', FALSE, 'Ready to Use', '2023-08-20', 3, 'Bright and Airy Modern Apartment'),
(9, 1, 150000.00, 40.0, 1, 1, 'Central', 'Компактен апартамент, идеален за самостоятелно живеене или двойки.', 'A compact apartment ideal for singles or couples.', FALSE, 'In Building Process', '2023-09-25', 1, 'Compact Apartment for Singles/Couples'),
(10, 2, 230000.00, 75.0, 2, 8, 'Gas', 'Елегантен апартамент с отлична планировка.', 'An elegant apartment with a great layout.', FALSE, 'Ready to Use', '2023-10-30', 3, 'Elegant Apartment with Great Layout'),
(11, 1, 200000.00, 50.0, 2, 2, 'Central', 'Стилен апартамент в добре свързан район.', 'A stylish apartment in a well-connected area.', FALSE, 'In Building Process', '2023-11-10', 2, 'Stylish Well-Connected Apartment'),
(12, 2, 190000.00, 60.0, 1, 5, 'Electric', 'Очарователен апартамент с обновени уреди.', 'A charming apartment with updated appliances.', FALSE, 'Ready to Use', '2023-12-05', 2, 'Charming Apartment with Updated Appliances'),
(13, 1, 270000.00, 95.0, 1, 9, 'Gas', 'Красиво проектиран апартамент с отлични удобства.', 'A beautifully designed apartment with great amenities.', FALSE, 'Ready to Use', '2024-01-15', 3, 'Beautifully Designed Apartment with Amenities'),
(14, 2, 210000.00, 55.0, 2, 3, 'Central', 'Удобен апартамент с модерен декор.', 'A comfortable apartment with modern decor.', FALSE, 'In Building Process', '2024-02-20', 2, 'Comfortable Apartment with Modern Decor'),
(15, 1, 400000.00, 130.0, 2, 11, 'Electric', 'Луксозен апартамент с висококачествени довършителни работи.', 'A luxury apartment with high-end finishes.', TRUE, 'Ready to Use', '2024-03-25', 4, 'Luxury Apartment with High-End Finishes'),
(16, 2, 260000.00, 80.0, 1, 4, 'Gas', 'Светъл апартамент с просторна дневна зона.', 'A bright apartment with a spacious living area.', FALSE, 'Ready to Use', '2024-04-30', 3, 'Bright Apartment with Spacious Living Area'),
(17, 1, 220000.00, 60.0, 1, 6, 'Central', 'Добре разположен апартамент с модерни характеристики.', 'A well-located apartment with modern features.', FALSE, 'In Building Process', '2024-05-10', 2, 'Well-Located Apartment with Modern Features'),
(18, 2, 350000.00, 100.0, 2, 10, 'Electric', 'Голям апартамент с премиум удобства.', 'A large apartment with premium amenities.', TRUE, 'Ready to Use', '2024-06-15', 4, 'Large Apartment with Premium Amenities'),
(19, 1, 250000.00, 85.0, 2, 7, 'Gas', 'Стилен апартамент в оживен квартал.', 'A stylish apartment in a vibrant neighborhood.', FALSE, 'Ready to Use', '2024-07-20', 3, 'Stylish Apartment in Vibrant Neighborhood'),
(20, 2, 160000.00, 50.0, 1, 1, 'Central', 'Бюджетен апартамент в отлична локация.', 'A budget-friendly apartment in a great location.', FALSE, 'In Building Process', '2024-08-25', 1, 'Budget-Friendly Apartment');


-- Insert initial data into sellers table
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (1, 'John', 'Doe', '123-456-7890');
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (2, 'Jane', 'Smith', '098-765-4321');

-- Insert initial data into join table
INSERT INTO real_estates_sellers (real_estate_id, seller_id) VALUES (1, 1);
INSERT INTO real_estates_sellers (real_estate_id, seller_id) VALUES (2, 2);