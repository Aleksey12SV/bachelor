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
(1, 'Skyline Tower', 1, 10, 2000, 'brick',
'A modern office building located in downtown, Skyline Tower offers state-of-the-art facilities for businesses. The structure boasts energy-efficient systems and open-plan office spaces designed for collaboration. Tenants have access to a rooftop terrace with panoramic views of the city. The lobby is spacious with a contemporary design, featuring marble floors and glass walls. The building includes parking for employees, as well as high-speed elevators to facilitate easy movement between floors.',
'Модерна офис сграда, разположена в центъра на града, Skyline Tower предлага съвременни удобства за бизнеса. Структурата разполага с енергийно ефективни системи и офисни пространства с отворен план, създадени за сътрудничество. Наемателите имат достъп до тераса на покрива с панорамна гледка към града. Лобито е просторно с модерен дизайн, включващ мраморни подове и стъклени стени. Сградата включва паркинг за служители и високоскоростни асансьори, които улесняват движението между етажите.'),

(2, 'Riverfront Plaza', 2, 20, 2010, 'panel',
'Riverfront Plaza is a high-rise residential tower offering panoramic views of the surrounding cityscape. The building features 20 floors of modern apartments, each designed with large windows to allow for maximum natural light. Residents can enjoy a rooftop garden area with seating and greenery. The building is equipped with high-speed elevators and a secure entry system, ensuring privacy and safety for all occupants. On the ground floor, there are several commercial units, including a café and a small grocery store for convenience.',
'Riverfront Plaza е висок жилищен блок, предлагащ панорамна гледка към околния градски пейзаж. Сградата разполага с 20 етажа съвременни апартаменти, всеки проектиран с големи прозорци за максимална естествена светлина. Жителите могат да се насладят на градина на покрива с места за сядане и зеленина. Сградата е оборудвана с високоскоростни асансьори и система за сигурно влизане, осигуряваща поверителност и безопасност за всички обитатели. На приземния етаж има няколко търговски обекта, включително кафе и малък магазин за хранителни стоки.'),

(3, 'The Horizon', 1, 15, 2005, 'brick',
'The Horizon is a classic brick structure with deep historical roots in the district. Originally built in the early 20th century, the building has been restored and updated while preserving its original architectural features, including intricate brickwork and arched windows. Inside, the space has been modernized with contemporary amenities, making it ideal for office spaces. The lobby features original wooden beams and restored tile floors, which give it a timeless charm. The building also includes a small museum dedicated to its history.',
'The Horizon е класическа тухлена структура с дълбоки исторически корени в района. Първоначално построена в началото на 20-ти век, сградата е реставрирана и обновена, като същевременно запазва оригиналните си архитектурни елементи, включително сложна тухлена работа и арковидни прозорци. Вътре пространството е модернизирано с модерни удобства, което го прави идеално за офисни помещения. Лобито разполага с оригинални дървени греди и възстановени плочки на пода, което му придава вечен чар. В сградата има и малък музей, посветен на нейната история.'),

(4, 'Oceanview Residences', 2, 8, 2015, 'panel',
'Oceanview Residences is an eco-friendly structure built with sustainability in mind. It incorporates solar panels and rainwater collection systems, minimizing its environmental impact. The building is insulated with sustainable materials, which also help regulate temperature and reduce energy consumption. Inside, residents enjoy modern, energy-efficient appliances and a layout designed to maximize natural ventilation. The building is surrounded by a green space, with community gardens and bike racks to encourage a sustainable lifestyle.',
'Oceanview Residences е екологична структура, построена с мисъл за устойчивост. Включва соларни панели и системи за събиране на дъждовна вода, минимизирайки нейното въздействие върху околната среда. Сградата е изолирана с устойчиви материали, които също помагат за регулиране на температурата и намаляване на енергийната консумация. Вътре жителите се радват на съвременни енергийно ефективни уреди и оформление, проектирано да максимизира естествената вентилация. Сградата е заобиколена от зелени площи с обществени градини и стойки за велосипеди, за да насърчи устойчивия начин на живот.'),

