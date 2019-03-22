import formPost from '../src/formPost'
import sinon from 'sinon'
import { assert } from 'chai'

describe('formPost', function() {
    it('will validate the fields', () => {
        const req = {
            body: {
                first_name: '',
                last_name: '',
                fiscal_code: '',
                birth_date: '',
            }
        }
        const res = {
            setHeader: sinon.spy(),
            end: sinon.stub(),
        }

        formPost(req, res)
        const resultBody = JSON.parse(res.end.getCalls()[0].args[0])
        const resultStatusCode = res.statusCode

        assert.equal(resultBody.result, 'ko')
        assert.equal(resultBody.errors.length, 4)
        assert.equal(resultStatusCode, 400)
    })
  })