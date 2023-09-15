export type UserProps = {
  id?: number;
  name: string;
  email: string;
  password_hash: string;
  // creatures: Creature[];
  // items: Item[];
};

export class User {
  private _id: number | undefined;
  private _name: string;
  private _email: string;
  private _password_hash: string;
  // public creatures: Creature[];
  // public items: Item[];

  private constructor(props: UserProps) {
    Object.assign(this, props);
  }

  public static create(props: UserProps): User {
    return new User(props);
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password_hash(): string {
    return this._password_hash;
  }

  set password_hash(value: string) {
    this._password_hash = value;
  }
}