(5, 'The Pinnacle', 1, 25, 2020, 'brick',
'The Pinnacle is a state-of-the-art structure, featuring a sleek glass facade that reflects the skyline. It stands at 25 stories tall and offers both residential and commercial spaces. The building is equipped with the latest in smart-home technology, allowing residents to control everything from lighting to security systems remotely. The ground floor contains luxury retail stores and fine dining restaurants. Residents can enjoy a private rooftop lounge with a pool, offering spectacular views of the city. High-speed internet and private parking are included in all units.',
'The Pinnacle е модерна структура с изчистена стъклена фасада, която отразява силуета на града. Тя е висока 25 етажа и предлага както жилищни, така и търговски площи. Сградата е оборудвана с най-новите технологии за интелигентен дом, позволяващи на жителите да контролират всичко – от осветлението до системите за сигурност дистанционно. На приземния етаж се намират луксозни магазини и изискани ресторанти. Жителите могат да се насладят на частен салон на покрива с басейн, който предлага впечатляващи гледки към града. Високоскоростен интернет и частен паркинг са включени за всички жилища.'),

(6, 'Central Park Tower', 2, 12, 2008, 'panel',
'Central Park Tower is a mid-rise structure primarily housing commercial spaces. Its modern design features large glass windows, allowing for abundant natural light. The ground floor is occupied by a range of businesses, from retail shops to small offices, making it a bustling hub of activity. The upper floors are designed as open-plan offices, with flexible layouts that can be adapted to tenant needs. The building is equipped with eco-friendly air-conditioning systems and a rooftop solar panel array that powers common areas.',
'Central Park Tower е средноетажна структура, която основно предлага търговски площи. Модерният ѝ дизайн включва големи стъклени прозорци, които позволяват изобилно естествено осветление. Приземният етаж е зает от различни бизнеси, от търговски магазини до малки офиси, което я прави оживен център на активност. Горните етажи са проектирани като офиси с отворен план с гъвкави оформления, които могат да се адаптират според нуждите на наемателите. Сградата е оборудвана с екологични климатични системи и слънчеви панели на покрива, които захранват общите части.'),

(7, 'Sunset Villas', 1, 18, 2012, 'brick',
'Sunset Villas is a residential building that offers modern amenities for urban living. The apartments are spacious and come with high-end finishes, including hardwood floors and granite countertops. The building has a fully equipped gym, a children’s play area, and a community room that can be reserved for private events. On the rooftop, residents can enjoy a landscaped garden with seating areas. The building is also pet-friendly and has a dedicated dog park nearby.',
'Sunset Villas е жилищна сграда, която предлага модерни удобства за градски живот. Апартаментите са просторни и разполагат с висококачествени довършителни работи, включително дървени подове и гранитни плотове. Сградата разполага с напълно оборудван фитнес, детска площадка и обща стая, която може да се резервира за частни събития. На покрива жителите могат да се насладят на озеленена градина с места за сядане. Сградата също така допуска домашни любимци и разполага с обособен парк за кучета наблизо.'),

(8, 'Grand Avenue', 2, 6, 2018, 'panel',
'Grand Avenue is a community-centered low-rise structure, designed to serve as a multi-purpose facility for local residents. The building houses a community center, library, and several spaces for workshops and meetings. Its modern design emphasizes functionality, with eco-friendly materials used throughout the building. A large central atrium acts as a communal space, where locals can gather for events or socializing. Outside, there is a children’s playground and an outdoor seating area. The building is easily accessible, with ramps and elevators to ensure it is inclusive for all.',
'Grand Avenue е нискоетажна структура, предназначена да служи като многофункционален обект за местните жители. Сградата помещава обществен център, библиотека и няколко зали за работилници и срещи. Модерният ѝ дизайн акцентира върху функционалността, като във всички части на сградата са използвани екологични материали. Голям централен атриум действа като общо пространство, където местните жители могат да се събират за събития или социализиране. Отвън има детска площадка и зона за сядане на открито. Сградата е леснодостъпна, с рампи и асансьори, за да бъде достъпна за всички.'),

