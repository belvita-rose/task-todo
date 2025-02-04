const { validateEmail, validatePassword } = require('../../backend/middlewares');
const httpMocks = require('node-mocks-http');

test('should validate correct email format', () => {
    const req = httpMocks.createRequest({ body: { email: 'test@example.com' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    validateEmail(req, res, next);
    expect(next).toHaveBeenCalled();
});

test('should reject incorrect email format', () => {
    const req = httpMocks.createRequest({ body: { email: 'invalid-email' } });
    const res = httpMocks.createResponse();
    const next = jest.fn();

    validateEmail(req, res, next);
    expect(res.statusCode).toBe(400);
    expect(res._getData()).toBe('Invalid email format');
});
