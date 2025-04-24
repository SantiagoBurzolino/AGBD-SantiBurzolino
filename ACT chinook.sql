
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
 
 