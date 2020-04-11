-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema gratitudedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `gratitudedb` ;

-- -----------------------------------------------------
-- Schema gratitudedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gratitudedb` DEFAULT CHARACTER SET utf8 ;
USE `gratitudedb` ;

-- -----------------------------------------------------
-- Table `gratitude`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `gratitude` ;

CREATE TABLE IF NOT EXISTS `gratitude` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_gratitude` VARCHAR(200) NOT NULL,
  `second_gratitude` VARCHAR(200) NOT NULL,
  `third_gratitude` VARCHAR(200) NOT NULL,
  `entry_date` DATE NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS gratitude@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'gratitude'@'localhost' IDENTIFIED BY 'gratitude';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'gratitude'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `gratitude`
-- -----------------------------------------------------
START TRANSACTION;
USE `gratitudedb`;
INSERT INTO `gratitude` (`id`, `first_gratitude`, `second_gratitude`, `third_gratitude`, `entry_date`) VALUES (1, 'Meditation teachers', 'My meditation practice', 'Chakras', '2020-04-11');
INSERT INTO `gratitude` (`id`, `first_gratitude`, `second_gratitude`, `third_gratitude`, `entry_date`) VALUES (2, 'Pablo', 'Beautiful weather', 'Being healthy', '2020-04-10');

COMMIT;

