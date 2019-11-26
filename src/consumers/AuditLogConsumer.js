const kafka = require('kafka-node');
const Promise = require('bluebird');
// const ElasticSearchDao = require(__dirname + '/../dao/ElasticSearch.js');
const TOPIC_AUDITLOG_CREATE = 'AuditLogCreate';
// const config = require(__dirname + '/../../config.js');


/**
 * @classdesc Form Producer that pushes updates to Kafka.
 * @class
 */
class AuditLogCreateConsumer {
  /**
  * Create FormCreateConsumer.
  * @constructor
  * @param {String} kafkaHost - address of kafka server
  */
  constructor(kafkaHost) {
    const client = new kafka.KafkaClient({kafkaHost});
    const Consumer = kafka.Consumer;
    this.consumer = Promise.promisifyAll(new Consumer(
      client,
      [ { topic: TOPIC_AUDITLOG_CREATE } ],
      {
        autoCommit: false,
      },
    ));

    this.consumer.on('message', async message => {
      // try to store the form in S3
      const auditMessage = JSON.parse(message.value);
      console.log('the message being processed is :', JSON.stringify(auditMessage));

      try {
        let changeId;
        if (auditMessage.oldRecord) {
          // there is an old version we are moving from
          changeId = `${auditMessage.recordType}-
            ${auditMessage.recordId}-
            ${auditMessage.oldRecordVersionId}-
            ${auditMessage.newVersionId}`;
        }
        else {
          // there is no old version
          changeId = `${auditMessage.recordType}-${auditMessage.recordId}-${auditMessage.newVersionId}`;
        }
        console.log('the change id is :', changeId);
        // we need to diff these records
        // use the docs/exampleAuditEntry.json
        // await this.consumer.commitAsync();
      }
      catch (error) {
        console.log('error processing form:', error);
        throw error;
      }
    });

    this.consumer.on('error', err => {
      console.log('Form Create Producer error is :', err);
      throw err;
    });
  }
}

module.exports = AuditLogCreateConsumer;
