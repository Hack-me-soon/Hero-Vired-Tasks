package Week_1;

class Node{
    int data;
    Node left, right;

    public Node(int data){
        this.data=data;
        left=right=null;
   
     }
}


public class binarytree {
    Node root;

    binarytree(){
        root=null;
    }

    Node insert(Node node, int data){
        if (node == null){
            node=new Node(data);
            return node;
        }
        if(data<node.data){
            node.left=insert(node.left, data);

        }
        else if(data>node.data){
            node.right=insert(node.right, data);
        }
        return node;
    }

    void inordertraversal(Node node){
        if (node!=null){
            inordertraversal(node.left);
            System.out.println(node.data+" ");
            inordertraversal(node.right);
        }
    }

    void preordertraversal(Node node){
        if (node!=null){
            System.out.println(node.data+" ");
            inordertraversal(node.left);
            inordertraversal(node.right);
            
        }
    }

    void postordertraversal(Node node){
        if (node!=null){
            inordertraversal(node.left);
            inordertraversal(node.right);
            System.out.println(node.data+" ");
            
        }
    }

    Node search(Node root,int key){
        if(root==null||root.data==key)
            return root;

        if (root.data<key)
            return search(root.right,key);

        return search(root.left,key);
    }

    public static void main(String[] args) {
        binarytree obj1 = new binarytree();
        obj1.root = obj1.insert(obj1.root,50);
        obj1.insert(obj1.root,30);
        obj1.insert(obj1.root,60);
        obj1.insert(obj1.root,50);
        obj1.insert(obj1.root,70);
        obj1.insert(obj1.root,20);
        obj1.insert(obj1.root,90);
        obj1.insert(obj1.root,10);

        System.out.println("Inorder Traversal of the tree:");
        obj1.inordertraversal(obj1.root);

        System.out.println("\nPreorder Traversal of the tree:");
        obj1.preordertraversal(obj1.root);

        System.out.println("\nPostorder Traversal of the tree:");
        obj1.postordertraversal(obj1.root);

        System.out.println("\nSearch Node:50");
        Node result=obj1.search(obj1.root,50);

        if (result!=null)
            System.out.println("Node found:"+result.data);
        else
            System.out.println("Node not found");

    }
    
}


