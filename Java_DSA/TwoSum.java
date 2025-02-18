package Week_1;

import java.util.*;

public class TwoSum {
    public static void main(String[] args) {
        int b=90;
        int a[]={10,20,30,40,50,60,70};
        for (int i = 0; i < a.length; i++) {

            for (int j=0; j<a.length;j++){
                if ((a[i]+a[j])==b){
                    return new int[]{i, j};

                }
            }
        
        }
        return new int[]{};
    }
}
