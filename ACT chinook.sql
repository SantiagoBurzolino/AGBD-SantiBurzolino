
/*
Act 1
*/
SELECT c.first_name as Nombre, c.last_name as Apellido FROM customers c
ORDER BY Nombre, Apellido ASC
/*
Act 2
*/
SELECT t.Name, a.title , t.milliseconds   FROM tracks t
INNER JOIN albumid a on a.albumid = t.albumid
WHERE a.title = "Big Ones"
ORDER BY t.milliseconds DESC

/*
Act 3
*/
SELECT g.name, count(g.name) as "Cantidad de Canciones"   FROM genres g
INNER JOIN tracks t on g.GenreId = t.GenreId
GROUP BY g.name

/*
Act 4
*/
SELECT g.name, count(g.name) as "Cantidad de Canciones"   FROM genres g
INNER JOIN tracks t on g.GenreId = t.GenreId
GROUP BY g.name


/*
Act 5
*/
SELECT a.Title, SUM(t.UnitPrice) AS "Precio Total" FROM albums a
INNER JOIN tracks t ON t.AlbumId = a.AlbumId
GROUP BY a.Title
ORDER BY "Precio Total" ASC
LIMIT 10;



/*
Act 6
*/
SELECT t.name as "cancion", g.name as "genero", a.Title as "Nombre del disco" FROM albums a
INNER JOIN tracks t ON t.albumid = a.albumid
INNER JOIN gender g ON t.GenreId = g.GenreId
WHERE t.UnitPrice = "0,99"

/*
Act 7
*/
SELECT t.name AS "Cancion", t.Milliseconds AS "Duracion", a.Title AS "Nombre del Disco", art.name AS "Artista" FROM albums a
INNER JOIN tracks t ON t.AlbumId = a.AlbumId
INNER JOIN genres g ON t.GenreId = g.GenreId
INNER JOIN artists art ON a.ArtistId = art.ArtistId
ORDER BY t.Milliseconds ASC
LIMIT 20;

/*
Act 8
*/
SELECT e.LastName, e.Title AS "puesto Trabajo", em.LastName AS "Apellido de su jefe", count(c.CustomerId) AS "Cantidad de clientes"  
FROM employees e
INNER JOIN employees em ON em.ReportsTo = e.EmployeeId
INNER JOIN customers c On em.EmployeeId = c.SupportRepId
GROUP BY em.EmployeeId
ORDER BY "Cantidad de clientes" DESC;
/*
Act 9
*/
INSERT INTO tracks (name, MediaTypeId, Composer, Milliseconds, Bytes,UnitPrice)
VALUES
('Mozo goti', 2, 'Don perez', 1776, 2498695, 1.60),
('poti', 2, 'Don perez', 1776, 1498695, 1.92),
('goti', 2, 'Don perez', 1776, 3498695, 1.00),
('rozi', 2, 'Don perez', 1776, 7498695, 1.38)

/*
Act 10
*/
SELECT * FROM tracks
WHERE Composer = "Don perez"

/*
Act 11
*/
UPDATE tracks
SET name = "ave maria",
AlbumId = NULL,
Composer = 'eduard',
Milliseconds = 3965465
WHERE TrackId = 3502;

UPDATE tracks
SET name = "El diablo",
AlbumId = NULL,
Composer = 'Pasito de uva',
Milliseconds = 2890007
WHERE TrackId = 3503;

/*
Act 12
*/
SELECT * FROM tracks
WHERE TrackId = 3502 or TrackId = 3503

/*
Act 13
*/
DELETE FROM tracks
WHERE TrackId IN (3502, 3506);
