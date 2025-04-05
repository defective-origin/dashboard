import mongoose from 'mongoose'
import { Donation, DonationModel, PATHNAME } from './Donation.model'


let savedRecord: Donation
const MOCK_OPERATION_RECORD = { value: 0, content: 'OPERATION CONTENT', meta: 'OPERATION META', reason: { id: new mongoose.Types.ObjectId(1).toString() } }
const MOCK_SAVED_RECORD = { value: 123456789, content: 'SAVED CONTENT', meta: 'SAVED META', reason: { id: new mongoose.Types.ObjectId(2).toString() } }
const MOCK_SAVED_RECORDS = [MOCK_SAVED_RECORD]

describe(`[${PATHNAME}] api`, () => {
  beforeEach(async () => {
    savedRecord = await DonationModel.create(MOCK_SAVED_RECORD)
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

      const record = await DonationModel.findOne({ meta: MOCK_OPERATION_RECORD.meta })

      expect(record).not.toBeNull()
      expect(record).toMatchObject({ meta: MOCK_OPERATION_RECORD.meta })
    })
  
    it('should fetch operation status', async () => {
      const response = await server.post(`/${PATHNAME}`).send(MOCK_OPERATION_RECORD)

      expect(response.status).toBe(200)
    })
  })
})
