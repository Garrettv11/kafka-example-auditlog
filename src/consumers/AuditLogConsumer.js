const kafka = require('kafka-node');
const Promise = require('bluebird');
// const ElasticSearchDao = require(__dirname + '/../dao/ElasticSearch.js');
const TOPIC_AUDITLOG_CREATE = 'AuditLogCreate';
// const config = require(__dirname + '/../../config.js');
const diff = require('deep-diff');
const AuditLogRecord = require(__dirname + '/../models/AuditLogRecord.js');
const ElasticSearchDao = require(__dirname + '/../dao/ElasticSearch.js');

/**
* @description Creates list of changed fields.
* @param {Object} oldRecord - old version of object
* @param {Object} newRecord - new version of object
* @return {Object} - object containing separated list of changed fields
*/
const createDiffForRecords = (oldRecord, newRecord) => {
  const diffOutput = {
    newFields: [],
    editedFields: [],
    deletedFields: [],
  };
  const recordDiff = diff(oldRecord, newRecord);
  for (const i in recordDiff) {
    const diffRow = recordDiff[i];
    let changedKeys = [];
    // console.log('the diffrow is :', diffRow);
    if (typeof diffRow.rhs === 'object') {
      changedKeys = changedKeys.concat(Object.keys(diffRow.rhs));
    }
    else {
      console.log('diffrow path is :', diffRow.path);
      console.log('selected diffrow item is :', diffRow.path[diffRow.path.length -1]);

      changedKeys.push(diffRow.path[diffRow.path.length -1]);
    }
    // console.log('diffrow rhs is :', diffRow.rhs);
    switch (diffRow.kind) {
    case 'N': {
      diffOutput.newFields = diffOutput.newFields.concat(changedKeys);
      break;
    }
    case 'D': {
      diffOutput.deletedFields = diffOutput.deletedFields.concat(changedKeys);
      break;
    }
    case 'E': {
      diffOutput.editedFields = diffOutput.editedFields.concat(changedKeys);
      break;
    }
    case 'A': {
      diffOutput.editedFields = diffOutput.editedFields.concat(changedKeys);
      break;
    }
    default:
      break;
    }
  }
  return diffOutput;
};
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
          console.log('there is an old version');
          // there is an old version we are moving from
          changeId = `${auditMessage.recordType}-
            ${auditMessage.recordId}-
            ${auditMessage.oldRecordVersionId}-
            ${auditMessage.newRecordVersionId}`;
        }
        else {
          // there is no old version
          changeId = `${auditMessage.recordType}-${auditMessage.recordId}-${auditMessage.newRecordVersionId}`;
        }
        const hasAlreadyAddedLogToSearch = await ElasticSearchDao.doesDocumentExist('auditlog', changeId);
        console.log('has already added to elastic search? ', hasAlreadyAddedLogToSearch);
        if (hasAlreadyAddedLogToSearch) {
          return await this.consumer.commitAsync();
        }
        console.log('the change id is :', changeId);

        // we need to diff these records
        const oldRecord = auditMessage.oldRecord ? auditMessage.oldRecord : {}; // empty if no old object exists
        const newRecord = auditMessage.newRecord;
        const changedFields = createDiffForRecords(oldRecord, newRecord);
        console.log('difference object is :', changedFields);
        if (auditMessage.isPartialUpdate) {
          // the won't be any delets in a PUT situation
          delete changedFields.deletedFields;
        }
        const auditOutput = {
          changeId,
          recordType: auditMessage.recordType,
          recordId: auditMessage.recordId,
          author: auditMessage.author,
          timestamp: auditMessage.timestamp,
          newRecord: auditMessage.newRecord,
          newRecordVersionId: auditMessage.newRecordVersionId,
          changedFields,
        };
        if (auditMessage.oldRecord) {
          auditOutput.oldRecord = auditMessage.oldRecord;
          auditOutput.oldRecordVersionId = auditMessage.oldRecordVersionId;
        }
        // validate object before sending to ES
        const validationResult = AuditLogRecord.validate(auditOutput);
        if (validationResult.error) {
          const error = new Error(`invalid audit log structure: ${validationResult.error}`);
          throw error;
        }
        // pass - send to ES
        await ElasticSearchDao.addDocumentWithIdToIndex('auditlog', changeId, auditOutput);
        return await this.consumer.commitAsync();
      }
      catch (error) {
        console.log('error processing audit log:', error);
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
