module.exports = function Cart(oldCart)
{
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    //Dodawanie przedmiotu
    this.add = function(item, id)
    {
        var storedItem = this.items[id];
        if(!storedItem) storedItem = this.items[id] = {item: item, qty:0, price: 0};
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQuantity++;
        this.totalPrice += storedItem.item.price;
    };

    //Usuwanie jednego przedmiotu
    this.reduce = function(id)
    {
        if (this.items[id] != undefined)
        {
            this.items[id].qty--;
            this.items[id].price -= this.items[id].item.price;
            this.totalQuantity--;
            this.totalPrice -= this.items[id].item.price;
            if (this.items[id].qty <= 0) delete this.items[id];
        }
    };

    //usuwanie przedmiotów
    this.removeItem = function(id)
    {
        if (this.items[id] != undefined)
        {
            console.log(this.items[id].price);
            this.totalQuantity -= this.items[id].qty;
            this.totalPrice -= this.items[id].price;
            delete this.items[id];
        }
    };

    this.generateArray = function()
    {
        var array = [];
        for( var id in this.items)
        {
            array.push(this.item[id]);
        }
        return array;
    };
};
