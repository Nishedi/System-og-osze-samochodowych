public class Login extends Encja{
    String hash;
    String email;
    public Login(String hash, String email){
        this.hash = hash;
        this.email = email;
    }
    @Override
    public String toString() {
        return "\'"+this.hash+"\'"+", "+"\'"+this.email+"\'";
    }
}
