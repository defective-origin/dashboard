import { FeatureFlag, FeatureFlagModel, PATHNAME } from './FeatureFlag.model'


let savedRecord: FeatureFlag
const MOCK_OPERATION_RECORD = { name: 'OPERATION_NAME', active: true }
const MOCK_SAVED_RECORD = { name: 'NAME_1', active: false }
const MOCK_SAVED_RECORDS = [MOCK_SAVED_RECORD]

describe(`[${PATHNAME}] api`, () => {
  beforeEach(async () => {
    savedRecord = await FeatureFlagModel.create(MOCK_SAVED_RECORD)
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

      const record = await FeatureFlagModel.findOne(MOCK_OPERATION_RECORD)

      expect(record).not.toBeNull()
      expect(record).toMatchObject(MOCK_OPERATION_RECORD)
    })
  
    it('should fetch operation status', async () => {
      const response = await server.post(`/${PATHNAME}`).send(MOCK_OPERATION_RECORD)

      expect(response.status).toBe(200)
    })
  })


  describe('[update] endpoint', () => {
    it('should update record by id', async () => {
      await server.put(`/${PATHNAME}/${savedRecord?.id}`).send(MOCK_OPERATION_RECORD)

      const record = await FeatureFlagModel.findOne(MOCK_OPERATION_RECORD)

      expect(record).toMatchObject(MOCK_OPERATION_RECORD)
    })

    it('should fetch operation status', async () => {
      const response = await server.put(`/${PATHNAME}/${savedRecord?.id}`).send(MOCK_OPERATION_RECORD)

      expect(response.status).toBe(200)
    })
  })


  describe('[delete] endpoint', () => {
    it('should delete record by id', async () => {
      await server.delete(`/${PATHNAME}/${savedRecord?.id}`)

      const record = await FeatureFlagModel.findOne(MOCK_SAVED_RECORD)

      expect(record).toBeNull()
    })

    it('should fetch operation status', async () => {
      const response = await server.delete(`/${PATHNAME}/${savedRecord?.id}`)
  
      expect(response.status).toBe(200)
    })
  })
})
