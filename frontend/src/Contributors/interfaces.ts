import * as Types from "../Simcha";

export interface ContributorsState {
    contributors: Types.Contributor[];
    total: number;
}

export interface ContributorTableProps {
    contributors: Types.Contributor[];
    deleteContributor: (id: number) => void;
    editContributor: (contributor:Types.Contributor) => void;
    deposit: (deposit: Types.Deposit) => void;
    validatePhone: (phoneNum:string)=> void;
}

export interface ContributorProps {
    contributor: Types.Contributor;
    onClickEdit: (contributor:Types.Contributor) => void;
    onClickDeposit: (deposit: Types.Deposit) => void;
    onClickDelete: (id: number) => void;
    validatePhone: (phoneNum:string)=> void;
}

export interface NewContributorState {
    showModal: boolean;
    contributor: Types.Contributor;
    cellNumberError:boolean;

}

export interface NewContributorProps {
    validatePhone: (phoneNum:string)=> void;
    onSubmit: (contributor: Types.Contributor) => void;
}

export interface EditContributorState {
    showModal: boolean;
    contributor: Types.Contributor;
    cellNumberError:boolean;
}

export interface EditContributorProps {
    validatePhone: (phoneNum:string)=> void;
    contributor: Types.Contributor;
    onSubmit: (contributor: Types.Contributor) => void;
}

export interface DepositState {
    showModal: boolean;
    amount: number;
    //contributor: Types.Contributor;
}

export interface DepositProps {
    contributor: Types.Contributor;
    onSubmit: (contributor: Types.Deposit) => void;
}

export interface ContributorHistoryProps {
    contributorId : number;
}

export interface ContributorHistoryState {
    showModal: boolean;
    history: Types.History[];
}