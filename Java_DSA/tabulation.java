import java.util.Scanner;

class tabulation{
    static int fib(int n){
        int table[]= new int[n+1];
        table[0]=0;
        table[1]=1;
        for(int i=2;i<=n;i++){
            table[i]=table[i-1]+table[i-2];
        }
        return table[n];
    }
    public static void main(String[] args) {
        // Scanner scanner = new Scanner(System.in);
        // System.out.print("Enter n: ");
        // int n = scanner.nextInt();
        int n=3;
        System.out.println(n+"="+fib(n));
       
    }
}
