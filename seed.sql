
INSERT INTO department (name)
VALUES ("Marketing"), ("Finance"), ("HR"), ("IT");



INSERT INTO role (title, salary, department_id)
VALUES ("Sales Rep", 58000, 1),
        ("Marketing Manager", 96000, 1),
        ("Accountant", 50000, 2),
        ("Customer Service", 31000, 3),
        ("IT Rep", 48000, 4),
        ("Operations Manager", 100000, 3);
        


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Will", "Smith", 2, null),
        ("Scarlett", "Johanson", 6, null),
        ("Muhammed", "Ali", 1, 1),
        ("Michael", "Jordan", 1, 1),
        ("Johnson", "Pham", 1, 1),
        ("Magic", "Johnson", 3, 1),
        ("Elon", "Musk", 4, 2),
        ("Elizabeth", "Lee", 4, 2),
        ("Bobby", "Sporman", 5, 2),
        ("Sarah", "Abouelela", 5, 2);  