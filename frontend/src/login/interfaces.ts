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


export interface ForgotPasswordState {
    username:string;
    error:string;
}

export interface ChangePasswordState {
    password:string;
    confirmPassword:string;
    passwordError:boolean;
    confirmError:boolean;
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
    isPassword?:boolean;
    value:string,
    error?:boolean,
    errorMessage?:string,
    required?:boolean,
    confirmValue?:string,
    onChange: (event) => void;
    handleSubmit: () => Promise<boolean>;
    handleChangePassword?: () => void;
}

export interface MyAccountFieldState{
    editMode:boolean,
    passWordError:boolean,
    confirmPasswordError:boolean

}
