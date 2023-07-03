class UserDto {
  email;
  userName;
  id;
  isActivate;

  constructor(model) {
    this.email = model.email;
    this.userName = model.password;
    this.id = model.id;
    this.isActivate = model.isActivate;
  }
}

export default UserDto;
