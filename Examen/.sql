
/*
Act 1
*/
SELECT a.Title AS "Nombre", COUNT(t.TrackId) AS "Cantidad de Canciones" FROM albums a
INNER JOIN tracks t ON a.AlbumId = t.AlbumId
WHERE a.Title = 'Unplugged'
GROUP BY a.Title
/*
Act 2
*/
SELECT ar.ArtistId, ar.Name AS "Nombre del artista", COUNT(t.TrackId) AS "Numero de canciones" FROM artists ar
INNER JOIN albums a ON ar.ArtistId = a.ArtistId
INNER JOIN tracks t ON a.AlbumId = t.AlbumId
GROUP BY ar.ArtistId, ar.Name
HAVING COUNT(t.TrackId) >= 30
ORDER BY t.TrackId DESC
/*
Act 3
*/
-- Inserto las  canciónes--
INSERT INTO tracks ( Name, AlbumId, MediaTypeId, Composer, Milliseconds, UnitPrice)
VALUES ('Rematente', 100, 1, 'Pepito Don Juan', 245000, 2.50),
('Panas', 101, 1, 'Pepito Don Juan', 210000, 0.99),
('Melodía Diosa', 102, 2, 'Pepito Don Juan', 280000, 10.90),
('RitmoPa', 103, 1, 'Pepito Don Juan', 195000, 5.65),
(' Sentimental', 104, 2, 'Pepito Don Juan', 320000, 6.10),
( 'La Pistas', 105, 3, 'Pepito Don Juan', 260000, 1.99)

/*
Act 4
*/
UPDATE tracks
SET Name = 'Jesus'
WHERE Composer = "Pepito Don Juan"


UPDATE tracks
SET Name = 'Jesus', Milliseconds = "376711"
WHERE AlbumId = 103 AND Composer = "Pepito Don Juan"

/*
Act 5 
*/

DELETE FROM tracks
WHERE  TrackId >= 3508 AND TrackId <= 3509  