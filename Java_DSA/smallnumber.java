public class smallarray{
    public static void main(String[] args) {
        int a[]= {1,6,-1,4,7,8,9,3,};
    int b[]= new int[a.length];
    for(int i=0;i<a.length;i++){
        if(b[0]==0){
        b[0]=a[i];
        }
        
        // System.out.println(b[0]);
        for (int j=0; j<a.length;j++) {
            
            // System.out.println(b[0]);

            if(b[0]>a[j]){
                b[0]=a[j];
            }
            if(i==j){

            }
            
        }
    }
    System.out.println(b[0]);
    System.out.println(b[1]);

    }
    
}