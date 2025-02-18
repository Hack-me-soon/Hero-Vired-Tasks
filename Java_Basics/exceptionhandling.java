import java.util.*;
public class exceptionhandling {

    static void add(int x, int y){
        System.out.println(x+y);
    }
    static void sub(int x, int y){
        System.out.println(x-y);
    }
    static void div(int x, int y){
        System.out.println(x/y);
    }
    public static void main(String[] args) {

        System.out.println("Enter any of the option:\n1) Addition \n2) Subtraction \n3) Division");


        Scanner obj2= new Scanner(System.in);
        System.out.println("Enter Number 1:");
        int b = obj2.nextInt();

        Scanner obj3= new Scanner(System.in);
        System.out.println("Enter Number 2:");
        int c = obj3.nextInt();

        Scanner obj1= new Scanner(System.in);
        System.out.println("Option:");
        int a = obj1.nextInt();

        if (a==1) {
            try {
                add(b,c);
                
            } 
                catch (Exception e) {
                   System.out.println("Invalid Input Value");
                
                }
                
            }
        else if (a==2) {
            try {
                sub(b,c);
                
            } 
                catch (Exception e) {
                   System.out.println("Invalid Input Value");
                
                }
        }
        else if (a==3) {
            try {
                div(b,c);
                
            } 
                catch (Exception e) {
                   System.out.println("Invalid Input Value");
                
                }
            
        }
        else {
            System.out.println("Invalid OPtion");
        }

        
    }
    
}
