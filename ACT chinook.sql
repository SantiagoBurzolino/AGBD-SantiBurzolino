
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
SELECT t.name as "cancion", g.name as "genero", a.Title as "Nombre del disco" FROM albums a
INNER JOIN tracks t ON t.albumid = a.albumid
INNER JOIN gender g ON t.GenreId = g.GenreId
WHERE t.UnitPrice = "0,99"