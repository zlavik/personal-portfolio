import { Allow, Entity, Fields, Relations } from "remult";

@Entity("users", {
  allowApiCrud: Allow.authenticated
})
export class User {
  @Fields.cuid()
  id = ''

  @Fields.string<User>({
    validate: user => {
      if (user.username.length < 3)
        throw Error("Username must be at least 3 characters");
    }
  })
  username = "";

  @Fields.string<User>()
  roles: string[] = ["basic"];

  @Fields.string<User>({
    validate: user => {
      if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(user.password))
        throw Error("Password must be at least 8 characters and include a digit, a lowercase letter, and an uppercase letter");
    }
  })
  password = "";

  @Fields.boolean()
  isLoggedIn = false

  @Relations.toMany(() => Transaction) 
  transactions?: Transaction[] 
}

@Entity("Transactions", {
  allowApiCrud: Allow.authenticated
})
export class Transaction {
  @Fields.cuid()
  transactionId = '';

  @Fields.string()
  date = ''

  @Fields.string()
  description = ''

  @Fields.string()
  amount = ''

  @Fields.string()
  transactionType = ''

  @Fields.string()
  category = ''

  @Fields.boolean()
  is_income = false



  @Relations.toOne(() => User) 
  userId?: User
}