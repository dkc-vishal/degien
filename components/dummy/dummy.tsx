import { Construction } from "lucide-react";

class refreshTokenData {
  private name: string;
  protected email: string;
  public date: string;

  constructor(name: string, email: string, data: string) {
    this.name = name;
    this.email = email;
    this.date = data;
  }

  toString(): string {
    console.log(`Name: ${this.name}, Email: ${this.email}, Date: ${this.date}`);
    return "";
  }
}

class protectedDataString extends refreshTokenData {
  gmail: string;

  constructor(name: string, email: string, date: string) {
    super(name, email, date);
    this.gmail = "my gamil address " + this.email;
  }

  getEmail(): void {
    console.log(`this is gmail ${this.gmail}`);
  }

  getName(): void {
    console.log(`this is gmail ${this.date}`);
  }
}

const value = new protectedDataString(
  "shishpal",
  "golu21stnovg@gmail.com",
  "dbhg"
);
value.getEmail();
value.getName();
