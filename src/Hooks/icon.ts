import { Category } from "@/Config/category";
import { WalletType } from "@/Config/wallet";
import { LocalizationKey, i18n } from "@/Localization";
import { Colors } from "@/Theme";

export const useWalletIcon = (type: string) => {
    switch (type) {
        case WalletType.CASH:    return [i18n.t(LocalizationKey.CASH), "cash", "#1CB561"];
        case WalletType.CARD:    return [i18n.t(LocalizationKey.CARD), "credit-card", "#63AFFA"];
        case WalletType.EWALLET: return [i18n.t(LocalizationKey.EWALLET), "wallet", "#FFC73C"];
        default:
            break;
    }

    return ["Unknown", "file-question", Colors.ERROR60];
}

export const useCategoryIcon = (type: string) => {
    switch (type) {
        case Category.ALL:               return [i18n.t(LocalizationKey.ALL), "earth", "#60D9A7"];
        case Category.BILL:              return [i18n.t(LocalizationKey.BILL), "receipt", "#F8EC7D"];
        case Category.EDUCATION:         return [i18n.t(LocalizationKey.EDUCATION), "notebook-multiple", "#FE924A"];
        case Category.ENTERTAINMENT:     return [i18n.t(LocalizationKey.ENTERTAINMENT), "movie-open-play", "#D0D7DF"];
        case Category.FAMILY:            return [i18n.t(LocalizationKey.FAMILY), "home", "#1DE8F1"];
        case Category.FOOD:              return [i18n.t(LocalizationKey.FOOD), "food", "#FF9801"];
        case Category.GIFT:              return [i18n.t(LocalizationKey.GIFT), "gift", "#EF5261"];
        case Category.HEALTH:            return [i18n.t(LocalizationKey.HEALTH), "medical-bag", "#F96464"];
        case Category.INSURANCE:         return [i18n.t(LocalizationKey.INSURANCE), "security", "#0DB561"];
        case Category.INVESTMENT:        return [i18n.t(LocalizationKey.INVESTMENT), "chart-line", "#FF9800"];
        case Category.OUTGOING_TRANSFER: return [i18n.t(LocalizationKey.OUTGOING_TRANSFER), "bank-transfer-out", "#65BAFC"];
        case Category.PAY_INTEREST:      return [i18n.t(LocalizationKey.PAY_INTEREST), "label-percent", "#A6A1CE"];
        case Category.SHOPPING:          return [i18n.t(LocalizationKey.SHOPPING), "shopping", "#FD91BA"];
        case Category.TRANSPORTATION:    return [i18n.t(LocalizationKey.TRANSPORTATION), "car-side", "#C3DDFF"];
        case Category.COLLECT_INTEREST:  return [i18n.t(LocalizationKey.COLLECT_INTEREST), "sack-percent", "#88D392"];
        case Category.INCOMING_TRANSFER: return [i18n.t(LocalizationKey.INCOMING_TRANSFER), "bank-transfer-in", "#65BAFC"];
        case Category.SALARY:            return [i18n.t(LocalizationKey.SALARY), "cash-multiple", "#7DD53D"];
        default:
            break;
    }

    return ["Unknown", "file-question", Colors.ERROR60];
}