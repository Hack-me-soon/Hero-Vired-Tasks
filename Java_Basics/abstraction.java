abstract class shape{
    abstract void draw();
}

class circle extends shape{
    void draw(){
        System.out.println("Drawing a Circle");
    }
}
class square extends shape{
    void draw(){
        System.out.println("Drawing a Square");
    }
}
class rectangle extends shape{
    void draw(){
        System.out.println("Drawing a Rectangle");
    }
}
class pentagon extends shape{
    void draw(){
        System.out.println("Drawing a Pentagon");
    }`
}
class hexagon extends shape{
    void draw(){
        System.out.println("Drawing a Hexagon");
    }
}



abstract class erase{
    abstract void eraser();
}

class erasecircle extends erase{
    void eraser(){
        System.out.println("erasing a Circle");
    }
}


public class abstraction {
    public static void main(String args[]){
        shape obj1 = new circle();
        shape obj2 = new square();
        shape obj3= new rectangle();
        shape obj4= new pentagon();
        shape obj5= new hexagon();
        erase obj6= new erasecircle();

        obj1.draw();
        obj2.draw();
        obj3.draw();
        obj4.draw();
        obj5.draw();
        obj6.eraser();
    }
    
}
