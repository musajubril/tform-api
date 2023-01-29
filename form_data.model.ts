import mongoose from 'mongoose';

const TFormDataSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    mobile_number: String,
    email: String,
    gender: String,
    relationship: String,
    has_gov_profile: String,
    is_visa_holder: String,
    my_gov: String,
    my_gov_username: String,
    my_gov_password: String,
    security_question: String,
    security_answer: String,
    ato: String,
    position: String,
    qualification: String,
    prev_work: String,
    skills: String,
    id_card_front: String,
    id_card_back: String,
    modified: Date,
    created:{
        type: Date,
        default: Date.now
    },
})
const TFormData = mongoose.model('TFormData', TFormDataSchema);
export default TFormData;
