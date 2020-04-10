-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema meditationdb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `meditationdb` ;

-- -----------------------------------------------------
-- Schema meditationdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `meditationdb` DEFAULT CHARACTER SET utf8 ;
USE `meditationdb` ;

-- -----------------------------------------------------
-- Table `meditation`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `meditation` ;

CREATE TABLE IF NOT EXISTS `meditation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS guru@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'guru'@'localhost' IDENTIFIED BY 'guru';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'guru'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `meditation`
-- -----------------------------------------------------
START TRANSACTION;
USE `meditationdb`;
INSERT INTO `meditation` (`id`, `name`) VALUES (1, NULL);

COMMIT;

