/* eslint-disable camelcase */
import chai, { should, expect, assert } from 'chai';
import chaiHTTP from 'chai-http';
import server from '..';
import { User, Car, Order } from './mock';
import Utils from './Utils';

should();
chai.use(chaiHTTP);
const utils = new Utils(server);
const { user } = new User();
const { car } = new Car(0);
const { order, orderWithInvalidCarId } = new Order();
const apiV1 = '/api/v1';
const route = `${apiV1}/order`;

let postedOrder = {};
let token = '';

describe('Car order routes', () => {
  before((done) => {
    utils
      .postUser(user)
      .then((t) => {
        token = t;
        utils
          .postCar(car, token)
          .then((res) => {
            const { id, price } = res.body.data;
            order.car_id = id;
            order.price_offered = 0.95 * price;
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  describe('POST /order/', () => {
    it('should throw error when there is no token provided', (done) => {
      utils
        .postOrder(order)
        .then((res) => {
          res.should.have.status(401);
          res.body.should.be.an('object');
          res.body.should.have.property('error');
          expect(res.body.status).to.eql(res.status);
          done();
        })
        .catch(err => done(err));
    });

    it('should create a purchase order', (done) => {
      utils
        .postOrder(order, token)
        .then((res) => {
          res.should.have.status(201);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql(res.status);
          expect(data).to.be.an('object');
          data.should.have.property('id');
          data.should.have.property('car_id');
          data.should.have.property('price_offered');
          data.should.have.property('status');

          const { price_offered, status: orderStatus } = data;
          assert.equal(order.price_offered, price_offered);
          assert.equal(orderStatus, 'pending');
          postedOrder = { ...data };
          done();
        })
        .catch(err => done(err));
    });

    it('should throw error when the car-id is not valid', (done) => {
      chai
        .request(server)
        .post(route)
        .set({ Authorization: `Bearer ${token}` })
        .send(orderWithInvalidCarId)
        .then((res) => {
          res.should.have.status(400);
          res.body.should.be.an('object');
          res.body.should.have.property('error');

          const { status } = res.body;
          expect(status).to.eql(res.status);
          done();
        })
        .catch(err => done(err));
    });
  });

  describe('PATCH /order/<:order-id>/price', () => {
    it('should update the price of a purchase order', (done) => {
      if (!postedOrder.id) {
        throw Error('no posted order');
      }

      const newPrice = postedOrder.price_offered * 0.5;
      chai
        .request(server)
        .patch(`${route}/${postedOrder.id}/price`)
        .set({ Authorization: `Bearer ${token}` })
        .send({ price_offered: newPrice })
        .then((res) => {
          res.should.have.status(200);
          res.body.should.be.an('object');

          const { status, data } = res.body;
          expect(status).to.eql(res.status);
          expect(data).to.be.an('object');
          data.should.have.property('id');
          data.should.have.property('car_id');
          data.should.have.property('status');
          data.should.have.property('old_price_offered');
          data.should.have.property('new_price_offered');

          const {
            id, car_id, old_price_offered, new_price_offered,
          } = data;
          expect(id).to.eql(postedOrder.id);
          expect(car_id).to.eql(postedOrder.car_id);
          expect(old_price_offered).to.eql(postedOrder.price_offered);
          assert.equal(old_price_offered, postedOrder.price_offered);
          assert.equal(new_price_offered, newPrice);

          done();
        })
        .catch(err => done(err));
    });

    xit("should not update when order's status does not read pending", () => {
      const newPrice = 100.0;
      chai
        .request(server)
        .patch(`${apiV1}/patch/order/${postedOrder.id}/price`)
        .send(newPrice);
    });
  });
});
