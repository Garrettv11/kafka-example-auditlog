
const Joi = require('@hapi/joi');

const AuditLogRecordChangedProperties = Joi.object().keys({
  newFields: Joi.array().items(Joi.string()).required()
    .description('items which were added in new version of object'),
  editedFields: Joi.array().items(Joi.string()).required()
    .description('items which were edited in new version of object'),
  deletedFields: Joi.array().items(Joi.string()).required()
    .description('items which were deleted in new version of object'),
});

const AuditLogRecord = Joi.object().keys({
  changeId: Joi.string().required()
    .description('Unique identifier of the audit log'),
  recordType: Joi.string().required()
    .description('The kind of object modified'),
  recordId: Joi.string().required()
    .description('Id of the object modified'),
  author: Joi.string().required()
    .description('Name of the person who changed the item'),
  timestamp: Joi.date().iso().required()
    .description('date and time the change occurred'),
  newRecord: Joi.object().required()
    .description('the new state of the record'),
  newRecordVersionId: Joi.string().required()
    .description('versionId of the newly modified record'),
  oldRecord: Joi.object().optional()
    .description('The old state of the record. Not present if the record is being newly created'),
  oldRecordVersionId: Joi.string().optional()
    .description('versionId of the old record'),
  changedFields: AuditLogRecordChangedProperties.required()
    .description('list of fields that have changed since the last version'),
})
  .description('Audit Log Record ')
  .label('AuditLogRecord');

module.exports = AuditLogRecord;
