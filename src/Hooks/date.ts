import { ALL_PERIOD_TYPES, PeriodType } from "@/Config/period";
import { LocalizationKey, i18n } from "@/Localization";

export const useFormattedDate = (date: Date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const dd = day < 10 ? '0' + day.toString() : day.toString();
    const mm = month < 10 ? '0' + month.toString() : month.toString();
    const yyyy = year.toString();
  
    return `${dd}/${mm}/${yyyy}`;
}

export const parseDate = (str: string) => {
    const tokens = str.split('/');
    if (tokens.length !== 3) {
        throw new Error("Invalid date format. Expected: dd/mm/yyyy.");
    }

    const day = parseInt(tokens[0]);
    const month = parseInt(tokens[1]) - 1;
    const year = parseInt(tokens[2]);

    const date = new Date(year, month, day);

    if (date.getDate() !== day || date.getMonth() !== month || date.getFullYear() !== year) {
        throw new Error("Invalid date.");
    }

    return date;
}

export const usePeriod = (type: string) => {

    let title: string = "Unknown";
    let start: Date = new Date();
    let end: Date = new Date();
    let today = new Date();

    switch (type) {
        case PeriodType.WEEK:
            
            const startDate = today.getDate() - today.getDay() + 1;
            start = new Date(today.setDate(startDate));
            end = new Date(today.setDate(startDate + 6));
            title = i18n.t(LocalizationKey.THIS_WEEK);
            break;
    
        case PeriodType.MONTH:
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            title = i18n.t(LocalizationKey.THIS_MONTH);
            break;

        case PeriodType.YEAR:
            start = new Date(today.getFullYear(), 0, 1);
            end = new Date(today.getFullYear(), 11, 31);
            title = i18n.t(LocalizationKey.THIS_YEAR);
            break;

        default:
            throw new Error(`Invalid period type: ${type}`);
    }
    
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    today = new Date();
    const left = Math.ceil((end.getTime() - today.getTime()) / (1000 * 3600 * 24));
    const res: [string, Date, Date, number] = [title, start, end, left];
    return res;
}

export const getPeriodType = (start: Date, end: Date): string | null => {

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);    

    for (const type of ALL_PERIOD_TYPES) {
        const [_, ws, we] = usePeriod(type);
        if (ws.getTime() === start.getTime() && we.getTime() === end.getTime()) {
            return type;
        }
    }

    return null;
}

