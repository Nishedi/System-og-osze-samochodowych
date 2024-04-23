import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Stack;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world!");
      /*  String jdbcURL = "jdbc:postgresql://localhost:5432/shopme";
        String username = "postgres";
        String password = "password";
        Samochod samochod = new Samochod(1,1,"BMW","M3",2000,10000,2.0,200,"manualna","benzyna","tylni", 21401);
        System.out.println(samochod);
        try {
            Connection connection = DriverManager.getConnection(jdbcURL, username, password);
            Statement statement = connection.createStatement();
            String query = "SELECT * FROM contacts";
            ResultSet resultSet = statement.executeQuery(query);
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String firstName = resultSet.getString("first_name");
                String lastName = resultSet.getString("last_name");
                String email = resultSet.getString("email");

                System.out.println("ID: " + id + ", First Name: " + firstName + ", Last Name: " + lastName + ", Email: " + email);
            }

            connection.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }*/
    }
}
