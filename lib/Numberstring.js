import { parseArabic } from "./Functions";

export const numberToStringParse = (num , level) => {

    if (num === null) {
        return "";
    }
    // convert negative number to positive and get wordify value
    if (num < 0) {
        num = num * -1;
        return "منفی " + numberToStringParse(num, level);
    }
    if (num === 0) {
        if (level === 0) {
            return "صفر";
        } else {
            return "";
        }
    }
    var result = "",
        yekan = ["یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"],
        dahgan = ["بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"],
        sadgan = ["یکصد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"],
        dah = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هیجده", "نوزده"];
    if (level > 0) {
        result += " و ";
        level -= 1;
    }

    if (num < 10) {
        result += yekan[num - 1];
    } else if (num < 20) {
        result += dah[num - 10];
    } else if (num < 100) {
        result += dahgan[parseInt((num / 10).toString(), 10) - 2] + numberToStringParse(num % 10, level + 1);
    } else if (num < 1000) {
        result += sadgan[parseInt((num / 100).toString(), 10) - 1] + numberToStringParse(num % 100, level + 1);
    } else if (num < 1000000) {
        result += numberToStringParse(parseInt((num / 1000).toString(), 10), level) + " هزار " + numberToStringParse(num % 1000, level + 1);
    } else if (num < 1000000000) {
        result += numberToStringParse(parseInt((num / 1000000 ).toString(), 10), level) + " میلیون " + numberToStringParse(num % 1000000, level + 1);
    } else if (num < 1000000000000) {
        result += numberToStringParse(parseInt((num / 1000000000).toString(), 10), level) + " میلیارد " + numberToStringParse(num % 1000000000, level + 1);
    } else if (num < 1000000000000000) {
        result += numberToStringParse(parseInt((num / 1000000000000).toString(), 10), level) + " تریلیارد " + numberToStringParse(num % 1000000000000, level + 1);
    }
    return result;

}


export const numberToString = (num) => {
    const parsed = parseArabic(num);
    if(parsed !== '0' && parsed) {
        return numberToStringParse(parsed , 0);
    }
}
