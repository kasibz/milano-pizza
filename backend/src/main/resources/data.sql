INSERT INTO ZIPCODE (ZIPCODEID, STATE, CITY)
VALUES (55501, 'NJ', 'Somerset'),
    (55502, 'GA', 'Atlanta'),
    (55503, 'TX', 'El Paso'),
    (55504, 'IL', 'Chicago');

INSERT INTO CUSTOMER (TELEPHONEID, STREET_ADDRESS, ZIPCODE_ID)
VALUES (915777987, '2933 Regent', 55501),
 (987654321, '456 Elm St', 55501),
 (876543210, '789 Oak St', 55501),
 (765432109, '321 Maple St', 55502),
 (654321098, '234 Pine St', 55502),
 (543210987, '567 Birch St', 55502),
 (432109876, '890 Cedar St', 55503),
 (321098765, '123 Spruce St', 55503),
 (210987654, '456 Redwood St', 55503),
 (109876543, '789 Willow St', 55504),
 (998877665, '321 Cypress St', 55504),
 (887766554, '654 Sycamore St', 55504);

INSERT INTO PRODUCT (IMAGE, NAME, PRICE)
VALUES ('https://m.media-amazon.com/images/I/71iPemjZX1L.jpg', 'Soda - 2 Liter bottle', 3.25),
('', 'Breadsticks - 8 per pack', 2.50),
('', 'Pizza - small Pepperoni - 8 inch', 7.35),
('', 'Pizza - medium Pepperoni - 12 inch', 9.35),
('', 'Pizza - large Pepperoni - 18 inch', 14.00),
('', 'Pizza - small House special - 8 inch', 8.50),
('', 'Pizza - medium House special - 12 inch', 10.50),
('', 'Pizza - large House special - 18 inch', 16.00),