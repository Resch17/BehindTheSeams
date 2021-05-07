USE [BehindTheSeams];
GO

set IDENTITY_INSERT [User] ON
INSERT INTO [User] ([ID], [UserName], [FirebaseUserId], [Email], [RegisterDateTime], [IsAdministrator])
VALUES (1, 'Admin', 'i79KRygrWgRR9nZGeRd3JxGBSnc2', 'aaronmresch@gmail.com', SYSDATETIME(), 1);
INSERT INTO [User] ([ID], [UserName], [FirebaseUserId], [Email], [RegisterDateTime], [IsAdministrator])
VALUES (2, 'TestUser54481', 'ClRVNgCR0AVYEw9F5bozqnrcUDk2', 'test@example.com', SYSDATETIME(), 0);
set IDENTITY_INSERT [User] OFF

set IDENTITY_INSERT [Category] ON
INSERT INTO [Category] ([Id],[Name]) VALUES (1, 'Dresses');
INSERT INTO [Category] ([Id],[Name]) VALUES (2, 'Pajamas');
INSERT INTO [Category] ([Id],[Name]) VALUES (3, 'Swimwear');
INSERT INTO [Category] ([Id],[Name]) VALUES (4, 'Pets');
INSERT INTO [Category] ([Id],[Name]) VALUES (5, 'Corsets');
INSERT INTO [Category] ([Id],[Name]) VALUES (6, 'Underwear');
INSERT INTO [Category] ([Id],[Name]) VALUES (7, 'Men''s Shirts');
INSERT INTO [Category] ([Id],[Name]) VALUES (8, 'Men''s Pants');
INSERT INTO [Category] ([Id],[Name]) VALUES (9, 'Women''s Shirts');
INSERT INTO [Category] ([Id],[Name]) VALUES (10, 'Women''s Pants');
INSERT INTO [Category] ([Id],[Name]) VALUES (11, 'Kid''s Shirts');
INSERT INTO [Category] ([Id],[Name]) VALUES (12, 'Kid''s Pants');
INSERT INTO [Category] ([Id],[Name]) VALUES (13, 'Other');
set IDENTITY_INSERT [Category] OFF

set IDENTITY_INSERT [ProjectStatus] ON
INSERT INTO [ProjectStatus] ([Id], [Name]) VALUES (1, 'Not Started');
INSERT INTO [ProjectStatus] ([Id], [Name]) VALUES (2, 'Fabric Ordered');
INSERT INTO [ProjectStatus] ([Id], [Name]) VALUES (3, 'Fabric Cut');
INSERT INTO [ProjectStatus] ([Id], [Name]) VALUES (4, 'Sewing Started');
INSERT INTO [ProjectStatus] ([Id], [Name]) VALUES (5, 'Complete');
set IDENTITY_INSERT [ProjectStatus] OFF

set IDENTITY_INSERT [Size] ON
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (1, '00', '00');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (2, '0', '0');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (3, '2', '2');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (4, '4', '4');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (5, '6', '6');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (6, '8', '8');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (7, '10', '10');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (8, '12', '12');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (9, '14', '14');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (10, '16', '16');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (11, '18', '18');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (12, '20', '20');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (13, 'XS', 'XS');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (14, 'S', 'S');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (15, 'M', 'M');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (16, 'L', 'L');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (17, 'XL', 'XL');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (18, '2X', '2X');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (19, '3X', '3X');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (20, '4X', '4X');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (21, '12-18', '12-18');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (22, '18-24', '18-24');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (23, '2T', '2T');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (24, '3T', '3T');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (25, '5', '5');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (26, '7', '7');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (27, 'Newborn', 'N');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (28, '3-6', '3-6');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (29, '6-12', '6-12');
INSERT INTO [Size] ([Id], [Name], [Abbreviation]) VALUES (30, 'Other', 'N/A');
set IDENTITY_INSERT [Size] OFF

