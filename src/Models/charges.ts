export const charges = {
  Angular: 8000,
  dotNet: 10000,
  WebDev: 12000,
  js: 5000,
  NodeJs: 7000,
  db: 5000,
  CEH: 16000,
  Testing: 7000


};

export class MoneyConversion {
  static inPaisa(rupees): number {
    return rupees * 100;
  }

}

export const paymentMethods = {
  card: {percentage: {national: 2, international: 3}, name: 'card'},
  netbanking: {percentage: {national: 2, international: 3}, name: 'netbanking'},
  wallet: {percentage: 2, name: 'wallet'},
  emi: {percentage: 3, name: 'emi'},
  upi: {percentage: 2, name: 'upi'}
};

export class CovenienceCharges {
  private static GST = 0;
  category1: 2; // Indian Credit Cards, Indian Debit Cards, Net Banking from 58 Banks, UPI, Wallets including Freecharge, Mobikwik etc.
  category2: 3; // Diners and Amex Cards, International Cards, EMI

  static convenienceCharges(amount: number, percentage: number): number {
    return amount * (percentage / 100);
  }

  static summingConvenienceCharges(amount: number, percentage: number): number {
    amount = this.addGST(amount);
    const convenienceCharge = this.convenienceCharges(amount, percentage);
    return amount + convenienceCharge;
  }

  private static findPercentage(pymtMethod: string, othrParams?: string[]): number {
    return this.recursiveFunction(paymentMethods[pymtMethod].percentage, othrParams);
  }

 private static recursiveFunction(obj, params) {
    const length = params === undefined ? 0 : params.length;
    if (length > 0) {
      const index = params.splice(0, 1);
      obj = obj[index];
      return this.recursiveFunction(obj, params);
    } else {
      return obj;
    }
  }

  static addGST(amount: number): number {
    return amount * (this.GST / 100) + amount;
  }

  public static ConvToAcceptedPercentage(mode: string): number {
    switch (mode) {
      case 'Ncard':
        return this.findPercentage('card', ['national']);
      case 'Icard':
        return this.findPercentage('card', ['international']);
      case 'Nnet':
        return this.findPercentage('netbanking', ['national']);
      case 'Inet':
        return this.findPercentage('netbanking', ['international']);
      case 'upi':
        return this.findPercentage('upi');
      case 'emi':
        return this.findPercentage('emi');
      case 'wallet':
        return this.findPercentage('wallet');
    }


  }  public static getPaymentModeName(mode: string): string {
    switch (mode) {
      case 'Ncard':
        return 'card';
      case 'Icard':
        return 'card';
      case 'Nnet':
        return 'netbanking';
      case 'Inet':
        return 'netbanking';
      case 'upi':
        return 'upi';
      case 'emi':
        return 'emi';
      case 'wallet':
        return 'wallet';
    }


  }
}
