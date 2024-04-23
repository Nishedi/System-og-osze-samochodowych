public class Photo extends Encja{
    int car_id;
    String url;
    public Photo(int car_id, String url){
        this.car_id = car_id;
        this.url = url;
    }
    @Override
    public String toString() {
        return this.car_id+", "+"\'"+this.url+"\'";
    }
}