set IDENTITY_INSERT [Publisher] ON
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (1, 'Ellie & Mac', 'https://www.ellieandmac.com/');
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (2, 'True Bias', 'https://shop.truebias.com/');
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (3, 'Closet Core', 'https://www.closetcorepatterns.com/');
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (4, 'Peek-a-Boo', 'https://www.peekaboopatternshop.com/');
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (5, 'Rad Patterns', 'https://www.radpatterns.com/');
INSERT INTO [Publisher] ([Id], [Name], [Url]) VALUES (6, 'Seamwork', 'https://www.seamwork.com/');
INSERT INTO [Publisher] ([Id], [Name]) VALUES (7, 'Other');
set IDENTITY_INSERT [Publisher] OFF

set IDENTITY_INSERT [Retailer] ON
INSERT INTO [Retailer] ([Id], [Name], [Url]) VALUES (1, 'KnitFabric.com', 'https://knitfabric.com/');
INSERT INTO [Retailer] ([Id], [Name], [Url]) VALUES (2, 'Raspberry Creek', 'https://raspberrycreekfabrics.com/');
INSERT INTO [Retailer] ([Id], [Name], [Url]) VALUES (3, 'Mily Mae Fabrics', 'https://milymaefabricshop.com/');
INSERT INTO [Retailer] ([Id], [Name], [Url]) VALUES (4, 'Threadbear Textile Co', 'https://threadbeartextileco.com/');
INSERT INTO [Retailer] ([Id], [Name], [Url]) VALUES (5, 'Joann', 'https://www.joann.com/');
INSERT INTO [Retailer] ([Id], [Name]) VALUES (6, 'Other');
set IDENTITY_INSERT [Retailer] OFF

set IDENTITY_INSERT [FabricType] ON
INSERT INTO [FabricType] ([Id], [Name]) VALUES (1, 'Knit');
INSERT INTO [FabricType] ([Id], [Name]) VALUES (2, 'Woven');
INSERT INTO [FabricType] ([Id], [Name]) VALUES (3, 'Other');
set IDENTITY_INSERT [FabricType] OFF

set IDENTITY_INSERT [Pattern] ON
INSERT INTO [Pattern] ([Id], [Url], [UserId], [Name], [PublisherId], [PurchaseDate], [FabricTypeId], [Notes], [CategoryId]) VALUES (1, 'https://www.seamwork.com/catalog/gabrielle', 2, 'Gabrielle Skater Dress', 6, SYSDATETIME(), 1, 'This pattern runs a little small... all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl', 1);
INSERT INTO [Pattern] ([Id], [Url], [UserId], [Name], [PublisherId], [PurchaseDate], [FabricTypeId], [Notes], [CategoryId]) VALUES (2, 'https://shop.truebias.com/product/hudson-pant', 2, 'Hudson Pant', 2, SYSDATETIME(), 1, 'This pattern runs a little small... all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl all work and no play makes Marty a dull girl', 10);
set IDENTITY_INSERT [Pattern] OFF

