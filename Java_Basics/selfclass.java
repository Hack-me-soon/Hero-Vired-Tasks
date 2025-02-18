public class selfclass {
    String name;
    int age;
    String location;


    public selfclass(String Name, int Age, String Location){
        Name=name;  
        Age=age;
        Location=location;
    }

    public void print(){
        System.out.println("Name:"+name+"\nAge:"+age+"\nLocation:"+location);
    }

    public static void main(String[] args) {
        selfclass obj1 = new selfclass("Abhishek",21,"Bagalur");
        obj1.print();
        }
}
    


