import * as Types from '../Simcha';


export interface RegisterState {
    user: Types.User;
    confirmPassword: string;
    emailError:boolean;
    userNameError:boolean;
    passwordError:boolean;
    confirmPasswordError:boolean;
}



export interface LoginState {
    username:string;
    password:string;
    error:string;
}

export interface MyAccountState{
    user: Types.User;
    confirmPassword: string;
    emailError:boolean;
    userNameError:boolean;
    passwordError:boolean;
    confirmPasswordError:boolean;
    showPasswordFields:boolean;
}

export interface MyAccountFieldProps{
    inputName:string,
    label:string,
    value:string,
    onChange: (event) => void;
}

export interface MyAccountFieldState{
    editMode:boolean

}
