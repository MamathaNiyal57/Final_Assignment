class ShoppingList {
    constructor(item) {
        this.itemName = item;
        this.isMarked = false;
        this.isDeleted = false;
    }

    set deleteStatus(value) {
        this.isDeleted = value;
    }

    set markedStatus(value) {
        this.isMarked = value;
    }

    get item() {
        return this.itemName;
    }
}

class ShoppingApp {
    constructor() {
        this.items = [];
        this.placeholder = document.getElementById("textAdd");
        this.ul = document.getElementById("shop-items");
        this.markedCountElement = document.getElementById("marked-items");
        this.unmarkedCountElement = document.getElementById("unmarked-items");

        this.placeholder.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.addItem();
            }
        });
    }

    addItem() {
        let input = this.placeholder.value.trim();
        if (input.length === 0) {
            alert("Enter a valid item");
            return;
        }

        let inputLower = input.toLowerCase();
        for (let item of this.items) {
            if (item.item.toLowerCase() === inputLower && !item.isDeleted) {
                alert("Item already exists");
                return;
            }
        }

        let shoppingItem = new ShoppingList(input);
        this.items.push(shoppingItem);
        this.renderItem(shoppingItem);
        this.placeholder.value = "";
        this.placeholder.placeholder = "New item..";
    }

    renderItem(shoppingItem) {
        let listItem = document.createElement("li");
        listItem.textContent = shoppingItem.item;
        let deleteBtn = document.createElement("span");
        deleteBtn.classList.add("Delete");
        deleteBtn.textContent = "X";

        listItem.appendChild(deleteBtn);
        this.ul.appendChild(listItem);

        deleteBtn.addEventListener("click", () => {
            shoppingItem.deleteStatus = true;
            listItem.remove();
            this.updateCount();
        });

        listItem.addEventListener("click", () => {
            shoppingItem.markedStatus = !shoppingItem.isMarked;
            listItem.classList.toggle("change");
            this.updateCount();
        });

        this.updateCount();
    }

    updateCount() {
        let marked = 0;
        let unmarked = 0;
        const listItems = this.ul.getElementsByTagName("li");

        for (let listItem of listItems) {
            if (listItem.classList.contains("change")) {
                marked++;
            } else {
                unmarked++;
            }
        }

        this.markedCountElement.textContent = marked;
        this.unmarkedCountElement.textContent = unmarked;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ShoppingApp();
});
