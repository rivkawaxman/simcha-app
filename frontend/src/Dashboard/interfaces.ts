import * as Types from '../Simcha';

export interface DashboardState{
    totalContributors:number;
    balance:number;
    upcomingSimchas: Types.Simcha[];
    username:string;
}