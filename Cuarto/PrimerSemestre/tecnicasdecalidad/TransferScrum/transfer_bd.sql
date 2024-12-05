-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-07-2023 a las 09:33:05
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `transfer_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `choferes`
--

CREATE TABLE `choferes` (
  `id` int(11) NOT NULL,
  `run` varchar(15) NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `nacimiento` date NOT NULL,
  `domicilio` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `choferes`
--

INSERT INTO `choferes` (`id`, `run`, `nombres`, `apellidos`, `nacimiento`, `domicilio`, `email`, `telefono`) VALUES
(41, '29658870', 'Hedwig', 'Ricardin', '1989-04-16', '57 Scoville Avenue', 'hricardin0@theatlantic.com', '2471715675'),
(42, '72655240', 'Yule', 'Sachno', '1990-02-09', '310 Farragut Trail', 'ysachno1@google.co.uk', '5151659394'),
(43, '4274268k', 'Lawton', 'Ickovits', '1991-07-20', '820 Old Gate Point', 'lickovits2@lulu.com', '3302045696'),
(44, '42891779', 'Randolph', 'Nehl', '1979-07-30', '695 Porter Hill', 'rnehl3@gmpg.org', '1376187978'),
(45, '04057791k', 'Martguerita', 'Rootham', '1989-11-24', '63698 Norway Maple Point', 'mrootham4@economist.com', '6278173213'),
(46, '70470564k', 'Marietta', 'Maseyk', '1974-12-18', '7783 Reinke Circle', 'mmaseyk5@nba.com', '1582588906'),
(47, '97861741k', 'Audry', 'Lewknor', '1989-08-14', '977 Sunnyside Junction', 'alewknor6@jiathis.com', '3517628969'),
(48, '73220695k', 'Cristal', 'Sherewood', '1984-08-02', '10617 Melvin Lane', 'csherewood7@wiley.com', '7426570350'),
(49, '735728454', 'Blancha', 'Spilsted', '1973-05-30', '51 Manitowish Way', 'bspilsted8@google.it', '2081120875'),
(50, '7521552k', 'Randee', 'Withams', '1977-04-05', '48878 Grasskamp Park', 'rwithams9@unc.edu', '9137721806'),
(51, '91723625k', 'Waylin', 'Issakov', '1978-08-30', '36051 Lake View Drive', 'wissakova@opera.com', '1829589131'),
(52, '70644816k', 'Shay', 'Ray', '1972-01-26', '84347 Tony Trail', 'srayb@chicagotribune.com', '5371772019'),
(53, '559278461', 'Joelie', 'Drinkhall', '1986-10-13', '9 Porter Park', 'jdrinkhallc@indiegogo.com', '2552136322'),
(54, '25744400', 'Quinta', 'Quiddington', '1985-03-23', '44 Holy Cross Trail', 'qquiddingtond@meetup.com', '2826327645'),
(55, '556225567', 'Chaddy', 'Varga', '1988-02-29', '481 Myrtle Center', 'cvargae@fc2.com', '8447688103'),
(56, '7871707k', 'Ossie', 'Pegrum', '1972-12-16', '79 Schurz Junction', 'opegrumf@google.es', '7049449011'),
(57, '31802127k', 'Nadeen', 'Tambling', '1971-02-07', '26225 6th Road', 'ntamblingg@seesaa.net', '9479280851'),
(58, '851696934', 'Sully', 'Laroze', '1974-05-30', '2858 American Ash Road', 'slarozeh@cdc.gov', '4088453284'),
(59, '7324649k', 'Electra', 'Rainville', '1970-12-23', '5637 Melby Alley', 'erainvillei@earthlink.net', '5408410254'),
(60, '162819743', 'Meredith', 'Meany', '1989-07-03', '56905 Duke Crossing', 'mmeanyj@statcounter.com', '1233784138');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `num_documento` varchar(15) NOT NULL,
  `nombres` varchar(80) NOT NULL,
  `apellidos` varchar(80) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `num_documento`, `nombres`, `apellidos`, `telefono`, `email`) VALUES
(2554088034421988342, '7832643982', 'francisco', 'galdames', '', 'hola@mundo.cl'),
(2624587286697131710, '122345456', 'francisco', 'galdames', '', 'hola@mundo.cl'),
(3540363266101304744, '122345456', 'francisco', 'galdames', '', 'hola@mundo.cl'),
(9223372036854775807, '122345456', 'francisco', 'galdames', '123456898', 'hola@mundo.cl'),
(12718970909845609299, '3489267', 'felipe', 'gallardo', '', 'hola@mundo.cl'),
(13241076526956354612, '3489267', 'felipe', 'gallardo', '', 'hola@mundo.cl'),
(13500697474612731320, '122345456', 'francisco', 'galdames', '', 'hola@mundo.cl'),
(13817019475701553515, '122345456', 'francisco', 'galdames', '', 'hola@mundo.cl');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` bigint(20) NOT NULL,
  `reserva_id` bigint(20) UNSIGNED NOT NULL,
  `monto` float UNSIGNED NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `reserva_id`, `monto`, `fecha_hora`) VALUES
