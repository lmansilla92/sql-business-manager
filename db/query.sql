-- QUERIES --

-- View all departments
SELECT * FROM department;

-- View all roles 
SELECT roles.id, roles.title, department.name AS department, roles.salary FROM role AS roles
JOIN department AS department ON roles.department_id = department.id;

-- Add employee
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Luis', 'Mansilla', 4, 3);

-- Add department 
INSERT INTO department (name)
VALUES ('Ownership');

-- Add Role 
INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 300000, 5);

-- Update employee role 
UPDATE employee
SET employee.role_id = 9
WHERE employee.first_name  = 'Luis';


-- View all employees TODO
SELECT emp.id, emp.first_name, emp.last_name, title, name AS department, salary, manager.first_name AS manager FROM employee AS emp
JOIN role ON role.id = emp.role_id
JOIN department ON department.id = role.department_id
JOIN employee AS manager ON manager.id = emp.manager_id;

-- Quit