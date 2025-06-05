-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 05-06-2025 a las 21:12:56
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alta-participantes`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `convocatoria`
--

DROP TABLE IF EXISTS `convocatoria`;
CREATE TABLE IF NOT EXISTS `convocatoria` (
  `convocatoria_id` int NOT NULL AUTO_INCREMENT,
  `nombre_convocatoria` varchar(255) NOT NULL,
  PRIMARY KEY (`convocatoria_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `convocatoria`
--

INSERT INTO `convocatoria` (`convocatoria_id`, `nombre_convocatoria`) VALUES
(1, 'Convocatoria 2022'),
(2, 'Convocatoria 2023'),
(3, 'Proyectos Especiales'),
(4, 'Apoyo a la Investigación'),
(5, 'Fondo Emprende');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `instituciones`
--

DROP TABLE IF EXISTS `instituciones`;
CREATE TABLE IF NOT EXISTS `instituciones` (
  `instituciones_id` int NOT NULL AUTO_INCREMENT,
  `nombre_instituciones` varchar(255) NOT NULL,
  PRIMARY KEY (`instituciones_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `instituciones`
--

INSERT INTO `instituciones` (`instituciones_id`, `nombre_instituciones`) VALUES
(1, 'Universidad Nacional de Ciencias'),
(2, 'Centro de Innovación Tecnológica'),
(3, 'Instituto de Energías Renovables'),
(4, 'Academia de Estudios Sociales'),
(5, 'Fundación Desarrollo Sustentable');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oficios`
--

DROP TABLE IF EXISTS `oficios`;
CREATE TABLE IF NOT EXISTS `oficios` (
  `oficio_id` int NOT NULL AUTO_INCREMENT,
  `no_oficio` varchar(100) NOT NULL,
  `proyecto_id` int DEFAULT NULL,
  PRIMARY KEY (`oficio_id`),
  KEY `proyecto_id` (`proyecto_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `oficios`
--

INSERT INTO `oficios` (`oficio_id`, `no_oficio`, `proyecto_id`) VALUES
(1, 'OF-2022-001', 1),
(2, 'OF-2022-002', 2),
(3, 'OF-2023-003', 3),
(4, 'OF-2023-004', 4),
(5, 'OF-2023-005', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas`
--

DROP TABLE IF EXISTS `personas`;
CREATE TABLE IF NOT EXISTS `personas` (
  `cvu` varchar(100) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  PRIMARY KEY (`cvu`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `personas`
--

INSERT INTO `personas` (`cvu`, `nombre`) VALUES
('CVU001', 'María López'),
('CVU002', 'Juan Pérez'),
('CVU003', 'Ana Gómez'),
('CVU004', 'Luis Rodríguez'),
('CVU005', 'Sofía Martínez');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_proyectos`
--

DROP TABLE IF EXISTS `personas_proyectos`;
CREATE TABLE IF NOT EXISTS `personas_proyectos` (
  `cvu` varchar(100) NOT NULL,
  `proyecto_id` int NOT NULL,
  `rol` enum('RT','participantes') NOT NULL,
  PRIMARY KEY (`cvu`,`proyecto_id`),
  KEY `proyecto_id` (`proyecto_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `personas_proyectos`
--

INSERT INTO `personas_proyectos` (`cvu`, `proyecto_id`, `rol`) VALUES
('CVU001', 1, 'RT'),
('CVU002', 1, 'participantes'),
('CVU003', 2, 'RT'),
('CVU004', 3, 'participantes'),
('CVU005', 4, 'participantes'),
('CVU005', 1, 'participantes'),
('CVU004', 2, 'participantes'),
('CVU005', 2, 'participantes');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personas_sin_cvu`
--

DROP TABLE IF EXISTS `personas_sin_cvu`;
CREATE TABLE IF NOT EXISTS `personas_sin_cvu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `proyecto_id` int DEFAULT NULL,
  `instituciones_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `proyecto_id` (`proyecto_id`),
  KEY `instituciones_id` (`instituciones_id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `personas_sin_cvu`
--

INSERT INTO `personas_sin_cvu` (`id`, `nombre`, `proyecto_id`, `instituciones_id`) VALUES
(1, 'Carlos Méndez', 1, 1),
(2, 'Diana Rivera', 2, 2),
(3, 'Ernesto Salinas', 3, 3),
(4, 'Paola Chávez', 4, 4),
(5, 'Ricardo Torres', 5, 5),
(6, 'Jonathan Chavarria Martinez', 1, 4),
(7, 'Fanny Mildred', 2, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

DROP TABLE IF EXISTS `proyectos`;
CREATE TABLE IF NOT EXISTS `proyectos` (
  `proyecto_id` int NOT NULL AUTO_INCREMENT,
  `clave_proyecto` varchar(100) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `convocatoria_id` int DEFAULT NULL,
  PRIMARY KEY (`proyecto_id`),
  KEY `convocatoria_id` (`convocatoria_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`proyecto_id`, `clave_proyecto`, `titulo`, `convocatoria_id`) VALUES
(1, 'PRJ001', 'Desarrollo de tecnologías limpias', 1),
(2, 'PRJ002', 'Sistema de monitoreo ambiental', 2),
(3, 'PRJ003', 'Aplicación de salud móvil', 3),
(4, 'PRJ004', 'Innovación en agricultura', 4),
(5, 'PRJ005', 'Red de emprendedores jóvenes', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seguimiento_solicitudes`
--

DROP TABLE IF EXISTS `seguimiento_solicitudes`;
CREATE TABLE IF NOT EXISTS `seguimiento_solicitudes` (
  `solicitud_id` int NOT NULL AUTO_INCREMENT,
  `tipo_solicitud` enum('Alta de participantes','Alta RT') NOT NULL,
  `oficio_id_atencion` int DEFAULT NULL,
  PRIMARY KEY (`solicitud_id`),
  KEY `oficio_id_atencion` (`oficio_id_atencion`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `seguimiento_solicitudes`
--

INSERT INTO `seguimiento_solicitudes` (`solicitud_id`, `tipo_solicitud`, `oficio_id_atencion`) VALUES
(1, 'Alta de participantes', 1),
(2, 'Alta RT', 2),
(3, 'Alta de participantes', 3),
(4, 'Alta RT', 4),
(5, 'Alta de participantes', 5);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
