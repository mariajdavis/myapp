DROP TABLE IF EXISTS expenses;

CREATE TABLE IF NOT EXISTS expenses (
    name VARCHAR(255) NOT NULL,
    cost DOUBLE NOT NULL,
    category ENUM('Groceries', 'Clothing', 'Entertainment', 'Housing', 'Other')
);


INSERT INTO expenses (name, cost, category) VALUES
('T-shirt', 20.50, 'Clothing'),
('Pants', 40.00, 0),
('Raspberries', 6.00, 'Groceries');