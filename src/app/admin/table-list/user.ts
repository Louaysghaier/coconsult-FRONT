export class User{
  id:Number;
  name :String;
  username:String;
  email:String;
  password:String;
  address:String;
  number:String;
  valid:Boolean;
  roles: [
    {
        id: String,
        name: String
    }
]

}