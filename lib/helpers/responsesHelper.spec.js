const responsesHelper = require('./responsesHelper')
const{  mockResponse } = require('mock-req-res')

const res = mockResponse({
  status: jest.fn(),
  json: jest.fn()
})

describe('#responsesHelper', () => {
  describe('#handleSuccess', () => {
    test('should call res.status and res.json passing given arguments', () => {
      responsesHelper.handleSuccess(res, 200, 'success')
      expect(res.json).toHaveBeenCalledWith({message: 'success'})
    })
  })
  describe('#handleSuccessResult', () => {
    test('should call res.json passing given arguments', () => {
      responsesHelper.handleSuccessResult(res, 200, {results: 'some results'})
      expect(res.json).toHaveBeenCalledWith({message: 'success', results: { results: 'some results'}})
    })
  })
  describe('#handleFailure', () => {
    test('should call res.status and res.json passing given arguments', () => {
      responsesHelper.handleFailure(res, 400, {message: 'invalid data in request' })
      expect(res.json).toHaveBeenCalledWith({ message: 'invalid data in request'  })
    })
  })
})
