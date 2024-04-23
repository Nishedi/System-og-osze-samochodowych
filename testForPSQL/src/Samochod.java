public class Samochod extends Encja {
    int id;
    int user_id;
    String marka;
    String model;
    int rok_produkcji;
    int cena;
    double silnik;
    int silnik_moc;
    String face_photo_url="test.png";
    String skrzynia_biegow;
    String paliwo;
    int milage;
    String naped;

    public Samochod(int id, int user_id, String marka, String model,
                    int rok_produkcji, int cena, double silnik, int silnik_moc,
                    String skrzynia_biegow, String paliwo, String naped, int milage) {
        this.id = id;
        this.user_id = user_id;
        this.marka = marka;
        this.model = model;
        this.rok_produkcji = rok_produkcji;
        this.cena = cena;
        this.silnik = silnik;
        this.silnik_moc = silnik_moc;
        this.skrzynia_biegow = skrzynia_biegow;
        this.paliwo = paliwo;
        this.naped = naped;
        this.milage = milage;
    }

    @Override
    public String toString() {
        return this.user_id+", "+"\'"+this.marka+"\'"+", "+"\'"+this.model+"\'"+", "
                +this.rok_produkcji+", "+this.cena+","+"\'"+this.face_photo_url+"\'"+", "
                +this.silnik+", "+this.silnik_moc+", "+"\'"+this.skrzynia_biegow+"\'"+", "
                +"\'"+this.paliwo+"\'"+", "+"\'"+this.naped+"\'"+","+this.milage;
        }
}
