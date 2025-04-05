import { Log, LogModel, PATHNAME } from './Log.model'


let savedRecord: Log
const MOCK_OPERATION_RECORD = { name: `INFO`, content: `CONTENT`, agent: `Chrome 10` }
const MOCK_SAVED_RECORD = { name: `WARN`, content: `CONTENT`, agent: `Chrome 90` }
const MOCK_SAVED_RECORDS = [MOCK_SAVED_RECORD]

describe(`[${PATHNAME}] api`, () => {
  beforeEach(async () => {
    savedRecord = await LogModel.create(MOCK_SAVED_RECORD)
  })

  describe('[read] endpoint', () => {
    it('should fetch all records', async () => {
      const response = await server.get(`/${PATHNAME}`)
  
      expect(response.status).toBe(200)
      expect(response.body.length).toBe(MOCK_SAVED_RECORDS.length)
      expect(response.body).toMatchObject(MOCK_SAVED_RECORDS)
    })

    it('should fetch record by id', async () => {
      const response = await server.get(`/${PATHNAME}/${savedRecord?.id}`)
  
      expect(response.status).toBe(200)
      expect(response.body).toMatchObject(MOCK_SAVED_RECORD)
    })
  })


  describe('[create] endpoint', () => {
    it('should create new record', async () => {
      await server.post(`/${PATHNAME}`).send(MOCK_OPERATION_RECORD)

      const record = await LogModel.findOne(MOCK_OPERATION_RECORD)

      expect(record).not.toBeNull()
      expect(record).toMatchObject(MOCK_OPERATION_RECORD)
    })
  
    it('should fetch operation status', async () => {
      const response = await server.post(`/${PATHNAME}`).send(MOCK_OPERATION_RECORD)

      expect(response.status).toBe(200)
    })
  })
})
