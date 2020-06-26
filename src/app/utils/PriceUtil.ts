export class PriceUtil {
    public static priceWithComma(price: number) {
        var str = price.toString().split('.');
        if (str[0].length >= 5) {
            str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        }
        if (str[1] && str[1].length >= 5) {
            str[1] = str[1].replace(/(\d{3})/g, '$1');
        }
        return str.join('.');
    }

    public static priceWithCommaArrayBasePrice(allVehicles: any[]) {
        var priceCommaArray: string[] = [];
        allVehicles.forEach(element => {
            var price = element.priceMaster.basePrice
            var str = price.toString().split('.');
            if (str[0].length >= 5) {
                str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
            }
            if (str[1] && str[1].length >= 5) {
                str[1] = str[1].replace(/(\d{3})/g, '$1');
            }
            priceCommaArray.push(str.join('.'));
        });
        return priceCommaArray;
    }
}
