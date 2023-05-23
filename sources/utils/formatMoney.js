import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

const formatMoney = (money) => {
    const [valueFormattedWithSymbol, 
            valueFormattedWithoutSymbol, symbol] = 
                formatCurrency({ amount: Number(money), code: "VND" })
    return valueFormattedWithSymbol;
}

export default formatMoney;