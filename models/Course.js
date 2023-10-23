const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseNo: {
        type : String,
        required : true
    },
    year : {
        type : String,
        required : true,
    },
    semester : {
        type : String,
        required : true,
    },
    csoList: {
        scoreUsesList:[String],
        type: Array,
        objEN: String,
        objTH: String,
        selectedSO: [Number],
        csoScore: {
            type: Number,
            default: 0,
            required: true
        }
    },
    status:{
        type: String,
        enum: ["Waiting", "Success"],
        required: true
    },
    section : [{
        sectionNumber: {
            type: [String],
            required: true
        },
        status:{
            type: String,
            enum: ["Waiting", "In Progress", "Success"],
            required: true
        },
        csoScoreEachSec: {
            type: Array,
            default: [],
            required: true
        }
    }]
}, { collection: 'courses' });

courseSchema.pre('validate', function(next) {
    const sections = this.section.map(sec => sec.sectionNumber);
    const uniqueSections = new Set(sections);

    if (sections.length !== uniqueSections.size) {
        return next(new Error('Sections must be unique within a course.'));
    }

    next();
});

courseSchema.index({courseNo: 1 , year: 1 , semester: 1} , { unique: true});

module.exports = mongoose.model('course', courseSchema);