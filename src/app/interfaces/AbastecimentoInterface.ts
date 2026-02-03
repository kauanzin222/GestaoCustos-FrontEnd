import { PostoInterface } from "./PostoInterface";

export interface AbastecimentoInterface {
    id ?: number;
    price ?: number;
    statusPay : boolean;
    date ?: Date;
    posto ?: PostoInterface;
}
