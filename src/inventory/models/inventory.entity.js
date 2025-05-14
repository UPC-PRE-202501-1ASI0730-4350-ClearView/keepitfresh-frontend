class Inventory {
    constructor({
                    id = 0,
                    name = '',
                    category = '',
                    quantity = 0,
                    unit = '',
                    entryDate = '',
                    expirationDate = '',
                    status = ''
                }) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.unit = unit;
        this.entryDate = entryDate;
        this.expirationDate = expirationDate;
        this.status = status;
    }
}

export default Inventory;
