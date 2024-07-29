import visa from '../../../assets/images/Visa.svg';
import masterCard from './../../../assets/images/Group.png';
import americanExpress from './../../../assets/images/American Express.svg';
import discover from './../../../assets/images/Discover.svg';
import { cardPatterns } from '../../constans';
const cards = {
    visa,
    masterCard,
    americanExpress,
    discover
}

export const getCardType = (fistThreeDigits = null)=>{
    if(!fistThreeDigits)return cards;
    for (const [cardType,pattern] of Object.entries(cardPatterns)) {
        if(pattern.test(fistThreeDigits)){                        
            return {[cardType]: cards[cardType]};
        }
    }
    return cards;
}