(9, 'Emerald Heights', 1, 22, 2011, 'brick',
'Emerald Heights is a towering structure known for its unique architectural design, which has become a landmark in the city. The facade features a combination of glass and brick, creating a striking visual contrast. Inside, the building is equipped with high-end amenities, including a residents’ lounge, gym, and indoor pool. The upper floors offer luxury penthouse apartments with floor-to-ceiling windows, providing sweeping views of the city skyline. The ground floor houses fine dining restaurants and boutique shops.',
'Emerald Heights е внушителна структура, известна със своя уникален архитектурен дизайн, който се превръща в забележителност на града. Фасадата включва комбинация от стъкло и тухла, създавайки впечатляващ визуален контраст. Вътре сградата е оборудвана с висококачествени удобства, включително салон за жители, фитнес и вътрешен басейн. Горните етажи предлагат луксозни пентхаус апартаменти с прозорци от пода до тавана, осигуряващи панорамни гледки към градския силует. Приземният етаж е зает от изискани ресторанти и бутикови магазини.'),

(10, 'Golden Gate Tower', 2, 30, 2022, 'panel',
'Golden Gate Tower is the tallest structure in the district, offering luxury living at its finest. This 30-story high-rise features opulent apartments with private balconies and floor-to-ceiling windows. Each unit comes with its own private elevator, ensuring maximum convenience and privacy for residents. The building’s amenities include a heated rooftop pool, a fully equipped fitness center, and a spa. On the top floors, there are exclusive penthouses with 360-degree views of the city and mountains beyond. Residents also have access to 24/7 concierge services and secure underground parking.',
'Golden Gate Tower е най-високата структура в района, предлагаща луксозен живот от най-висок клас. Този 30-етажен небостъргач разполага с луксозни апартаменти с частни балкони и прозорци от пода до тавана. Всяко жилище има свой собствен частен асансьор, осигуряващ максимално удобство и поверителност за жителите. Удобствата на сградата включват отопляем басейн на покрива, напълно оборудван фитнес и спа център. На горните етажи има ексклузивни пентхауси с 360-градусови гледки към града и планините отвъд. Жителите също имат достъп до 24/7 консиерж услуги и сигурен подземен паркинг.'),

(11, 'Infinity Tower', 1, 10, 2000, 'brick',
'A modern office building located in downtown, Infinity Tower offers state-of-the-art facilities for businesses. The structure boasts energy-efficient systems and open-plan office spaces designed for collaboration. Tenants have access to a rooftop terrace with panoramic views of the city. The lobby is spacious with a contemporary design, featuring marble floors and glass walls. The building includes parking for employees, as well as high-speed elevators to facilitate easy movement between floors.',
'Модерна офис сграда, разположена в центъра на града, Infinity Tower предлага съвременни удобства за бизнеса. Структурата разполага с енергийно ефективни системи и офисни пространства с отворен план, създадени за сътрудничество. Наемателите имат достъп до тераса на покрива с панорамна гледка към града. Лобито е просторно с модерен дизайн, включващ мраморни подове и стъклени стени. Сградата включва паркинг за служители и високоскоростни асансьори, които улесняват движението между етажите.'),

(12, 'Lakeside Residence', 2, 20, 2010, 'panel',
'Lakeside Residence is a high-rise residential tower offering panoramic views of the surrounding cityscape. The building features 20 floors of modern apartments, each designed with large windows to allow for maximum natural light. Residents can enjoy a rooftop garden area with seating and greenery. The building is equipped with high-speed elevators and a secure entry system, ensuring privacy and safety for all occupants. On the ground floor, there are several commercial units, including a café and a small grocery store for convenience.',
'Lakeside Residence е висок жилищен блок, предлагащ панорамна гледка към околния градски пейзаж. Сградата разполага с 20 етажа съвременни апартаменти, всеки проектиран с големи прозорци за максимална естествена светлина. Жителите могат да се насладят на градина на покрива с места за сядане и зеленина. Сградата е оборудвана с високоскоростни асансьори и система за сигурно влизане, осигуряваща поверителност и безопасност за всички обитатели. На приземния етаж има няколко търговски обекта, включително кафе и малък магазин за хранителни стоки.'),

