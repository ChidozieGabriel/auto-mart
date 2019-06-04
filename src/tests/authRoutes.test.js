/* eslint-disable camelcase */
import chai, { expect, should } from 'chai';
import chaiHTTP from 'chai-http';
import server from '..';
import { user } from './models/user';

should();
chai.use(chaiHTTP);
const route = '/api/v1/auth';

describe('User authentication routes', () => {
  describe('POST /auth/signup', () => {
    it('should create a new user account', done => {
      chai
        .request(server)
        .post(`${route}/signup`)
        .send(user)
        .then(res => {
          res.should.have.status(201);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql(res.status);
          expect(data).to.be.an('object');

          const { email } = data;
          data.should.have.property('token');
          data.should.have.property('id');
          data.should.not.have.property('password');
          expect(email).to.eql(user.email);

          done();
        })
        .catch(err => done(err));
    });
  });
});
