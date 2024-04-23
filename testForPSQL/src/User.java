import java.sql.Timestamp;

public class User extends Encja{
    private final Timestamp joined;
    String name;
    String surname;
    String miasto;
    int phone_number;
    String email;

    public User(String name, String surname, String miasto, int phone_number, String email) {
        this.name = name;
        this.surname = surname;
        this.miasto = miasto;
        this.phone_number = phone_number;
        this.email = email;
        java.util.Date currentDate = new java.util.Date();
        java.sql.Timestamp timestamp = new java.sql.Timestamp(currentDate.getTime());
        this.joined = timestamp;
    }
    @Override
    public String toString() {
        return "\'"+this.name+"\'"+", "+"\'"+this.surname+"\'"+", "+"\'"+this.miasto+"\'"+", "
                +this.phone_number+", "+"\'"+this.email+"\'"+", '"+this.joined+"'";
    }


}