(13, 'Cityscape Plaza', 1, 15, 2005, 'brick',
'Cityscape Plaza is a classic brick structure with deep historical roots in the district. Originally built in the early 20th century, the building has been restored and updated while preserving its original architectural features, including intricate brickwork and arched windows. Inside, the space has been modernized with contemporary amenities, making it ideal for office spaces. The lobby features original wooden beams and restored tile floors, which give it a timeless charm. The building also includes a small museum dedicated to its history.',
'Cityscape Plaza е класическа тухлена структура с дълбоки исторически корени в района. Първоначално построена в началото на 20-ти век, сградата е реставрирана и обновена, като същевременно запазва оригиналните си архитектурни елементи, включително сложна тухлена работа и арковидни прозорци. Вътре пространството е модернизирано с модерни удобства, което го прави идеално за офисни помещения. Лобито разполага с оригинални дървени греди и възстановени плочки на пода, което му придава вечен чар. В сградата има и малък музей, посветен на нейната история.'),

(14, 'Crystal Tower', 2, 8, 2015, 'panel',
'Crystal Tower is an eco-friendly structure built with sustainability in mind. It incorporates solar panels and rainwater collection systems, minimizing its environmental impact. The building is insulated with sustainable materials, which also help regulate temperature and reduce energy consumption. Inside, residents enjoy modern, energy-efficient appliances and a layout designed to maximize natural ventilation. The building is surrounded by a green space, with community gardens and bike racks to encourage a sustainable lifestyle.',
'Crystal Tower е екологична структура, построена с мисъл за устойчивост. Включва соларни панели и системи за събиране на дъждовна вода, минимизирайки нейното въздействие върху околната среда. Сградата е изолирана с устойчиви материали, които също помагат за регулиране на температурата и намаляване на енергийната консумация. Вътре жителите се радват на съвременни енергийно ефективни уреди и оформление, проектирано да максимизира естествената вентилация. Сградата е заобиколена от зелени площи с обществени градини и стойки за велосипеди, за да насърчи устойчивия начин на живот.'),

(15, 'Mountain View Apartments', 1, 25, 2020, 'brick',
'Mountain View Apartments is a state-of-the-art structure, featuring a sleek glass facade that reflects the skyline. It stands at 25 stories tall and offers both residential and commercial spaces. The building is equipped with the latest in smart-home technology, allowing residents to control everything from lighting to security systems remotely. The ground floor contains luxury retail stores and fine dining restaurants. Residents can enjoy a private rooftop lounge with a pool, offering spectacular views of the city. High-speed internet and private parking are included in all units.',
'Mountain View Apartments е модерна структура с изчистена стъклена фасада, която отразява силуета на града. Тя е висока 25 етажа и предлага както жилищни, така и търговски площи. Сградата е оборудвана с най-новите технологии за интелигентен дом, позволяващи на жителите да контролират всичко – от осветлението до системите за сигурност дистанционно. На приземния етаж се намират луксозни магазини и изискани ресторанти. Жителите могат да се насладят на частен салон на покрива с басейн, който предлага впечатляващи гледки към града. Високоскоростен интернет и частен паркинг са включени за всички жилища.'),

(16, 'The Atrium', 2, 12, 2008, 'panel',
'The Atrium is a mid-rise structure primarily housing commercial spaces. Its modern design features large glass windows, allowing for abundant natural light. The ground floor is occupied by a range of businesses, from retail shops to small offices, making it a bustling hub of activity. The upper floors are designed as open-plan offices, with flexible layouts that can be adapted to tenant needs. The building is equipped with eco-friendly air-conditioning systems and a rooftop solar panel array that powers common areas.',
'The Atrium е средноетажна структура, която основно предлага търговски площи. Модерният ѝ дизайн включва големи стъклени прозорци, които позволяват изобилно естествено осветление. Приземният етаж е зает от различни бизнеси, от търговски магазини до малки офиси, което я прави оживен център на активност. Горните етажи са проектирани като офиси с отворен план с гъвкави оформления, които могат да се адаптират според нуждите на наемателите. Сградата е оборудвана с екологични климатични системи и слънчеви панели на покрива, които захранват общите части.'),

