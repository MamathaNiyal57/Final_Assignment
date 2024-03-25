

var placeholder = document.getElementById("textAdd");
placeholder.addEventListener('keydown', function(e){
    console.log("gello");
    if(e.key === 'Enter'){
        addItem()
    }
})

function shoppingList(item){
    
        this.itemName =item;
        this.isMarked = false;
        this.isDeleted = false;

    
    
    this.delete_status = function(value){
        this.isDeleted = value;

    };
    this.marked_status = function(value){
        this.isMarked = value;
    };

    this.get_item = function(){
        return this.itemName;
    };
}

const items =[];
function addItem(){
    var input = document.getElementById("textAdd").value;
    input = input.trim();
    if(input.length == 0){
        alert("Enter a valid item");
    }
    else{
        var flag =false;
        var input1 = input.toLowerCase();
        for(let i=0; i<items.length;i++){
            var input2 = items[i].get_item().toLowerCase();
            if(input1 == input2  && items[i].isDeleted ==false){
                alert("Item already exits");
                flag = true;
            }
            
        }
        if(flag == false){
            let shopping = new shoppingList(input);
            items.push(shopping);
            rendering(shopping);

        }
        document.getElementById("textAdd").value = "";
        document.getElementById("textAdd").placeholder = "New item..";
    }
}
function rendering(shoppingList){
    var listItem = document.createElement("li");
    listItem.textContent = shoppingList.get_item();
    var ul = document.getElementById("shop-items");
    var deleteBtn = document.createElement("span");
    deleteBtn.classList.add("Delete");
    var t = document.createTextNode("X");
    // deleteBtn.textContent = "X";
    deleteBtn.appendChild(t);
    listItem.appendChild(deleteBtn);
    ul.appendChild(listItem);



    deleteBtn.addEventListener("click", function(){
        shoppingList.delete_status(true);
        listItem.remove();
        count();


    })
    listItem.addEventListener("click", function(){
        let i =shoppingList.marked_status;
        shoppingList.marked_status(!i);
        listItem.classList.toggle("change");
        count();
        
        
    
    } )
    count();


        

}
function count(){
    const listItems = document.getElementById("shop-items").getElementsByTagName("li");
    let marked =0;
    let unMarked =0;

    for(let i=0; i<listItems.length;i++){
        if(listItems[i].classList.contains("change")){
            marked++; 
        }
        else{
            unMarked++;
        }
           
            
    }
    document.getElementById("marked-items").textContent =marked;
    document.getElementById("unmarked-items").textContent =unMarked;
    


}