set IDENTITY_INSERT [PatternSize] ON
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (1, 1, 13, 2.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (2, 1, 14, 2.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (3, 1, 15, 2.625);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (4, 1, 16, 2.625);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (5, 1, 17, 2.75);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (6, 1, 18, 4.125);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (7, 1, 19, 4.25);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (8, 2, 2, 1.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (9, 2, 3, 1.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (10, 2, 4, 1.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (11, 2, 5, 1.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (12, 2, 6, 1.5);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (13, 2, 7, 1.75);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (14, 2, 8, 1.75);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (15, 2, 9, 1.75);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (16, 2, 10, 2);
INSERT INTO [PatternSize] ([Id], [PatternId], [SizeId], [Yards]) VALUES (17, 2, 11, 2);
set IDENTITY_INSERT [PatternSize] OFF

set IDENTITY_INSERT [Fabric] ON
INSERT INTO [Fabric] ([Id], [RetailerId], [UserId], [Name], [Url], [PricePerYard], [YardsInStock], [FabricTypeId], [Notes]) VALUES (1, 1, 2, 'Washed Pink Dye UV 50+ Nylon Spandex', 'https://knitfabric.com/washed-pink-dye-uv-50-nylon-spandex/', 16, 5.5, 1, 'This fabric is kinda ugly tbh');
INSERT INTO [Fabric] ([Id], [RetailerId], [UserId], [Name], [Url], [PricePerYard], [YardsInStock], [FabricTypeId], [Notes]) VALUES (2, 3, 2, 'Vertical Rainbow Brushed Poly', 'https://milymaefabricshop.com/collections/brushed-poly/products/vertical-rainbow', 8.50, 3, 1, 'This fabric is kinda amazing tbh');
set IDENTITY_INSERT [Fabric] OFF

set IDENTITY_INSERT [Project] ON
INSERT INTO [Project] ([Id], [Name], [UserId], [PatternId], [ProjectStatusId], [PatternSizeId], [CreateDateTime])
    VALUES (1, 'Tie-dye Pants for Amanda', 2, 2, 3, 10, SYSDATETIME());
INSERT INTO [Project] ([Id], [Name], [UserId], [PatternId], [ProjectStatusId], [PatternSizeId], [CreateDateTime])
    VALUES (2, 'Awesome Dress', 2, 1, 2, 2, SYSDATETIME());
set IDENTITY_INSERT [Project] OFF

set IDENTITY_INSERT [ProjectFabric] ON
INSERT INTO [ProjectFabric] ([Id], [ProjectId], [FabricId], [Yards])
    VALUES (1, 1, 1, 1.5);
INSERT INTO [ProjectFabric] ([Id], [ProjectId], [FabricId], [Yards])
    VALUES (2, 2, 2, 2.5);
set IDENTITY_INSERT [ProjectFabric] OFF

set IDENTITY_INSERT [ProjectNotes] ON
INSERT INTO [ProjectNotes] ([Id], [ProjectId], [Text]) VALUES (1, 1, 'See if Amanda really wants these to be pink');
INSERT INTO [ProjectNotes] ([Id], [ProjectId], [Text]) VALUES (2, 2, 'Seriously, this dress needs to happen');
set IDENTITY_INSERT [ProjectNotes] OFF

set IDENTITY_INSERT [PatternImage] ON
INSERT INTO [PatternImage] ([Id], [PatternId], [Url], [IsCover]) VALUES (1, 1, 'https://www.seamwork.com/media/products/catalog/3060/3060-185e9c4e.jpg', 1);
INSERT INTO [PatternImage] ([Id], [PatternId], [Url], [IsCover]) VALUES (2, 1, 'https://www.seamwork.com/media/products/catalog/3060/3060-77198d26.jpg', 0);
INSERT INTO [PatternImage] ([Id], [PatternId], [Url], [IsCover]) VALUES (3, 1, 'https://www.seamwork.com/media/products/catalog/3060/3060-50eb4d92.jpg', 0);
INSERT INTO [PatternImage] ([Id], [PatternId], [Url], [IsCover]) VALUES (4, 2, 'https://assets.bigcartel.com/product_images/202839518/Hudson+pant+hero-1354.jpg', 1)
set IDENTITY_INSERT [PatternImage] OFF

set IDENTITY_INSERT [FabricImage] ON
INSERT INTO [FabricImage] ([Id], [FabricId], [Url])
VALUES (1, 1, 'https://cdn11.bigcommerce.com/s-daswymv3tx/images/stencil/960w/products/10993/10870/BTP1129C1__06531__87656.1615479451.jpg');
INSERT INTO [FabricImage] ([Id], [FabricId], [Url])
VALUES (2, 2, 'https://cdn.shopify.com/s/files/1/2281/1887/products/image_837d2ccd-fecf-4066-912e-ea2ba00e6d5f_720x.png');
set IDENTITY_INSERT [FabricImage] OFF

set IDENTITY_INSERT [File] ON
INSERT INTO [File] ([Id], [Name], [Path], [PatternId])
VALUES (1, 'Instructions', 'https://drive.google.com/file/d/1TXZtqm37JcVOxUHNknKURxf8R16qFqF4/view?usp=sharing', 1)
set IDENTITY_INSERT [File] OFF