(17, 'The Majestic', 1, 18, 2012, 'brick',
'The Majestic is a residential building that offers modern amenities for urban living. The apartments are spacious and come with high-end finishes, including hardwood floors and granite countertops. The building has a fully equipped gym, a children’s play area, and a community room that can be reserved for private events. On the rooftop, residents can enjoy a landscaped garden with seating areas. The building is also pet-friendly and has a dedicated dog park nearby.',
'The Majestic е жилищна сграда, която предлага модерни удобства за градски живот. Апартаментите са просторни и разполагат с висококачествени довършителни работи, включително дървени подове и гранитни плотове. Сградата разполага с напълно оборудван фитнес, детска площадка и обща стая, която може да се резервира за частни събития. На покрива жителите могат да се насладят на озеленена градина с места за сядане. Сградата също така допуска домашни любимци и разполага с обособен парк за кучета наблизо.'),

(18, 'Harbor View', 2, 6, 2018, 'panel',
'Harbor View is a community-centered low-rise structure, designed to serve as a multi-purpose facility for local residents. The building houses a community center, library, and several spaces for workshops and meetings. Its modern design emphasizes functionality, with eco-friendly materials used throughout the building. A large central atrium acts as a communal space, where locals can gather for events or socializing. Outside, there is a children’s playground and an outdoor seating area. The building is easily accessible, with ramps and elevators to ensure it is inclusive for all.',
'Harbor View е нискоетажна структура, предназначена да служи като многофункционален обект за местните жители. Сградата помещава обществен център, библиотека и няколко зали за работилници и срещи. Модерният ѝ дизайн акцентира върху функционалността, като във всички части на сградата са използвани екологични материали. Голям централен атриум действа като общо пространство, където местните жители могат да се събират за събития или социализиране. Отвън има детска площадка и зона за сядане на открито. Сградата е леснодостъпна, с рампи и асансьори, за да бъде достъпна за всички.'),

(19, 'The Galleria', 1, 22, 2011, 'brick',
'The Galleria is a towering structure known for its unique architectural design, which has become a landmark in the city. The facade features a combination of glass and brick, creating a striking visual contrast. Inside, the building is equipped with high-end amenities, including a residents’ lounge, gym, and indoor pool. The upper floors offer luxury penthouse apartments with floor-to-ceiling windows, providing sweeping views of the city skyline. The ground floor houses fine dining restaurants and boutique shops.',
'Сграда Девет е внушителна структура, известна със своя уникален архитектурен дизайн, който се превръща в забележителност на града. Фасадата включва комбинация от стъкло и тухла, създавайки впечатляващ визуален контраст. Вътре сградата е оборудвана с висококачествени удобства, включително салон за жители, фитнес и вътрешен басейн. Горните етажи предлагат луксозни пентхаус апартаменти с прозорци от пода до тавана, осигуряващи панорамни гледки към градския силует. Приземният етаж е зает от изискани ресторанти и бутикови магазини.'),

(20, 'Silver Springs', 2, 30, 2022, 'panel',
'Building Ten is the tallest structure in the district, offering luxury living at its finest. This 30-story high-rise features opulent apartments with private balconies and floor-to-ceiling windows. Each unit comes with its own private elevator, ensuring maximum convenience and privacy for residents. The building’s amenities include a heated rooftop pool, a fully equipped fitness center, and a spa. On the top floors, there are exclusive penthouses with 360-degree views of the city and mountains beyond. Residents also have access to 24/7 concierge services and secure underground parking.',
'Сграда Десет е най-високата структура в района, предлагаща луксозен живот от най-висок клас. Този 30-етажен небостъргач разполага с луксозни апартаменти с частни балкони и прозорци от пода до тавана. Всяко жилище има свой собствен частен асансьор, осигуряващ максимално удобство и поверителност за жителите. Удобствата на сградата включват отопляем басейн на покрива, напълно оборудван фитнес и спа център. На горните етажи има ексклузивни пентхауси с 360-градусови гледки към града и планините отвъд. Жителите също имат достъп до 24/7 консиерж услуги и сигурен подземен паркинг.');



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