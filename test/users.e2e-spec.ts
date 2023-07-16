import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('Creating new user', () => {
    it('should create a new user succesfully when proper parameters are used', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'test',
          email: 'email@example.com',
          password: '@Password123',
        })
        .expect(201);
    });

    it('should fail when email is not valid', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'test',
          email: 'email',
          password: '@Password123',
        })
        .expect(400);
    });

    it('should fail when password is week', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send({
          name: 'test',
          email: '',
          password: '123',
        })
        .expect(400);
    });
  });
});
