module.exports = function Cart(oldCard)
{
    this.items = oldCard.items;
    this.totalQuantity = oldCard.totalQuantity;
    this.totalPrice = old.Cart.totalPrice;

    this.add = function(item, id)
    {
        var storedItem = this.item[id];
        if(!storedItem)
        {
            storedItem = this.items[id] = {item: item, qty:0, price: 0};
        }
        storedItem.qty++;
        storedItem.price = storedItem.item.price * storedItem.qty;
        this.totalQuantity++;
        this.totalPrice += storedItem.price;
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
