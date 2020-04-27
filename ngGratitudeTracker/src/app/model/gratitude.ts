export class Gratitude {

  id: number;
  firstGrat: string;
  secondGrat: string;
  thirdGrat: string;
  entryDate: string;

  constructor(id?: number, firstGrat?: string, secondGrat?: string, thirdGrat?: string, entryDate?: string){
    this.id = id;
    this.firstGrat = firstGrat;
    this.secondGrat = secondGrat;
    this.thirdGrat = thirdGrat;
    this.entryDate = entryDate;
  }
}