(3, 9223372036854775807, 48464, '2023-06-30 19:21:41'),
(4, 14032993330165799387, 34996, '2023-07-01 02:27:20'),
(5, 13338283859502430375, 29611, '2023-07-01 02:53:42'),
(6, 11319924834250812656, 34345, '2023-07-01 03:04:17'),
(7, 4499518015016668635, 34996, '2023-07-01 03:15:01'),
(8, 8349582922785430165, 30800, '2023-07-01 03:20:42'),
(9, 15152845226961407921, 36913, '2023-07-01 03:25:29'),
(10, 2573392037215530456, 35178, '2023-07-01 03:31:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cliente_id` bigint(20) UNSIGNED NOT NULL,
  `transfer_id` int(11) NOT NULL,
  `fecha_hora` datetime NOT NULL,
  `destino` varchar(150) NOT NULL,
  `latitud` varchar(40) NOT NULL,
  `longitud` varchar(40) NOT NULL,
  `cant_asientos` int(10) NOT NULL DEFAULT 0,
  `cant_equipaje` int(10) NOT NULL DEFAULT 0,
  `estado` char(1) NOT NULL DEFAULT 'p'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id`, `cliente_id`, `transfer_id`, `fecha_hora`, `destino`, `latitud`, `longitud`, `cant_asientos`, `cant_equipaje`, `estado`) VALUES
(2573392037215530456, 13817019475701553515, 1, '2023-07-01 03:31:06', 'Maipú, El Carmen|Templo Votivo de Maipú', '-33.51081', '-70.765675', 4, 2, 'p'),
(4499518015016668635, 13500697474612731320, 4, '2023-07-01 03:15:01', 'Maipú, Calle Esquina Blanca|Instituto Profesional Duoc UC', '-33.510579', '-70.739838', 4, 2, 'c'),
(8349582922785430165, 3540363266101304744, 4, '2023-07-01 03:20:42', 'Pudahuel, Avenida Costanera Norte', '-33.419348', '-70.793417', 4, 2, 'c'),
(9223372036854775807, 9223372036854775807, 9, '2023-06-30 19:21:41', 'Santiago, Avenida Libertador Bernardo O\'Higgins|Fundación Duoc', '-33.448259', '-70.668463', 4, 6, 'c'),
(11319924834250812656, 12718970909845609299, 4, '2023-07-01 03:04:17', 'Maipú, Avenida Esquina Blanca|Duoc UC', '-33.51115', '-70.75224', 4, 2, 'c'),
(13338283859502430375, 13241076526956354612, 4, '2023-07-01 02:53:42', 'Pudahuel, Avenida Américo Vespucio|Viña Concha Y Toro', '-33.4155', '-70.783441', 4, 2, 'c'),
(14032993330165799387, 2554088034421988342, 4, '2023-07-01 02:27:20', 'Maipú, Calle Esquina Blanca|Instituto Profesional Duoc UC', '-33.510579', '-70.739838', 4, 2, 'c'),
(15152845226961407921, 2624587286697131710, 4, '2023-07-01 03:25:29', 'Maipú, Avenida Padre Alberto Hurtado|Templo Votivo de Maipú', '-33.521093', '-70.768584', 4, 2, 'c');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transfers`
--

CREATE TABLE `transfers` (
  `id` int(11) NOT NULL,
  `chofer_id` int(11) NOT NULL,
  `vehiculo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `transfers`
--

INSERT INTO `transfers` (`id`, `chofer_id`, `vehiculo_id`) VALUES
(1, 41, 3),
(2, 42, 8),
(3, 43, 1),
(4, 44, 3),
(5, 45, 9),
(6, 46, 4),
(7, 47, 3),
(8, 48, 7),
(9, 49, 6),
(10, 50, 10),
(11, 51, 8),
(12, 52, 10),
(13, 53, 8),
(14, 54, 4),
(15, 55, 2),
(16, 56, 10),
(17, 57, 5),
(18, 58, 7),
(19, 59, 5),
(20, 60, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `vehiculos`
--

CREATE TABLE `vehiculos` (
  `id` int(11) NOT NULL,
  `matricula` varchar(20) NOT NULL,
  `marca` varchar(50) NOT NULL,
  `modelo` varchar(50) NOT NULL,
  `tipo` varchar(10) NOT NULL,
  `capacidad` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `equipaje` int(10) UNSIGNED NOT NULL DEFAULT 0,
  `precio` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `vehiculos`
--

INSERT INTO `vehiculos` (`id`, `matricula`, `marca`, `modelo`, `tipo`, `capacidad`, `equipaje`, `precio`) VALUES
(1, 'YD-4557', 'Suzuki', 'Baleno', 'Hatchback', 4, 2, 15000),
(2, 'JY-1349', 'Chevrolet', 'Sail', 'Sedan', 4, 2, 10000),
(3, 'BV-5622', 'MG', '3', 'Hatchback', 4, 2, 13000),
(4, 'NT-1352', 'MG', 'ZX', 'SUV', 4, 4, 18000),
(5, 'CM-5949', 'Chevrolet', 'Tracker', 'SUV', 4, 4, 19000),
(6, 'HX-3659', 'Peugeot', 'Partner', 'MiniVan', 6, 6, 20000),
(7, 'EC-1023', 'Chevrolet', 'N400 Max', 'MiniVan', 6, 6, 20000),
(8, 'QS-3617', 'Mitsubishi', 'L200', 'PickUp', 4, 6, 22000),
(9, 'PP-6949', 'Peugeot', 'Traveler', 'Van', 10, 10, 25000),
(10, 'QV-6471', 'Mercedes Benz', 'Sprinter', 'Van', 10, 10, 25000);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `choferes`
--
ALTER TABLE `choferes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQUE` (`run`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reserva_id` (`reserva_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transfer_id` (`transfer_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `transfers`
--
ALTER TABLE `transfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chofer_id` (`chofer_id`),
  ADD KEY `vehiculo_id` (`vehiculo_id`);

--
-- Indices de la tabla `vehiculos`
--
ALTER TABLE `vehiculos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `matricula` (`matricula`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `choferes`
--
ALTER TABLE `choferes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9223372036854775807;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9223372036854775807;

--
-- AUTO_INCREMENT de la tabla `transfers`
--
ALTER TABLE `transfers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_2` FOREIGN KEY (`transfer_id`) REFERENCES `transfers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reservas_ibfk_3` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `transfers`
--
ALTER TABLE `transfers`
  ADD CONSTRAINT `transfers_ibfk_1` FOREIGN KEY (`chofer_id`) REFERENCES `choferes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transfers_ibfk_2` FOREIGN KEY (`vehiculo_id`) REFERENCES `vehiculos` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
