class Bankdetails {
     private balence: number;
     public accountHolderName: string

     constructor(accountHolderName: string, initialBalance: number) {

          this.accountHolderName = accountHolderName,
               this.balence = initialBalance
     }
     private getBalance(): number {
          return this.balence
     }
     public deposit(amount: number) {
          this.balence += amount
     }
     public withdraw(amount: number) {
          this.balence -= amount

     }
}

class SavingsAccount extends Bankdetails {
     public addInterest() {
          this.balence += this.balence * 0.5
     }
}

const savings = new SavingsAccount("John", 2000);
savings.addInterest();
console.log(savings.getBalance())










const person1 = new Bankdetails("alex", 1000)
const person2 = new Bankdetails("rishi", 5000)
const person3 = new Bankdetails("alex", 10000)
console.log(person1.getBalance());
person1.deposit(500)
person3.deposit(500)
person1.withdraw(200)
person2.withdraw(200)

console.log(person1.getBalance())
console.log(person2.getBalance())
console.log(person3.getBalance())