-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           10.4.32-MariaDB - mariadb.org binary distribution
-- OS do Servidor:               Win64
-- HeidiSQL Versão:              12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para db_adote_pet
CREATE DATABASE IF NOT EXISTS `db_adote_pet` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_adote_pet`;

-- Copiando estrutura para tabela db_adote_pet.tb_adocao
CREATE TABLE IF NOT EXISTS `tb_adocao` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `FK_ID_PET` int(11) NOT NULL,
  `FK_ID_PESSOA` int(11) NOT NULL,
  `DATA_ADOCAO` date NOT NULL,
  `RESPONSAVEL` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  KEY `FK_ID_PET` (`FK_ID_PET`),
  KEY `FK_ID_PESSOA` (`FK_ID_PESSOA`),
  CONSTRAINT `tb_adocao_ibfk_1` FOREIGN KEY (`FK_ID_PET`) REFERENCES `tb_pet` (`ID`),
  CONSTRAINT `tb_adocao_ibfk_2` FOREIGN KEY (`FK_ID_PESSOA`) REFERENCES `tb_pessoa` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela db_adote_pet.tb_pessoa
CREATE TABLE IF NOT EXISTS `tb_pessoa` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cpf` varchar(11) NOT NULL,
  `nome` varchar(50) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `rua` varchar(50) NOT NULL,
  `numero` varchar(20) NOT NULL,
  `bairro` varchar(50) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` char(2) NOT NULL,
  `cep` varchar(8) NOT NULL,
  `rg` varchar(9) NOT NULL,
  `telefone` varchar(13) NOT NULL,
  `data_nascimento` date NOT NULL,
  `senha` varchar(100) NOT NULL,
  `confirmar` varchar(100) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `CPF` (`cpf`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

-- Copiando estrutura para tabela db_adote_pet.tb_pet
CREATE TABLE IF NOT EXISTS `tb_pet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `raca` varchar(50) NOT NULL,
  `porte` varchar(50) NOT NULL,
  `data_nascimento` date NOT NULL,
  `observacao` varchar(400) NOT NULL,
  `cor` varchar(50) NOT NULL,
  `sexo` char(1) NOT NULL DEFAULT '',
  `castrado` char(1) NOT NULL DEFAULT '',
  `adotado` char(1) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Exportação de dados foi desmarcado.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
