USE [master]
GO

IF db_id('BehindTheSeams') IS NULL
  CREATE DATABASE [BehindTheSeams]
GO

USE [BehindTheSeams]
GO

DROP TABLE IF EXISTS [PatternImage];
DROP TABLE IF EXISTS [ProjectImage];
DROP TABLE IF EXISTS [FabricImage];
DROP TABLE IF EXISTS [ProjectNotes];
DROP TABLE IF EXISTS [ProjectFabric];
DROP TABLE IF EXISTS [File];
DROP TABLE IF EXISTS [Project];
DROP TABLE IF EXISTS [ProjectStatus];
DROP TABLE IF EXISTS [PatternSize];
DROP TABLE IF EXISTS [Fabric];
DROP TABLE IF EXISTS [Pattern];
DROP TABLE IF EXISTS [Retailer];
DROP TABLE IF EXISTS [Category];
DROP TABLE IF EXISTS [Publisher];
DROP TABLE IF EXISTS [FabricType];
DROP TABLE IF EXISTS [Size];
DROP TABLE IF EXISTS [User];

CREATE TABLE [Pattern] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Url] nvarchar(255),
  [UserId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [PublisherId] integer NOT NULL,
  [PurchaseDate] datetime NOT NULL,
  [FabricTypeId] integer NOT NULL,
  [Notes] nvarchar(MAX),
  [CategoryId] integer NOT NULL
)
GO

CREATE TABLE [PatternImage] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Url] nvarchar(255) NOT NULL,
  [PatternId] integer NOT NULL,
  [IsCover] BIT NOT NULL DEFAULT 1
)
GO

CREATE TABLE [ProjectImage] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Url] nvarchar(255) NOT NULL,
  [ProjectId] integer NOT NULL,
  [Caption] nvarchar(255)
)
GO

CREATE TABLE [FabricImage] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Url] nvarchar(255) NOT NULL,
  [FabricId] integer NOT NULL
)
GO

CREATE TABLE [Project] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [UserId] integer NOT NULL,
  [PatternId] integer NOT NULL,
  [ProjectStatusId] integer NOT NULL DEFAULT 1,
  [CreateDateTime] datetime NOT NULL,
  [PatternSizeId] integer NOT NULL,
  [IsComplete] bit NOT NULL DEFAULT 0
)
GO

CREATE TABLE [Category] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ProjectStatus] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [ProjectNotes] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [ProjectId] integer NOT NULL,
  [Text] nvarchar(MAX) NOT NULL
)
GO

CREATE TABLE [ProjectFabric] (
  [Id] int PRIMARY KEY IDENTITY NOT NULL,
  [ProjectId] integer NOT NULL,
  [FabricId] integer NOT NULL,
  [Yards] decimal(18,4)
)
GO

CREATE TABLE [User] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [UserName] nvarchar(255) NOT NULL,
  [FirebaseUserId] nvarchar(255) NOT NULL,
  [Email] nvarchar(255) NOT NULL,
  [RegisterDateTime] datetime NOT NULL,
  [IsAdministrator] bit NOT NULL DEFAULT 0
)
GO

CREATE TABLE [File] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Path] nvarchar(255) NOT NULL,
  [PatternId] integer NOT NULL
)
GO

CREATE TABLE [Publisher] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Url] nvarchar(255)
)
GO

CREATE TABLE [Size] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Abbreviation] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [Fabric] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [RetailerId] integer NOT NULL,
  [UserId] integer NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Url] nvarchar(255),
  [PricePerYard] decimal(12,2),
  [YardsInStock] decimal(18,4) NOT NULL DEFAULT 0,
  [FabricTypeId] integer NOT NULL,
  [Notes] nvarchar(MAX)
)
GO

CREATE TABLE [Retailer] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL,
  [Url] nvarchar(255)
)
GO

CREATE TABLE [PatternSize] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [PatternId] integer NOT NULL,
  [SizeId] integer NOT NULL,
  [Yards] decimal(18,4)
)
GO

CREATE TABLE [FabricType] (
  [Id] integer PRIMARY KEY IDENTITY NOT NULL,
  [Name] nvarchar(255) NOT NULL
)
GO

ALTER TABLE [Fabric] ADD FOREIGN KEY ([RetailerId]) REFERENCES [Retailer] ([Id])
GO

ALTER TABLE [Pattern] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Pattern] ADD FOREIGN KEY ([PublisherId]) REFERENCES [Publisher] ([Id])
GO

ALTER TABLE [PatternSize] ADD FOREIGN KEY ([PatternId]) REFERENCES [Pattern] ([Id])
GO

ALTER TABLE [PatternSize] ADD FOREIGN KEY ([SizeId]) REFERENCES [Size] ([Id])
GO

ALTER TABLE [File] ADD FOREIGN KEY ([PatternId]) REFERENCES [Pattern] ([Id])
GO

ALTER TABLE [Fabric] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [ProjectFabric] ADD FOREIGN KEY ([FabricId]) REFERENCES [Fabric] ([Id])
GO

ALTER TABLE [ProjectFabric] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([UserId]) REFERENCES [User] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([PatternSizeId]) REFERENCES [PatternSize] ([Id])
GO

ALTER TABLE [ProjectNotes] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [Fabric] ADD FOREIGN KEY ([FabricTypeId]) REFERENCES [FabricType] ([Id])
GO

ALTER TABLE [Pattern] ADD FOREIGN KEY ([FabricTypeId]) REFERENCES [FabricType] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([PatternId]) REFERENCES [Pattern] ([Id])
GO

ALTER TABLE [Project] ADD FOREIGN KEY ([ProjectStatusId]) REFERENCES [ProjectStatus] ([Id])
GO

ALTER TABLE [Pattern] ADD FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id])
GO

ALTER TABLE [PatternImage] ADD FOREIGN KEY ([PatternId]) REFERENCES [Pattern] ([Id])
GO

ALTER TABLE [ProjectImage] ADD FOREIGN KEY ([ProjectId]) REFERENCES [Project] ([Id])
GO

ALTER TABLE [FabricImage] ADD FOREIGN KEY ([FabricId]) REFERENCES [Fabric] ([Id])
GO
