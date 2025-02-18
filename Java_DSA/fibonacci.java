import java.util.Arrays;
import java.util.Scanner;

class fibonacci{
    int fib(int n, int memo[]){
        if (memo[n]!=-1) return memo[n];
        if(n<=1) return n;
        memo[n] = fib(n-1,memo)+fib(n-2, memo);
        return memo[n];
    }

    public static void main(String[] args) {
        // Scanner scanner = new Scanner(System.in);
        // System.out.print("Enter n: ");
        // int n = scanner.nextInt();
        // scanner.close();
        int n=5;
        int memo[] = new int[n + 1];    
        Arrays.fill(memo, -1);             
        fibonacci obj = new fibonacci();
        System.out.println("Fibonacci number at position " + n + " is: " + obj.fib(n, memo));
    }
}

// 0,1,1