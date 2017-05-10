class Simcha {
    id: number;
    name: string;
    date: Date|null;
    totalContributions: number;
    contributions: Contribution[];
    constructor(name: string, date: Date|null) {
        this.name = name;
        this.date = date;
    }
}

class SimchaContributor{
    contributor: Contributor;
    amountGave: number;
    give:boolean;
}

class Contributor {
    id: number;
    firstName: string;
    lastName: string;
    cellNumber: string;
    dateCreated: Date|null;
    alwaysInclude: boolean;
    currentBalance: number;
    contributions: Contribution[];
    deposits: Deposit[];
    constructor(firstName: string, lastName: string, cellNumber: string, dateCreated: Date|null, alwaysInclude: boolean) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.cellNumber = cellNumber;
        this.dateCreated = dateCreated;
        this.alwaysInclude = alwaysInclude;
    }
}

class Contribution {
    id: number;
    contributor: Contributor;
    simcha: Simcha;
    amount: number;
    date: Date;
    constructor(simcha: Simcha, contributor: Contributor, amount: number, date: Date) {
        this.simcha = simcha;
        this.contributor = contributor;
        this.amount = amount;
        this.date = date;
    }
}

class Deposit {
    id: number;
    contributor: Contributor;
    amount: number;
    date: Date;
    constructor(contributor: Contributor, amount: number, date: Date) {
        this.contributor = contributor;
        this.amount = amount;
        this.date = date;
    }
}

class History {
    type: string;
    simcha: string;
    amount: number;
    date: Date;
    constructor(type: string, simcha: string, amount: number, date: Date) {
        this.type = type;
        this.simcha = simcha;
        this.amount = amount;
        this.date = date;
    }
}

export {
    Simcha,
    Contributor,
    Contribution,
    Deposit,
    History,
    SimchaContributor
}