const kue = require('kue')
const redisConfig = require('../../config/redis')
const ResetPasswordMail = require('../jobs/ResetPasswordMail')

const Queue = kue.createQueue({ redis: redisConfig })

Queue.process(ResetPasswordMail.key, ResetPasswordMail.handle)

module.exports = Queue
