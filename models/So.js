const mongoose = require('mongoose');

const soSchema = new mongoose.Schema(
    {
        courseNo: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        semester: {
            type: String,
            required: true
        },

        soScore: [{
            so1: {
                type: Number,
                default: 0
            },
            so2: {
                type: Number,
                default: 0
            },
            so3: {
                type: Number,
                default: 0
            },
            so4: {
                type: Number,
                default: 0
            },
            so5: {
                type: Number,
                default: 0
            },
            so6: {
                type: Number,
                default: 0
            },
            so7: {
                type: Number,
                default: 0
            }
        }]
      },
{ collection: 'so' })

// soSchema.pre('validate', function (next) {
//     const sections = this.section.map(sec => sec.sectionNumber);
//     const uniqueSections = new Set(sections);

//     if (sections.length !== uniqueSections.size) {
//         return next(new Error('Sections must be unique within a so.'));
//     }

//     next();
// });

soSchema.index({ courseNo: 1, year: 1, semester: 1 }, { unique: true });

module.exports = mongoose.model('so', soSchema);