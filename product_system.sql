-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-04-2022 a las 22:27:55
-- Versión del servidor: 10.3.16-MariaDB
-- Versión de PHP: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `product_system`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ps_cities`
--

CREATE TABLE `ps_cities` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `latitud` varchar(200) NOT NULL,
  `longitud` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `ps_cities`
--

INSERT INTO `ps_cities` (`id`, `nombre`, `latitud`, `longitud`) VALUES
(1, 'Bogota', '4.6097100', '-74.0817500'),
(2, 'Medellin', '6.2518400', ' -75.5635900'),
(3, 'Cali', '3.4372200', '-76.5225000'),
(4, 'Barranquilla', '10.9685400', '-74.7813200'),
(5, 'Cartagena de Indias', '10.3997200', '-75.5144400'),
(6, 'Cucuta', '7.8939100', '-72.5078200'),
(7, 'Bucaramanga', '7.1253900', '-73.1198000'),
(8, 'Santa Marta', '11.2407900', '-74.1990400');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ps_products`
--

CREATE TABLE `ps_products` (
  `id` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `precio` varchar(200) NOT NULL,
  `cantidad` int(50) NOT NULL,
  `observaciones` varchar(200) NOT NULL,
  `imagen` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ps_product_cities`
--

CREATE TABLE `ps_product_cities` (
  `id` int(11) NOT NULL,
  `id_product` int(11) NOT NULL,
  `id_city` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ps_users`
--

CREATE TABLE `ps_users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `ps_cities`
--
ALTER TABLE `ps_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ps_products`
--
ALTER TABLE `ps_products`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `ps_product_cities`
--
ALTER TABLE `ps_product_cities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_PRODUCT_CITY` (`id_product`) USING BTREE,
  ADD KEY `FK_PRODUCT_CITY_ESPECIFICATION` (`id_city`) USING BTREE;

--
-- Indices de la tabla `ps_users`
--
ALTER TABLE `ps_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ps_cities`
--
ALTER TABLE `ps_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `ps_products`
--
ALTER TABLE `ps_products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ps_product_cities`
--
ALTER TABLE `ps_product_cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `ps_users`
--
ALTER TABLE `ps_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `ps_product_cities`
--
ALTER TABLE `ps_product_cities`
  ADD CONSTRAINT `ciudad_relacionada` FOREIGN KEY (`id_city`) REFERENCES `ps_cities` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ciudades_producto` FOREIGN KEY (`id_product`) REFERENCES `ps_products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
