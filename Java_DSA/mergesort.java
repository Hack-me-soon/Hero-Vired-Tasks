package Week_1;

public class mergesort {
        public static void main(String[] args) {
            
        
            int a []= {10,1,5,6,21,85,46,33};
            int size=a.length;
    
            for (int i = 0; i < size-1; i++) {
                for (int j = 0; i < size-1-i; i++) {
                    if (a[j]>a[j+1]){
                        int temp=a[j];
                        a[j]=a[j+1];
                        a[j+1]=temp;
                    }
                
                }
            
            }
            for (int b= 0; b < a.length-1; b++) {
                System.out.println(a[b]);
                
            }
    
        }
    }
    
    

