export const charges = {
  Angular: 8000,
  dotNet: 8000,
  WebDev: 12000,
  js: 5000,
  NodeJs: 7000,
  db: 5000,
  CEH: 16000,
  Testing: 7000


};

export class MoneyConversion{
  static inPaisa(rupees): number {
    return rupees * 100;
  }
}
