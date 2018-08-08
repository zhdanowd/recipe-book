export enum Units {Grams, Items}

export class Ingredient{

	constructor(public id: number, public name: string, public amount:number, public units: Units){}
}