import * as Types from '../Simcha';

export interface RegisterProps {

}

export interface RegisterState {
    user: Types.User;
    confirmPassword: string;
    emailError:boolean;
    userNameError:boolean;
    passwordError:boolean;
    confirmPasswordError:boolean;
}

export interface LoginProps {

}

export interface LoginState {
    username:string;
    password:string;
    error:string;
}