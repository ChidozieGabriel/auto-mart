/* eslint-disable camelcase */
import chai, { expect, should } from 'chai';
import chaiHTTP from 'chai-http';
import server from '..';
import { user, unRegisteredUser } from './mock/user';

should();
chai.use(chaiHTTP);
const route = '/api/v1/auth';

describe('User authentication routes', () => {
  describe('POST /auth/signup', () => {
    it('should create a new user account', (done) => {
      chai
        .request(server)
        .post(`${route}/signup`)
        .send(user)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql(res.status);
          expect(data).to.be.an('object');

          const { email } = data;
          data.should.have.property('token');
          data.should.have.property('id');
          data.should.have.property('created_on');
          data.should.not.have.property('password');
          data.should.have.property('is_admin');
          expect(email).to.eql(user.email);

          done();
        })
        .catch(err => done(err));
    });
  });

  xdescribe('POST /auth/signin', () => {
    it('should login a registered user', (done) => {
      chai
        .request(server)
        .post(`${route}/signin`)
        .send(user)
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql(res.status);
          res.body.data.should.have.property('token');
          res.body.data.should.have.property('id');

          const { email } = data;
          expect(email).to.eql(user.email);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it('should throw error if no user is found', (done) => {
      chai
        .request(server)
        .post(`${route}/signin`)
        .send(unRegisteredUser)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.have.property('error');
          const { status } = res.body;
          expect(status).to.eql(res.status);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });
});