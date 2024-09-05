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
INSERT INTO districts (id, name, city_id) VALUES (24, 'Center', 13);
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
INSERT INTO buildings (id, name, district_id, floors, year, construction, descriptionEN, descriptionBG) VALUES
(1, 'Building One', 1, 10, 2000, 'brick', 'A modern office building located in downtown.', 'Модерна офис сграда, разположена в центъра на града.'),
(2, 'Building Two', 2, 20, 2010, 'panel', 'A high-rise building with panoramic city views.', 'Висок блок с панорамна гледка към града.'),
(3, 'Building Three', 1, 15, 2005, 'brick', 'A classic brick building with historical significance.', 'Класическа тухлена сграда с историческо значение.'),
(4, 'Building Four', 2, 8, 2015, 'panel', 'An eco-friendly building with sustainable materials.', 'Екологична сграда с устойчиви материали.'),
(5, 'Building Five', 1, 25, 2020, 'brick', 'A state-of-the-art building with a glass facade.', 'Модерна сграда със стъклена фасада.'),
(6, 'Building Six', 2, 12, 2008, 'panel', 'A mid-rise building with commercial spaces.', 'Средноетажна сграда с търговски площи.'),
(7, 'Building Seven', 1, 18, 2012, 'brick', 'A residential building with modern amenities.', 'Жилищна сграда с модерни удобства.'),
(8, 'Building Eight', 2, 6, 2018, 'panel', 'A low-rise building designed for community use.', 'Нискоетажна сграда, предназначена за обществено ползване.'),
(9, 'Building Nine', 1, 22, 2011, 'brick', 'A high-rise building known for its unique architecture.', 'Висока сграда, известна със своята уникална архитектура.'),
(10, 'Building Ten', 2, 30, 2022, 'panel', 'The tallest building in the district with luxury apartments.', 'Най-високата сграда в района с луксозни апартаменти.'),
(11, 'Building Eleven', 1, 12, 2001, 'brick', 'An office building with flexible workspaces.', 'Офис сграда с гъвкави работни пространства.'),
(12, 'Building Twelve', 2, 18, 2013, 'panel', 'A residential tower with green rooftop amenities.', 'Жилищна кула със зелени удобства на покрива.'),
(13, 'Building Thirteen', 1, 14, 2007, 'brick', 'A historic building converted into luxury apartments.', 'Историческа сграда, превърната в луксозни апартаменти.'),
(14, 'Building Fourteen', 2, 9, 2016, 'panel', 'A modern building with energy-efficient systems.', 'Модерна сграда с енергийно ефективни системи.'),
(15, 'Building Fifteen', 1, 28, 2021, 'brick', 'A skyscraper with panoramic elevators.', 'Небостъргач с панорамни асансьори.'),
(16, 'Building Sixteen', 2, 11, 2009, 'panel', 'A commercial building with co-working spaces.', 'Търговска сграда с коуъркинг пространства.'),
(17, 'Building Seventeen', 1, 19, 2014, 'brick', 'A mixed-use building with retail and residential units.', 'Сграда със смесено предназначение с търговски и жилищни единици.'),
(18, 'Building Eighteen', 2, 7, 2019, 'panel', 'A boutique residential building with custom finishes.', 'Бутикова жилищна сграда с персонализирани довършителни работи.'),
(19, 'Building Nineteen', 1, 23, 2012, 'brick', 'A high-rise building with a rooftop pool.', 'Висока сграда с басейн на покрива.'),
(20, 'Building Twenty', 2, 35, 2023, 'panel', 'A luxury building with private elevators for each unit.', 'Луксозна сграда с частни асансьори за всяко жилище.');

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
INSERT INTO real_estates
(id, building_id, price, property_size, property_type_id, floor, heating, descriptionBG, descriptionEN, top_property, status, publish_date, rooms, titleBG, titleEN)
VALUES
(1, 1, 250000.00, 85.0, 1, 5, 'tps', 'Просторен апартамент с модерни удобства.', 'A spacious apartment with modern amenities.', FALSE, 'finished', '2023-01-01', 'threeRooms', 'Просторен модерен апартамент', 'Spacious Modern Apartment'),
(2, 2, 180000.00, 45.0, 2, 3, 'electricity', 'Уютен апартамент с отлична гледка.', 'A cozy apartment with a great view.', FALSE, 'inConstruction', '2023-02-15', 'oneRoom', 'Уютен апартамент с гледка', 'Cozy Apartment with View'),
(3, 1, 500000.00, 150.0, 2, 10, 'gas', 'Луксозен пентхаус с панорамна гледка.', 'A luxury penthouse with panoramic views.', TRUE, 'finished', '2023-03-20', 'fourRooms', 'Луксозен пентхаус', 'Luxury Penthouse'),
(4, 2, 200000.00, 65.0, 1, 2, 'tps', 'Модерен апартамент с удобен достъп.', 'A modern apartment with convenient access.', FALSE, 'finished', '2023-04-25', 'twoRooms', 'Модерен апартамент', 'Modern Apartment'),
(5, 1, 220000.00, 55.0, 1, 6, 'local', 'Добре поддържан апартамент в отлична локация.', 'A well-maintained apartment in a prime location.', FALSE, 'inConstruction', '2023-05-30', 'twoRooms', 'Добре поддържан апартамент в отлична локация', 'Well-Maintained Prime Location Apartment'),
(6, 2, 240000.00, 70.0, 2, 4, 'gas', 'Апартамент със съвременен дизайн.', 'An apartment with contemporary design.', FALSE, 'finished', '2023-06-10', 'twoRooms', 'Апартамент със съвременен дизайн', 'Contemporary Design Apartment'),
(7, 1, 600000.00, 180.0, 2, 12, 'tps', 'Просторен пентхаус с луксозни довършителни работи.', 'A spacious penthouse with luxury finishes.', TRUE, 'finished', '2023-07-15', 'fourRooms', 'Просторен луксозен пентхаус', 'Luxury Finished Penthouse'),
(8, 2, 280000.00, 90.0, 1, 7, 'electricity', 'Светъл и просторен апартамент с модерни характеристики.', 'A bright and airy apartment with modern features.', FALSE, 'finished', '2023-08-20', 'threeRooms', 'Светъл и просторен апартамент с модерни характеристики', 'Bright and Airy Modern Apartment'),
(9, 1, 150000.00, 40.0, 1, 1, 'tps', 'Компактен апартамент, идеален за самостоятелно живеене или двойки.', 'A compact apartment ideal for singles or couples.', FALSE, 'inConstruction', '2023-09-25', 'oneRoom', 'Компактен апартамент за самостоятелно живеене или двойки', 'Compact Apartment for Singles/Couples'),
(10, 2, 230000.00, 75.0, 2, 8, 'gas', 'Елегантен апартамент с отлична планировка.', 'An elegant apartment with a great layout.', FALSE, 'finished', '2023-10-30', 'threeRooms', 'Елегантен апартамент с отлична планировка', 'Elegant Apartment with Great Layout'),
(11, 1, 200000.00, 50.0, 2, 2, 'electricity', 'Стилен апартамент в добре свързан район.', 'A stylish apartment in a well-connected area.', FALSE, 'inConstruction', '2023-11-10', 'twoRooms', 'Стилен апартамент в добре свързан район', 'Stylish Well-Connected Apartment'),
(12, 2, 190000.00, 60.0, 1, 5, 'electricity', 'Очарователен апартамент с обновени уреди.', 'A charming apartment with updated appliances.', FALSE, 'finished', '2023-12-05', 'twoRooms', 'Очарователен апартамент с обновени уреди', 'Charming Apartment with Updated Appliances'),
(13, 1, 270000.00, 95.0, 1, 9, 'gas', 'Красиво проектиран апартамент с отлични удобства.', 'A beautifully designed apartment with great amenities.', FALSE, 'finished', '2024-01-15', 'threeRooms', 'Красиво проектиран апартамент с отлични удобства', 'Beautifully Designed Apartment with Amenities'),
(14, 2, 210000.00, 55.0, 2, 3, 'local', 'Удобен апартамент с модерен декор.', 'A comfortable apartment with modern decor.', FALSE, 'inConstruction', '2024-02-20', 'twoRooms', 'Удобен апартамент с модерен декор', 'Comfortable Apartment with Modern Decor'),
(15, 1, 400000.00, 130.0, 2, 11, 'electricity', 'Луксозен апартамент с висококачествени довършителни работи.', 'A luxury apartment with high-end finishes.', TRUE, 'finished', '2024-03-25', 'fourRooms', 'Луксозен апартамент с висококачествени довършителни работи', 'Luxury Apartment with High-End Finishes'),
(16, 2, 260000.00, 80.0, 1, 4, 'gas', 'Светъл апартамент с просторна дневна зона.', 'A bright apartment with a spacious living area.', FALSE, 'finished', '2024-04-30', 'threeRooms', 'Светъл апартамент с просторна дневна зона', 'Bright Apartment with Spacious Living Area'),
(17, 1, 220000.00, 60.0, 1, 6, 'tps', 'Добре разположен апартамент с модерни характеристики.', 'A well-located apartment with modern features.', FALSE, 'inConstruction', '2024-05-10', 'twoRooms', 'Добре разположен апартамент с модерни характеристики', 'Well-Located Apartment with Modern Features'),
(18, 2, 350000.00, 100.0, 2, 10, 'electricity', 'Голям апартамент с премиум удобства.', 'A large apartment with premium amenities.', TRUE, 'finished', '2024-06-15', 'fourRooms', 'Голям апартамент с премиум удобства', 'Large Apartment with Premium Amenities'),
(19, 1, 250000.00, 85.0, 2, 7, 'gas', 'Стилен апартамент в оживен квартал.', 'A stylish apartment in a vibrant neighborhood.', FALSE, 'finished', '2024-07-20', 'threeRooms', 'Стилен апартамент в оживен квартал', 'Stylish Apartment in Vibrant Neighborhood'),
(20, 2, 160000.00, 50.0, 1, 1, 'local', 'Бюджетен апартамент в отлична локация.', 'A budget-friendly apartment in a great location.', FALSE, 'inConstruction', '2024-08-25', 'oneRoom', 'Бюджетен апартамент в отлична локация', 'Budget-Friendly Apartment');

-- Insert initial data into sellers table
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (1, 'John', 'Doe', '123-456-7890');
INSERT INTO sellers (id, first_name, last_name, phone_number) VALUES (2, 'Jane', 'Smith', '098-765-4321');

-- Insert initial data into join table
INSERT INTO real_estates_sellers (real_estate_id, seller_id) VALUES (1, 1);
INSERT INTO real_estates_sellers (real_estate_id, seller_id) VALUES (2, 2);