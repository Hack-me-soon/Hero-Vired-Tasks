package Week_1;
import java.util.*;


public class stack<T> {

        private ArrayList<T> stacklist;
        
        public stack(){
            stacklist= new ArrayList<>();

        }
    public void push(T data){
        stacklist.add(data);
    }
    public T pop(){
        if (isEmpty()){
            System.out.println("stack is empty");
            return null;
        }
        return stacklist.remove(stacklist.size()-1);
    }

    public T peek(){
        if (isEmpty()){
            System.out.println("stack is empty");
            return null;
        }
        return stacklist.remove(stacklist.size()-1);
    }

    public boolean isEmpty(){
        return stacklist.isEmpty();
    }

    public int size(){
        return stacklist.size();
    }

    public static void main(String[] args) {
        stack<String> stack =new stack<>();
        stack.push("Apple");
        stack.push("Banana");
        stack.push("Cherry");
        stack.push("Mango");

        System.out.println("Satck Size:"+stack.size());
        System.out.println("Top Element:"+stack.peek());

        while (!stack.isEmpty()) {
            System.out.println("Popped:"+stack.pop());
            
        }
    }
}
