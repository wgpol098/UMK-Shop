module.exports = function Cart(oldCart)
{
    //Obiekt jest prawidłowo tworzony
    this.items = oldCart.items || {};
    this.totalQuantity = oldCart.totalQuantity || 0;
    this.totalPrice = oldCart.totalPrice || 0;

    this.add = function(item, id)
    {
        var storedItem = this.items[id];
        if(!storedItem)
        {
            storedItem = this.items[id] = {item: item, qty:0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQuantity++;
        this.totalPrice += storedItem.price;
    };

    this.removeItem = function(id)
    {
        this.totalQuantity -= this.items[id].qty;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
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
