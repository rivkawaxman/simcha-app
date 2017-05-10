import * as Types from '../Simcha';

export interface SimchasState {
    simchas: Types.Simcha[];
}

export interface SimchaState {
    detailOpen: boolean;
}

export interface SimchaProps {
    simcha: Types.Simcha;
    onClickOpen: () => void;
    onClickDelete: (id:number) => void;
    onClickClose: () => void;
}

export interface NewSimchaProps {
    onSubmit: (simcha: Types.Simcha) => void;
}

export interface NewSimchaState {
    showModal: boolean;
    simcha: Types.Simcha;
}

export interface SimchaTableProps {
    simchas: Types.Simcha[];
    deleteSimcha: (id: number) => void;
    updateSimchas: () => void;
}

export interface SimchaGroupProps {
    simcha: Types.Simcha;
    deleteSimcha: (id: number) => void;
    updateSimchas: () => void;

}

export interface SimchaGroupState {
    showDetails: boolean;
}

export interface SimchaContributionsProps {
    simcha: Types.Simcha;
    updateSimchas: ()=> void;
}

export interface SimchaContributionsState {
    contributions: Types.Contribution[];
}

export interface AddContributionProps {
    contributions: Types.Contribution[];
    simcha: Types.Simcha;
    onAdd: ()=>void;
}
export interface AddContributionState {
    showModal: boolean;
    contributors: Types.SimchaContributor[];
}



