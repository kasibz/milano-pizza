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

INSERT INTO PRODUCT (IMAGE, NAME, PRICE, DISCOUNT)
VALUES ('https://m.media-amazon.com/images/I/71iPemjZX1L.jpg', 'Soda - 2 Liter bottle', 3.25, 0),
('https://preppykitchen.com/wp-content/uploads/2023/01/Breadsticks-Recipe-Card.jpg', 'Breadsticks - 8 per pack', 2.50, 0),
('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeJnSntCm4vj-d36czkdis_R8ocXUNdOWBUWPeXv8MEQ&s', 'Pizza - small Pepperoni - 8 inch', 7.35, 5),
('https://images.gopuff.com/blob/gopuffcatalogstorageprod/catalog-images-container/resize/cf/version=1_0,format=auto,fit=scale-down,width=800,height=800/6f6260c4-f96c-4e9b-90a5-82dd465989a1.jpg', 'Pizza - medium Pepperoni - 12 inch', 9.35, 15),
('https://piarapizza.com/wp-content/uploads/2016/03/hm-btm-slider-pep-pizza-201805.png', 'Pizza - large Pepperoni - 18 inch', 14.00, 20),
('https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/avyziwhj/ef1970e2-0ad0-4897-b548-6b0d9d1e1c32.jpg', 'Pizza - small House special - 8 inch', 8.50, 50),
('https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/poskblea/4a8132d2-aafb-4c54-ae80-2e7a9cc247f9.jpg', 'Pizza - medium House special - 12 inch', 10.50, 5),
('https://popmenucloud.com/cdn-cgi/image/width%3D1200%2Cheight%3D1200%2Cfit%3Dscale-down%2Cformat%3Dauto%2Cquality%3D60/avyziwhj/5f7681f4-c1b5-40cc-b847-dc30720ded24.jpg', 'Pizza - large House special - 18 inch', 16.00, 0);

INSERT INTO EMPLOYEE (FIRST_NAME, LAST_NAME, STATUS)
VALUES ('Kasib', 'Abdullah', 1),
('Junhan', 'An', 1),
('John', 'Suero', 1),
('Alyssa', 'Ramroop', 0);

--Has to link on existing telephone and employee id, this makes a new order but
-- needs order details (an item and quantity)
INSERT INTO CUSTOMER_ORDER (TELEPHONE_ID, EMPLOYEE_ID, CUSTOMER_ORDER_DATE)
VALUES (987654321, 2, '2023-11-10T09:30:00'),
          (876543210, 3, '2023-11-11T14:15:00'),
          (765432109, 1, '2023-11-11T11:45:00'),
          (654321098, 2, '2023-11-13T13:00:00'),
          (543210987, 3, '2023-11-14T10:30:00'),
          (432109876, 1, '2023-11-15T16:45:00'),
          (321098765, 2, '2021-10-16T11:00:00'),
          (210987654, 3, '2021-02-17T15:15:00'),
          (109876543, 1, '2022-04-18T11:00:00'),
          (998877665, 2, '2022-07-19T14:30:00');

-- scope Id is just for the customer_order
INSERT INTO ORDER_DETAIL (CUSTOMER_ORDER_ID, PRODUCT_ID, DISCOUNT, ORDER_DATE, QUANTITY, SUB_TOTAL)
    VALUES (1, 1, 0, '2023-11-10T09:30:00', 2, 6.50),
    (1, 3, 5, '2023-11-10T09:30:00', 3, 21.00),
    (1, 5, 20, '2023-11-10T09:30:00', 1, 14.00),
    (2, 8, 0, '2023-11-11T14:15:00', 2, 26.45),
    (2, 1, 0, '2023-11-11T14:15:00', 1, 4.00),
    (3, 1, 0, '2023-11-11T11:45:00', 3, 19.27),
    (3, 3, 5, '2023-11-11T11:45:00', 1, 11.90),
    (4, 8, 0, '2023-11-17T15:15:00', 2, 32.00),
    (5, 1, 0, '2023-11-18T11:00:00', 2, 13.00),
    (5, 3, 5, '2023-11-19T14:30:00', 1, 8.25),
    (6, 7, 5, '2023-11-13T13:00:00', 2, 26.45),
    (7, 2, 0, '2023-11-14T10:30:00', 1, 4.00),
    (8, 4, 15, '2023-11-15T16:45:00', 3, 19.27),
    (9, 6, 50, '2023-11-16T11:00:00', 1, 11.90),
    (10, 8, 0, '2023-11-17T15:15:00', 2, 32.00),
    (10, 1, 0, '2023-11-18T11:00:00', 2, 13.00);