-- QUERIES --

-- View all departments
SELECT * FROM department ORDER BY name;

-- View all roles 
SELECT roles.id, roles.title, department.name AS department, roles.salary FROM role AS roles
JOIN department AS department ON roles.department_id = department.id
ORDER BY roles.title;

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
SET employee.role_id = 8
WHERE CONCAT(employee.first_name, ' ', employee.last_name) = 'Luis Mansilla';


-- View all employees
SELECT emp.id, emp.first_name, emp.last_name, title, name AS department, salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee AS emp
JOIN role ON role.id = emp.role_id
JOIN department ON department.id = role.department_id
LEFT JOIN employee manager on manager.id = emp.manager_id
ORDER BY emp.first_name;

-- BONUS --

-- Update employee manager --
UPDATE employee
SET manager_id = NULL
WHERE employee.first_name = 'Luis';

-- View employees by manger --
-- First get id of manager by first name and last name
SELECT id FROM employee
WHERE employee.first_name = 'John' AND employee.last_name = 'Doe';
-- Then, get employees where manager_id equals the manager's id
SELECT CONCAT(first_name, ' ', last_name) AS employee FROM employee
WHERE employee.manager_id = 1
GROUP BY employee;

-- View employees by department -- 
-- First get id of selected department 
SELECT id FROM department
WHERE department.name = 'Sales';
-- Then, get all id of roles WHERE role.department_id = role.id
SELECT id FROM role
WHERE role.department_id = 1;
-- Then, get employee first name and last name where employee.role_id = role.id OR employee.role_id = role.id
SELECT CONCAT(first_name, ' ', last_name) as employees FROM employee
WHERE employee.role_id = 1 OR employee.role_id = 2;

-- Delete department --
DELETE FROM department WHERE department.name = 'Ownership';

-- Delete role --
DELETE FROM role WHERE role.title = 'CEO';

-- Delete employee --
DELETE FROM employee WHERE CONCAT(first_name, ' ', last_name) = 'Luis Mansilla';

-- Quit

