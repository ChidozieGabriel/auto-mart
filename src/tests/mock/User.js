class User {
  constructor() {
    this.user = {
      email: 'e@mail.com',
      password: '123_abc',
    };

    this.invalidEmailUser = {
      email: 'ljdfjdj;',
      password: '123_abc',
    };

    this.unRegisteredUser = {
      email: 'unregisterede@mail.com',
      password: 'abc-123',
    };

    this.anotherUser = {
      email: 'jane@doe.com',
      password: 'janedoe',
    };
  }

  generateUser() {
    const email = `${Date.now()}@gmail.com`;
    return { ...this.user, email };
  }
}

export default User;
