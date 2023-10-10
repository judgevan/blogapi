const Joi = required('joi')
const schema = Joi.object({
    post_id: Joi.string().required().trim(),
    content: Joi.string().required().trim(),
    post_Author: Joi.string().trim(),
    post_createdDate: Joi.string().trim(),
    allow_comments: Joi.boolean().trim(),
    require_approval: Joi.boolean().trim(),
    post_url: Joi.string().trim(),
    shared_message: Joi.string().trim(),
    seo_title: Joi.string().trim(),
    seo_description: Joi.string().trim(),
    tags: Joi.string().trim(),
    commenting_system: Joi.string().trim(),
    created_date: Joi.date().trim(),
    updated_date: Joi.date().trim(),
    date_format: Joi.string().trim(),
})

module.exports = schema;