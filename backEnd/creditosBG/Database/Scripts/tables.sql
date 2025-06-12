-- Tabla de Roles
CREATE TABLE Roles (
    Id INT PRIMARY KEY IDENTITY(1,1),
    RoleName NVARCHAR(50) NOT NULL
);

-- Tabla Usuarios
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(100) NOT NULL,
    PasswordUser NVARCHAR(255) NOT NULL,
    RoleId INT NOT NULL,
    FOREIGN KEY (RoleId) REFERENCES Roles(Id)
);

-- Tabla de Solicitud de credito
CREATE TABLE CreditRequests (
    Id INT PRIMARY KEY IDENTITY(1,1),
    AmountRequested DECIMAL(18,2) NOT NULL,
    TermInMonths INT NOT NULL,
    MonthlyIncome DECIMAL(18,2) NOT NULL,
    WorkSeniorityYears INT NOT NULL,
    Status NVARCHAR(20) NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);

CREATE TABLE AuditLogs (
    Id INT PRIMARY KEY IDENTITY(1,1),
    CreationDate DATETIME NOT NULL DEFAULT GETDATE(),
	UserId INT NOT NULL,
	Details NVARCHAR(MAX) NULL, 
    Entity NVARCHAR(100) NOT NULL,              
    EntityId INT NULL,
	OldStatus NVARCHAR(100) NOT NULL,
	NewStatus NVARCHAR(100) NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
