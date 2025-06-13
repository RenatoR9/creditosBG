--ejeuctar primero roles 
INSERT INTO Roles (RoleName) VALUES ('Solicitante');
INSERT INTO Roles (RoleName) VALUES ('Analista');


--luego de que se ejeuciuto roles ejecutar usuarios
--encriptada la contraseniaa
--usuario 1 es Solicitante y usuario2 es Analista
INSERT INTO Users (Username, PasswordUser, RoleId)
VALUES ('usuario1', 'AQAAAAIAAYagAAAAEJdyx2wPmQgvTOwrlM4hsFJ2o9o9ca/qu+0z7ze+rtz0c3s8kMzlyIboF5oORY+7UQ==', 1),
('usuario2', 'AQAAAAIAAYagAAAAEJdyx2wPmQgvTOwrlM4hsFJ2o9o9ca/qu+0z7ze+rtz0c3s8kMzlyIboF5oORY+7UQ==', 2)