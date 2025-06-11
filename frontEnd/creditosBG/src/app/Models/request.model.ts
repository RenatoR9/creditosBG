export interface CreditRequest {
  id : number,
  amountRequested : number;
  termInMonths : number;
  monthlyIncome : number;
  workSeniorityYears : number;
  status : string;
  userId : number
}