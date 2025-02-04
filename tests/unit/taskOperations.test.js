const httpMocks = require('node-mocks-http');
const fs = require('fs');
const { authenticate } = require('../../backend/middlewares');

jest.mock('fs');

test('should add a task with valid data', () => {
    const req = httpMocks.createRequest({
        method: 'POST',
        url: '/add-task',
        headers: { authorization: 'valid-token' },
        body: { title: 'New Task' }
    });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    authenticate(req, res, next);
    expect(next).toHaveBeenCalled();
});