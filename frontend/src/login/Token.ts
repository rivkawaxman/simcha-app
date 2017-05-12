import * as Cookies from 'js-cookie';

export function SaveTokenAsCookie(token:string){
    Cookies.set('simchaFundToken', token, {expires:1});
}

export function GetTokenCookie():string{
    return Cookies.get('simchaFundToken');
}

export function TokenExists():boolean{
    return Cookies.get('simchaFundToken') !== undefined;
}

export function DeleteTokenCookie(){
    Cookies.remove('simchaFundToken');
}