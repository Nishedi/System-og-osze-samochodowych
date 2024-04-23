import javax.xml.crypto.Data;
import java.io.Console;
import java.sql.*;

public class DatabaseManager {
    private static final String URL = "jdbc:postgresql://localhost:5432/komis-samochodowy";
    private static final String USER = "postgres";
    private static final String PASSWORD = "twoje_haslo";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    public static void selectById(int id) {
        try (Connection connection = getConnection()) {
            String query = "SELECT * FROM samochody WHERE id = ?";
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                preparedStatement.setInt(1, id);
                try (ResultSet resultSet = preparedStatement.executeQuery()) {
                    while (resultSet.next()) {
                        int contactId = resultSet.getInt("id");
                        String firstName = resultSet.getString("first_name");
                        String lastName = resultSet.getString("last_name");
                        String email = resultSet.getString("email");
                        System.out.println("ID: " + contactId + ", First Name: " + firstName + ", Last Name: " + lastName + ", Email: " + email);
                    }
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void addSampleData(String tabela, Encja rodzajEncji) {
        try (Connection connection = getConnection()) {
            String query="";

            if(tabela.compareTo("samochody")==0){
                query = "INSERT INTO samochody (user_id, mark, model, production_year, price, face_photo_url, " +
                        "engine, engine_power, gearbox, fuel, wheel_drive, milage) VALUES \n" +
                        "("+rodzajEncji+");";
            }
            if(tabela.compareTo("users")==0){
                query = "INSERT INTO users (name, surname, miasto, phone_number, email, joined) VALUES \n" +
                        "("+rodzajEncji +");";
            }
            if(tabela.compareTo("login")==0){
                query = "INSERT INTO login (hash, email) VALUES \n" +
                        "("+rodzajEncji +");";
            }
            if(tabela.compareTo("photos")==0){
                query = "INSERT INTO photos (car_id, url) VALUES \n" +
                        "("+rodzajEncji +");";
            }
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                int rowsAffected = preparedStatement.executeUpdate();
                System.out.println(rowsAffected + " row(s) affected.");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static void deleteByQuery(String query) {
        try (Connection connection = getConnection()) {
            try (PreparedStatement preparedStatement = connection.prepareStatement(query)) {
                int rowsAffected = preparedStatement.executeUpdate();
                System.out.println(rowsAffected + " row(s) affected.");
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
    public static int getRowCount(Connection connection, String tabela) throws SQLException {
        String query = "SELECT COUNT(*) FROM " + tabela ;
        try (PreparedStatement preparedStatement = connection.prepareStatement(query);
             ResultSet resultSet = preparedStatement.executeQuery()) {
            resultSet.next();
            return resultSet.getInt(1);
        }
    }

}
