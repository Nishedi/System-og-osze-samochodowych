import org.junit.jupiter.api.Test;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import static org.junit.jupiter.api.Assertions.*;

class DatabaseManagerTest {

    @Test
    void getConnection() {
        try (Connection connection = DatabaseManager.getConnection()) {
            assertNotNull(connection);
            assertFalse(connection.isClosed());
        } catch (SQLException e) {
            fail("Exception thrown while establishing connection: " + e.getMessage());
        }
    }
    @Test
    void testAddSampleDataToSamochody() {
        try (Connection connection = DatabaseManager.getConnection()) {
            int initialRowCount = DatabaseManager.getRowCount(connection, "samochody");
            DatabaseManager.addSampleData("samochody", new Samochod(1,22,"BMW","M3",
                    2000,10000,2.0,200,"manualna","benzyna",
                    "tylni", 21502));
            int finalRowCount = DatabaseManager.getRowCount(connection, "samochody");
            assertEquals(initialRowCount + 1, finalRowCount);
            String query = "SELECT * FROM samochody WHERE user_id = 22 AND mark = 'BMW'"+
                    " AND model = 'M3' AND production_year = 2000 AND price = 10000 AND engine = 2.0 AND engine_power = 200"+
                    " AND gearbox = 'manualna' AND fuel = 'benzyna' AND wheel_drive = 'tylni' AND milage = 21502";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) { // Dodaj to wywołanie next()
                    assertEquals("BMW", resultSet.getString("mark"));
                    assertEquals("M3", resultSet.getString("model"));
                    assertEquals(2000, resultSet.getInt("production_year"));
                    assertEquals(10000, resultSet.getInt("price"));
                    assertEquals(2.0, resultSet.getDouble("engine"));
                    assertEquals(200, resultSet.getInt("engine_power"));
                    assertEquals("manualna", resultSet.getString("gearbox"));
                    assertEquals("benzyna", resultSet.getString("fuel"));
                    assertEquals("tylni", resultSet.getString("wheel_drive"));
                    assertEquals(21502, resultSet.getInt("milage"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void testAddSampleDataToUsers() {
        try (Connection connection = DatabaseManager.getConnection()) {
            String firstQuery = "delete from users where email = 'jan.kowalski@email.com'";
            DatabaseManager.deleteByQuery(firstQuery);
            int initialRowCount = DatabaseManager.getRowCount(connection, "users");
            User user = new User("Johny","Kretlik","Warszawa",761925726,"jan.kowalski@email.com");
            DatabaseManager.addSampleData("users", user);
            int finalRowCount = DatabaseManager.getRowCount(connection, "users");
            assertEquals(initialRowCount + 1, finalRowCount);
            String query = "SELECT * FROM users WHERE name = 'Johny'"+
                    " AND surname = 'Kretlik' AND miasto = 'Warszawa' AND phone_number = 761925726 AND email = 'jan.kowalski@email.com'";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    assertEquals("Johny", resultSet.getString("name"));
                    assertEquals("Kretlik", resultSet.getString("surname"));
                    assertEquals("Warszawa", resultSet.getString("miasto"));
                    assertEquals(761925726, resultSet.getInt("phone_number"));
                    assertEquals("jan.kowalski@email.com", resultSet.getString("email"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void testAddSampleDataToLogin() {
        try (Connection connection = DatabaseManager.getConnection()) {
            String firstQuery = "delete from login where email = 'jan.kowalski@email.com'";
            DatabaseManager.deleteByQuery(firstQuery);
            int initialRowCount = DatabaseManager.getRowCount(connection, "login");
            Login  login = new Login("afagwwgagagag352613tgs", "jan.kowalski@email.com");
            DatabaseManager.addSampleData("login", login);
            int finalRowCount = DatabaseManager.getRowCount(connection, "login");
            assertEquals(initialRowCount + 1, finalRowCount);
            String query = "SELECT * FROM login WHERE  email = 'jan.kowalski@email.com'";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    assertEquals("afagwwgagagag352613tgs", resultSet.getString("hash"));
                    assertEquals("jan.kowalski@email.com", resultSet.getString("email"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void testAddSampleDataToPhotos() {
        try (Connection connection = DatabaseManager.getConnection()) {
            int initialRowCount = DatabaseManager.getRowCount(connection, "photos");
            Photo photo = new Photo(3, "uplads/test.png");
            DatabaseManager.addSampleData("photos", photo);
            int finalRowCount = DatabaseManager.getRowCount(connection, "photos");
            assertEquals(initialRowCount + 1, finalRowCount);
            String query = "SELECT * FROM photos WHERE  car_id = 3 AND url = 'uplads/test.png'";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    assertEquals("3", resultSet.getString("car_id"));
                    assertEquals("uplads/test.png", resultSet.getString("url"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void deleteAdd(){
        try (Connection connection = DatabaseManager.getConnection()) {
            Samochod rodzajEncji = new Samochod(1,23,"BMW","M3",
                    2000,10000,2.0,200,"manualna","benzyna",
                    "tylni", 21502);
            String query = "INSERT INTO samochody (user_id, mark, model, production_year, price, face_photo_url, " +
                    "engine, engine_power, gearbox, fuel, wheel_drive, milage) VALUES \n" +
                    "("+rodzajEncji+");";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.executeUpdate();
            }

            int initialRowCount = DatabaseManager.getRowCount(connection, "samochody");
            query = "DELETE FROM samochody WHERE user_id = 23 AND mark = 'BMW' AND model = 'M3' AND production_year = 2000 " +
                    "AND price = 10000 AND engine = 2.0 AND engine_power = 200 AND gearbox = 'manualna' AND fuel = 'benzyna' " +
                    "AND wheel_drive = 'tylni' AND milage = 21502;\n";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.executeUpdate();
            }
            int finalRowCount = DatabaseManager.getRowCount(connection, "samochody");
            assertEquals(initialRowCount, finalRowCount+1);

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    @Test
    void editOneCell(){

        try (Connection connection = DatabaseManager.getConnection()){
            Samochod rodzajEncji = new Samochod(1,23,"Audi","A4",
                    2000,10000,2.0,200,"manualna","benzyna",
                    "tylni", 21502);
            String query = "INSERT INTO samochody (user_id, mark, model, production_year, price, face_photo_url, " +
                    "engine, engine_power, gearbox, fuel, wheel_drive, milage) VALUES \n" +
                    "("+rodzajEncji+");";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.executeUpdate();
            }
            query = "SELECT * FROM samochody WHERE user_id = 23 AND mark = 'Audi' AND model = 'A4' AND production_year = 2000 " +
                    "AND price = 10000 AND engine = 2.0 AND engine_power = 200  AND fuel = 'benzyna' " +
                    "AND wheel_drive = 'tylni' AND gearbox = 'manualna' AND milage = 21502;\n";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    assertEquals("manualna", resultSet.getString("gearbox"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");
                }
            }
            query = "UPDATE samochody SET gearbox = 'automatyczna' WHERE user_id = 23 AND mark = 'Audi' AND model = 'A4' AND production_year = 2000 " +
                    "AND price = 10000 AND engine = 2.0 AND engine_power = 200 AND fuel = 'benzyna' " +
                    "AND wheel_drive = 'tylni' AND milage = 21502;\n";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)){
                 preparedStatement.executeUpdate();
            }
            query = "SELECT * FROM samochody WHERE user_id = 23 AND mark = 'Audi' AND model = 'A4' AND production_year = 2000 " +
                    "AND price = 10000 AND engine = 2.0 AND engine_power = 200 AND fuel = 'benzyna' " +
                    "AND wheel_drive = 'tylni' AND milage = 21502;\n";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query);
                 ResultSet resultSet = preparedStatement.executeQuery()) {
                if (resultSet.next()) {
                    assertEquals("automatyczna", resultSet.getString("gearbox"));
                } else {
                    throw new RuntimeException("Brak danych w ResultSet.");

                }
            }
            query = "DELETE FROM samochody WHERE user_id = 23 AND mark = 'Audi' AND model = 'A4' AND production_year = 2000 " +
                    "AND price = 10000 AND engine = 2.0 AND engine_power = 200 AND gearbox = 'automatyczna' AND fuel = 'benzyna' " +
                    "AND wheel_drive = 'tylni' AND milage = 21502;\n";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.executeUpdate();
            }
        }catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}