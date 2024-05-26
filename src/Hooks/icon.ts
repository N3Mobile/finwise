import { Colors } from "@/Theme";

export const useWalletIcon = (type: string) => {
    if (type === 'cash') {
        return ['cash', Colors.PRIMARY];
    } else if (type === 'card') {
        return ['credit-card', Colors.TERTIARY];
    }
    return ['file-question', Colors.ERROR60];
}

export const useCategoryIcon = (type: 
    'bill' | 
    'education' |
    'entertainment' |
    'family' |
    'food' |
    'gift' |
    'health' | 
    'insurance' |
    'investment' |
    'outgoing-transfer' |
    'shopping' |
    'transportation' | 
    string
) => {
    switch (type) {
        case 'bill':
            return ['newspaper', Colors.PRIMARY70];
        default:
            break;
    }
    return ['file-question', Colors.ERROR60];
}